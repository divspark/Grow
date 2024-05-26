import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../components/admin/AdminSlidebar";
import TableHOC from "../../components/admin/TableHOC";
import '../../styles/admin/App.scss';

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
    Header: "District",
    accessor: "district",
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

const defaultAvatars = [
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F64.media.tumblr.com%2F73d737005989f34abc6f1b7557933672%2F242ad8bd3ff8acb6-d9%2Fs1280x1920%2F1b56dfb5dd93ffdfaf048147f0b27cde99ddf411.png&f=1&nofb=1&ipt=7f08d83ecedff7e43703017e9eede5d5172322c6de04831477e417daacd2d00f&ipo=images",
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b367acac-2ef7-42e6-a6cc-2264a7212b61/dg9waic-c8d98f61-c2c4-47cc-9302-ff4a1f1f9ce4.jpg/v1/fill/w_921,h_867,q_70,strp/anime_boy_pfp_art_by_hrplusdesign_dg9waic-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTY0IiwicGF0aCI6IlwvZlwvYjM2N2FjYWMtMmVmNy00MmU2LWE2Y2MtMjI2NGE3MjEyYjYxXC9kZzl3YWljLWM4ZDk4ZjYxLWMyYzQtNDdjYy05MzAyLWZmNGExZjFmOWNlNC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.jL-OTjL8P1ZV2zCEJkMh0mW0XjX45Xvx9bNrwxF25XM",
];

const defaultNames = [
  "Shyam",
  "Kshitiz",
  "Aman",
  "Rahul",
  "Vishesh"
];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const Customers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:5000/api/v1/user/all')
      .then(response => {
        const fetchedData = response.data.map(customer => ({
          avatar: (
            <img
              style={{ borderRadius: "50%" }}
              src={customer.avatar || getRandomElement(defaultAvatars)}
              alt="avatar"
            />
          ),
          name: customer.name || getRandomElement(defaultNames),
          district: customer.district,
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
    axios.delete(`http://localhost:5000/api/v1/user/email/${email}`)
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

// import React, { useCallback, useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrash } from "react-icons/fa";
// import AdminSidebar from "../../components/admin/AdminSlidebar";
// import TableHOC from "../../components/admin/TableHOC";

// const columns = [
//   {
//     Header: "Avatar",
//     accessor: "avatar",
//   },
//   {
//     Header: "Name",
//     accessor: "name",
//   },
//   {
//     Header: "District",
//     accessor: "district",
//   },
//   {
//     Header: "Email",
//     accessor: "email",
//   },
//   {
//     Header: "Role",
//     accessor: "role",
//   },
//   {
//     Header: "Action",
//     accessor: "action",
//   },
// ];

// const defaultAvatar = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F64.media.tumblr.com%2F73d737005989f34abc6f1b7557933672%2F242ad8bd3ff8acb6-d9%2Fs1280x1920%2F1b56dfb5dd93ffdfaf048147f0b27cde99ddf411.png&f=1&nofb=1&ipt=7f08d83ecedff7e43703017e9eede5d5172322c6de04831477e417daacd2d00f&ipo=images";

// const Customers = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Fetch data from the backend
//     axios.get('http://localhost:5000/api/v1/user/all')
//       .then(response => {
//         const fetchedData = response.data.map(customer => ({
//           avatar: (
//             <img
//               style={{ borderRadius: "50%" }}
//               src={customer.avatar || defaultAvatar}
//               alt="avatar"
//             />
//           ),
//           name: customer.name,
//           district: customer.district,
//           email: customer.email,
//           role: customer.role,
//           action: (
//             <button onClick={() => handleDelete(customer.email)}>
//               <FaTrash />
//             </button>
//           ),
//         }));
//         setData(fetchedData);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the customers!", error);
//       });
//   }, []);

//   const handleDelete = (email) => {
//     axios.delete(`http://localhost:5000/api/v1/user/email/${email}`)
//       .then(() => {
//         setData(prevData => prevData.filter(customer => customer.email !== email));
//       })
//       .catch(error => {
//         console.error("There was an error deleting the customer!", error);
//       });
//   };

//   const Table = useCallback(TableHOC(columns, data, "dashboard-product-box", "Customers"), [data]);

//   return (
//     <div className="admin-container">
//       <AdminSidebar />
//       <main>{Table()}</main>
//     </div>
//   );
// };

// export default Customers;
