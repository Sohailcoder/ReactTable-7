import React from 'react';

const ToggleColumn = ({ allColumns, getToggleHideAllColumnsProps }) => {
    return (
        <div>
            <div>
                <input type="checkbox" {...getToggleHideAllColumnsProps()} /> Toggle All
            </div>
            {allColumns.map(column => (
                <div key={column.id}>
                    <label>
                        <input type="checkbox" {...column.getToggleHiddenProps()} /> {column.Header}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default ToggleColumn;
