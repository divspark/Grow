import AdminSidebar from "../../components/admin/AdminSlidebar";
import TableHOC from "../../components/admin/TableHOC";
import { ReactElement, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import '../../styles/admin/App.scss'

const Transaction = () => {
  const [data] = useState([
    {
      user: "Charas",
      amount: 4500,
      discount: 400,
      quantity: 3,
      status: <span className="red">Processing</span>,
      action: <Link to="/admin/transaction/sajknaskd">Manage</Link>
    },
    {
      user: "Neon",
      amount: 5900,
      discount: 850,
      quantity: 1,
      status: <span className="green">Shipped</span>,
      action: <Link to="/admin/transaction/sajknaskd">Manage</Link>
    },
    {
      user: "Jarvis",
      amount: 6000,
      discount: 600,
      quantity: 6,
      status: <span style={{ color: "blue" }} className="blue">Delivered</span>,
      action: <Link to="/admin/transaction/sajknaskd">Manage</Link>
    }
  ]);

  const columns = [
    { Header: "User", accessor: "user" },
    { Header: "Amount", accessor: "amount" },
    { Header: "Discount", accessor: "discount" },
    { Header: "Quantity", accessor: "quantity" },
    { Header: "Status", accessor: "status" },
    { Header: "Action", accessor: "action" }
  ];

  const Table = useCallback(
    TableHOC(columns, data, "dashboard-product-box", "Transactions"),
    []
  );

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table()}</main>
    </div>
  );
};

export default Transaction;
