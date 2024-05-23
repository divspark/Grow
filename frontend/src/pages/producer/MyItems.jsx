import React from 'react';
import TableHOC from '../../components/main/TableHOC';
import data from '../../assets/data.json';

const MyItems = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Products',
        accessor: 'photo', // Assuming each item has a 'photo' property
        Cell: ({ value }) => <img src={value} alt="Product" style={{ width: '100px', height: 'auto' }} />,
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Stock',
        accessor: 'stock',
      },
    ],
    []
  );

  // Define your table data
  const tableData = React.useMemo(() => data.products, [data]);

  const GeneratedTable = TableHOC(columns, tableData, "table-container", "", true);

  return (
    <div className='table-container'>
      <h2 className="table-title">Your Items</h2>
      <div className="table-wrapper">
        <GeneratedTable />
      </div>
    </div>
  );
};

export default MyItems;
