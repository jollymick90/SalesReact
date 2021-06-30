import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { extractCategory } from '../../../../services/models/good/goodUtils';
import { calculatePrice, calculateTaxPrice } from '../../../../services/models/receipt/receiptUtils';
import { ModalGoodList } from './ModalGoodList';

export function EditReceipt() {

  const [itemAdded, setListGoodSelected] = useState([]);
  const [receiptTotalItem, setReceiptTotalItem] = useState(0);
  const [receiptTotalPrice, setReceiptTotalPrice] = useState(0);
  const [receiptTotalTax, setReceiptTotalTax] = useState(0);

  const updateSelected = (good) => {
    const newarray = [...itemAdded];
    const item = newarray.find(e => e.id === good.goodId) || {};

    if (!item.id) {
      item.id = good.goodId;
      item.totalItem = 1;
      item.good = good;

      item.totalTaxPrice = calculateTaxPrice(good, 1);
      item.totalPrice = calculatePrice(good, 1, item.totalTaxPrice);

      newarray.push(item)
    } else {

      item.totalItem++;

      item.totalTaxPrice = calculateTaxPrice(good, item.totalItem);
      item.totalPrice = calculatePrice(good, item.totalItem, item.totalTaxPrice);

    }

    
    update(newarray)
  }

  const update = (newarray) => {
    const narray = [...newarray];
    let totalItem = 0;
    let totalPrice = 0;
    let totalTaxPrice = 0;

    narray.forEach(e => {
      totalItem += e.totalItem;
      totalPrice += e.totalPrice;
      totalTaxPrice += e.totalTaxPrice;
    });

    setReceiptTotalItem(totalItem);
    setReceiptTotalPrice(totalPrice);
    setReceiptTotalTax(totalTaxPrice);

    setListGoodSelected(narray)
  }

  const increment = (item) => {
    item.totalItem++;
    item.totalTaxPrice = calculateTaxPrice(item.good, item.totalItem);
    item.totalPrice = calculatePrice(item.good, item.totalItem, item.totalTaxPrice);
    update(itemAdded);
  }

  const decrement = (item) => {
    if (item.totalItem > 0) {
      item.totalItem--;
      item.totalTaxPrice = calculateTaxPrice(item.good, item.totalItem);
      item.totalPrice = calculatePrice(item.good, item.totalItem, item.totalTaxPrice);
      update(itemAdded);
    }

  }

  const buildButtons = (item) => {

    return (
      <div>
        <Button className="btn btn-primary" onClick={() => increment(item)}>+</Button>
        <Button className="btn btn-primary" onClick={() => decrement(item)}>-</Button>
      </div>
    )
  }

  const renderTable = (itemList) => {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>TotalPrice</th>
            <th>TotalTaxPrice</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {itemList.map(item =>
            <tr key={item.id}>
              <td>{item.good.name}</td>
              <td>{extractCategory(item.good)}</td>
              <td>{item.totalPrice}</td>
              <td>{item.totalTaxPrice}</td>
              <td>{item.totalItem}</td>
              <td>{buildButtons(item)}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <ModalGoodList onSelected={(goodSelected) => { updateSelected(goodSelected) }}></ModalGoodList>
      <div className="headReceipt">
          <h2>{receiptTotalItem}</h2>
          <h2>{receiptTotalPrice}</h2>
          <h2>{receiptTotalTax}</h2>      
      </div>
      <div>
        {renderTable(itemAdded)}
      </div>
      
    </div>
  );
}
