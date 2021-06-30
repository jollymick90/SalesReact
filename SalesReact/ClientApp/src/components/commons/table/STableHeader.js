import React from 'react';
import { STableHeadCell } from './STableHeadCell';

export function STableHeader ({ headers }) {
    return (
        <thead className="table-row">
            {
                headers.map((d) =>  <STableHeadCell data={d} />)
            }
        </thead>
    )
}
