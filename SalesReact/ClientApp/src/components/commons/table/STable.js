// import React, { useState } from "react";
// import { STableHeader } from './STableHeader'
// import { STableData } from './STableData'

// function normalizeData(data) {
//   return data.map(td => {
//     const keys = Object.keys(td);
//     return keys.map(key => ({ key, text: td[key] }));
//   });
//  }

// export function STable({ data, meta }) {
//     const [headerMeta] = useState(meta);
//     const [tableData] = useState(data);
    
//     // useEffect(() => {
//     //   // normalize data
//     //   setTableData(normalizeData(data), meta);
//     // }, []);
    
//     return (
//       <div className="container">
//         <STableHeader headers={headerMeta} />
//         <STableData data={normalizeData(tableData)} meta={meta} />
//       </div>
//     );
//    }