import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import AdminSidebar from "../../components/admin/AdminSlidebar";
import TableHOC from "../../components/admin/TableHOC";
import '../../styles/admin/App.scss'

const columns = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
];

const Products = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    // axios.get('http://localhost:5000/api/v1/product/admin-products')
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    };
    axios.get('https://grow-backend-pi.vercel.app/product/admin-products',config)
      .then(response => {
        const fetchedData = response.data.map(product => ({
          photo: <img src={product.photo} alt={product.name} />,
          name: product.name,
          price: product.price,
          stock: product.stock,
        }));
        setData(fetchedData);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const Table = useCallback(TableHOC(columns, data, "dashboard-product-box", "Products"), [data]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table()}</main>
      <Link to="/admin/products/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
