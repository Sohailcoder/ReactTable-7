import React, { useMemo } from 'react'
import {useSortBy, useTable} from 'react-table'
import { columns } from './columns'
import Mock_Data from './MOCK_DATA.json'
import  './style.css'

const SortingTable = () => {
    const column = useMemo(() => columns, [])
    const data = useMemo(() => Mock_Data, [])

    const tableInstance = useTable({
        columns:column,
        data: data ,
    },useSortBy)

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance
    return(
    <table {...getTableProps}>
        <thead >
            {headerGroups.map(headerGroup=>(
            <tr{...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column =>(
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? '⬆️' : '⬇️'):''}</span>
                    </th>
                ))}
            </tr>

            ))}
        </thead>
        <tbody {...getTableBodyProps}>
        {rows.map(row => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                        })}
                    </tr>
                );
            })}
            <tr>
                <td></td>
            </tr>                
        </tbody>
    </table>
  )
}

export default SortingTable