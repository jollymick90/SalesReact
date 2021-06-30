import React, { useState } from 'react';
import { extractCategory } from '../../../../services/models/good/goodUtils';
import { ModalGoodList } from './ModalGoodList';

export function EditReceipt() {
  
  const [listGoodSelected, setListGoodSelected] = useState([]);
  const updateSelected = (good) => {
    const newarray = [...listGoodSelected]
    newarray.push(good)
    setListGoodSelected(newarray)
    
  }

  const renderTable = (goodList) => {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>           
          </tr>
        </thead>
        <tbody>
        
          {goodList.map(good =>
            <tr key={good.goodId}>
              <td>{good.name}</td>
              <td>{good.price}</td>
              <td>{extractCategory(good)}</td>
                         
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <ModalGoodList onSelected={(goodSelected) => { updateSelected(goodSelected) }}></ModalGoodList>
      <div>
        {renderTable(listGoodSelected)}
      </div>
    </div>
  );
}
