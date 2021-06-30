import React from 'react';

export function STableHeadCell ({ data }) {
    return (
        <td className="table-cell">
            {data.text}
        </td>
    )
}
