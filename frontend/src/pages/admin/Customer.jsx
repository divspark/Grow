import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../components/admin/AdminSlidebar";
import TableHOC from "../../components/admin/TableHOC";

const columns = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Location",
    accessor: "location",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const defaultAvatar = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F64.media.tumblr.com%2F73d737005989f34abc6f1b7557933672%2F242ad8bd3ff8acb6-d9%2Fs1280x1920%2F1b56dfb5dd93ffdfaf048147f0b27cde99ddf411.png&f=1&nofb=1&ipt=7f08d83ecedff7e43703017e9eede5d5172322c6de04831477e417daacd2d00f&ipo=images";

const Customers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('/api/customers')
      .then(response => {
        const fetchedData = response.data.map(customer => ({
          avatar: (
            <img
              style={{ borderRadius: "50%" }}
              src={customer.avatar || defaultAvatar}
              alt="avatar"
            />
          ),
          name: customer.name,
          location: customer.location,
          email: customer.email,
          role: customer.role,
          action: (
            <button onClick={() => handleDelete(customer.email)}>
              <FaTrash />
            </button>
          ),
        }));
        setData(fetchedData);
      })
      .catch(error => {
        console.error("There was an error fetching the customers!", error);
      });
  }, []);

  const handleDelete = (email) => {
    axios.delete(`/api/customers/${email}`)
      .then(() => {
        setData(prevData => prevData.filter(customer => customer.email !== email));
      })
      .catch(error => {
        console.error("There was an error deleting the customer!", error);
      });
  };

  const Table = useCallback(TableHOC(columns, data, "dashboard-product-box", "Customers"), [data]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table()}</main>
    </div>
  );
};

export default Customers;
