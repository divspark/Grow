import React from 'react';
import TableHOC from './TableHOC';

const columns = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Quantity',
    accessor: 'quantity',
  },
  {
    Header: 'Discount',
    accessor: 'discount',
  },
  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
];

const DashboardTable = ({ data = [] }) => {
  const TableComponent = TableHOC(columns, data, 'transaction-box', 'Top Transaction');
  return <TableComponent />;
};

export default DashboardTable;
