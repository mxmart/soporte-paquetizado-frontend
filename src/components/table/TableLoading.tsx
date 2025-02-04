'use client';
import React from "react";

interface Props {
  numColumns: number;
}

export const TableLoading = ({ numColumns }: Props) => {
  const headers = Array.from({ length: numColumns }, (_, i) => (
    <th key={i} className="bg-gray-200 text-center px-4 py-2"></th>
  ));

  const rows = Array.from({ length: 5 }, (_, i) => (
    <tr
      key={i}
      className={`row-line border-t-4 color-cell-hover transition-all mr-2`}
    >
      {[...Array(numColumns)].map((i, j) => (
        <td
          key={j}
          className={`${ i === 0 && 'rounded-s-lg' } ${ i === 4 && 'rounded-r-lg' } animate-pulse h-9 w-1/5`}
        ></td>
      ))}
    </tr>
  ));

  return (
    <div className="w-full overflow-x-auto no-scrollbar mb-3 mt-5">
      <table className="table-component w-[780px] sm:w-full">
        <thead className="text-xs h-8">
          <tr >{headers}</tr>
          <div className='w-full h-[1px] mt-1'/>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <div className="h-6" />
    </div>
  );
};
