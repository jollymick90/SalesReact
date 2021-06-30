import React from "react";
// import { STableCell } from "./STableCell";

export function STableData({ data, meta }) {
    // const headerOrder = meta.map(m => m.key);
    // console.log("STableData", data, row.map((_, i) => {console.log("sTableRead", _, i)}));
    data.map((row) => 
            
        { 
          debugger
          console.log("STableData", row)                            
          //row.map((_, i) =>  data={row.find(r => r.key === headerOrder[i])})
          return "";
        }
      
    )

    // {                              
    //   row.map((_, i) => <STableCell data={row.find(r => r.key === headerOrder[i])} />)
    // }

    return (
      <tbody>
        {
          data.map((row) => (
            
            <tr className="table-row">
              Ciao
            </tr>
          ))
        }
      </tbody>
    )
  }