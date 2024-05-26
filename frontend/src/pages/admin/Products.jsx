import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import AdminSidebar from "../../components/admin/AdminSlidebar";
import TableHOC from "../../components/admin/TableHOC";

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
    axios.get('/api/products')
      .then(response => {
        const fetchedData = response.data.map(product => ({
          photo: <img src={product.image} alt={product.name} />,
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
