import React from 'react';

export function STableCell ({ data }) {
    return (
        <td className="table-cell" >
            {data.text}
        </td>
    )
}
