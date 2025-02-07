'use client';
import { Column } from '@/interfaces';
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import { ColumnDef, ColumnFiltersState, FilterFn, PaginationState, createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import React, { useEffect } from 'react'
import { TableFilter } from './TableFilter';
import { useRouter } from 'next/navigation';

declare module '@tanstack/table-core' {
  interface FilterFns {
      fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
      itemRank: RankingInfo
  }
};

interface Props {
  columns: Column[];
  filters?: boolean;
  text?: string;
  values?: any;
  isLoading?: boolean;
  url?: string;
};

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed
};

export const Table = ({ columns: columnsData, filters = false, text = 'No hay tickets', values = [], isLoading, url = '/' }: Props) => {

    const columnHelper = createColumnHelper<any>();
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [data, setData] = React.useState<any[]>( values );
    const [pagination, setPagination] = React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 5,
    });

    const { push, prefetch } = useRouter();

    useEffect(() => {
      setData( values );
    }, [ isLoading ])
    
    const columns = columnsData.map(column => {
      if( column.accessorKey !== 'id' ){
        return columnHelper.accessor(column.accessorKey, { header: column.header })
      }
    }).filter(column => column !== undefined) as ColumnDef<any, any>[];
    
    const table = useReactTable({
      data, 
      columns,
      filterFns: {
        fuzzy: fuzzyFilter,
      },
      state: {
        columnFilters,
        pagination,
      },
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onPaginationChange: setPagination,
      globalFilterFn: fuzzyFilter,
    });

    return (
      <div className="w-full overflow-x-auto no-scrollbar mb-3 mt-5 table px-2">
    <table className='w-[780px] sm:w-full'>
      <thead className='text-xs'>
        { table.getHeaderGroups().map( headerGroup => (
          <tr key={headerGroup.id}>
            { headerGroup.headers.map( header => {
              return (
                <th key={ header.index } colSpan={header.colSpan}>
                  { filters ? header.isPlaceholder ? null : (
                    <>
                    <div
                      {...{
                        className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                    </div>
                    {header.column.getCanFilter() ? (
                      <div>
                        <TableFilter column={header.column} table={table} />
                      </div>
                    ) : null}
                    </>
                  ) : header.column.columnDef.header + ""}
                  <div className='w-full h-[1px] mt-1'/>
                </th>
              )
            })}
          </tr>
        ))}
      </thead>
      <tbody className='w-full text-sm'>
        { table.getRowModel().rows.map(row => (
          <tr onMouseEnter={ () => prefetch(`${ url }/${ row.original.id }`) } onClick={ () => push(`${ url }/${ row.original.id }`) } key={row.id} className=' cursor-pointer' title={``}>
            { row.getVisibleCells().map((cell, index) => (
              <td key={cell.id} className={`text-center py-[6px] ${ index === 0 && 'rounded-s-lg' } ${ index === 4 && 'rounded-r-lg' } ${cell.column.id ==="ticket_status" ? "status" : ""} `}>
                { cell.column.id ==="title" ? (String(row.getValue("title")).length > 14 ? `${String(row.getValue("title")).slice(0,14)}...` :row.getValue("title")) :
                flexRender(cell.column.columnDef.cell, cell.getContext()) }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {
      isLoading
      ? <span className='w-full mx-auto text-center text-xs h-10 items-center flex justify-center gap-x-1 loading'>
        <div className={`h-3 w-3 animate-spin rounded-full border-4 `}/>
        Cargando...
      </span>
      : data.length === 0 && 
        <span className='w-full mx-auto text-center text-xs h-10 items-center flex justify-center '>
          { text }
        </span> 
    }
    <div className="h-2" />
            <div className={`${ data.length <= 5 && 'hidden' } flex justify-end gap-3 text-sm font-normal`}>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[5, 10].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize} filas
                        </option>
                    ))}
                </select>
                <button
                    className="border-none"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="border-none"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <span className="flex items-center gap-1 text-xs font-light justify-center">
                    {table.getState().pagination.pageIndex + 1} de{' '}
                    {table.getPageCount()}
                </span>
                <button
                    className="border-none"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className="border-none"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
            </div>
    </div>
  )
}
