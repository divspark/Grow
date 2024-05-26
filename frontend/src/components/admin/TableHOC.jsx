import React from 'react';
import { useTable, useSortBy } from 'react-table';

function TableHOC(columns, data, containerClassname, heading) {
  return function HOC() {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

    return (
      <div className={containerClassname}>
        <h2 className="heading">{heading}</h2>
        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {column.isSorted && (
                      <span> {column.isSortedDesc ? '🔽' : '🔼'}</span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
}

export default TableHOC;
