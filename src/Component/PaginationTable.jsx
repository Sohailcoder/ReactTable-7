import React, { useMemo } from 'react'
import {usePagination, useTable} from 'react-table'
import { columns } from './columns'
import Mock_Data from './MOCK_DATA.json'
import  './style.css'

const PaginationTable = () => {
    const column = useMemo(() => columns, [])
    const data = useMemo(() => Mock_Data, [])

    const tableInstance = useTable({
        columns:column,
        data: data ,
    },
    usePagination
)

    const {getTableProps, getTableBodyProps, headerGroups, page, prepareRow,nextPage,previousPage,canNextPage,canPreviousPage,pageOptions,gotoPage,pageCount,state,setPageSize} = tableInstance

    const {pageIndex,pageSize} =state;

    return(
        <>
    <table {...getTableProps}>
        <thead >
            {headerGroups.map(headerGroup=>(
            <tr{...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column =>(
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
            </tr>

            ))}
        </thead>
        <tbody {...getTableBodyProps}>
        {page.map(row => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                        })}
                    </tr>
                );
            })}
        </tbody>
    </table>
    <div style={{display: 'flex' , alignItems:'center'}}>
        <span>
            <select value={pageSize} onChange={e=>{setPageSize(Number(e.target.value))}}>
                {[10,25,50].map(pageSize =>(
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))} 
            </select>
        </span>
    <span>
        | go to page:{' '}
        <input type='number' defaultValue={pageIndex+1} onChange={e=>{
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(pageNumber)
        }}/>
    </span>
    <span>
        Page{' '}
        <strong>
            {pageIndex + 1 } of {pageOptions.length}
        </strong>{' '}  
    </span>
    <button onClick={()=>gotoPage(0) }disabled={!canPreviousPage}>
        {'<<'}
    </button>
    <div>
        <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
        <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
    </div>
    <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>
        {'>>'}  
    </button>
    </div>
    </>
  )
}

export default PaginationTable