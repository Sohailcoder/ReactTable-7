import React, { useMemo } from 'react';
import { useTable, useGlobalFilter, useFilters } from 'react-table';
import { columns } from './columns';
import Mock_Data from './MOCK_DATA.json';
import './style.css';
import GlobalFilter from './Filter/GlobalFilter';
import ColumnFilter from './Filter/ColumnFilter';  

const ColumnFilterTable = () => {
    const column = useMemo(() => columns, []);
    const data = useMemo(() => Mock_Data, []);

    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter,  
        };
    }, []);

    const tableInstance = useTable(
        {
            columns: column,
            data: data,
            defaultColumn,
        },
        useFilters,
        useGlobalFilter
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance;
    const { globalFilter } = state;

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()} key={column.id}>
                                    {column.render('Header')}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={row.id}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} key={cell.column.id}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default ColumnFilterTable;
