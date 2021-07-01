import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { extractCategory } from '../../../../services/models/good/goodUtils';
import { calculatePrice, calculatePriceTax } from '../../../../services/models/receipt/receiptUtils';
import ReceiptTempApi from '../../../../services/network/receipt/receiptTemp';
import { ModalGoodList } from './ModalGoodList';

export function EditReceipt() {
  const history = useHistory();

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

      item.totalPriceTax = calculatePriceTax(good, 1);
      item.totalPrice = calculatePrice(good, 1);
      item.totalTaxPrice = item.totalPriceTax - item.totalPrice;

      newarray.push(item)
    } else {

      item.totalItem++;
      
      item.totalPriceTax = calculatePriceTax(good, item.totalItem);
      item.totalPrice = calculatePrice(good, item.totalItem);
      item.totalTaxPrice = item.totalPriceTax - item.totalPrice;

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
    item.totalPriceTax = calculatePriceTax(item.good, item.totalItem);
    item.totalPrice = calculatePrice(item.good, item.totalItem);
    item.totalTaxPrice = item.totalPriceTax - item.totalPrice;
    update(itemAdded);
  }

  const decrement = (item) => {
    if (item.totalItem > 0) {
      item.totalItem--;
      item.totalPriceTax = calculatePriceTax(item.good, item.totalItem);
      item.totalPrice = calculatePrice(item.good, item.totalItem);
      item.totalTaxPrice = item.totalPriceTax - item.totalPrice;
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
            <th>Price Item</th>
            <th>Tax Item</th>
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
              <td>{item.good.price}</td>
              <td>{item.good.category.tax.value}</td>              
              <td>{item.totalPriceTax}</td>
              <td>{item.totalTaxPrice}</td>
              <td>{item.totalItem}</td>
              <td>{buildButtons(item)}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  const save = async () => {
    try {
      const receiptTemp = {
        ReceiptItems: []
      }
      itemAdded.forEach((item) => {
        receiptTemp.ReceiptItems.push({
          GoodId: item.good.goodId,
          GoodName: item.good.name,
          Quantity: item.totalItem,
          TaxItem: item.good.category.tax.value,
          TotalPrice:item.totalPriceTax,
          TotalTax: item.totalTaxPrice
        })
        
      });
      await ReceiptTempApi.create(receiptTemp);
      history.push("/receipt");
    } catch (error) {
      console.log("error save", error);
    }

  }

  return (
    <div>
      <ModalGoodList onSelected={(goodSelected) => { updateSelected(goodSelected) }}></ModalGoodList>
      <div className="headReceipt">
          <h2><span>Total Items: </span>{receiptTotalItem}</h2>
          <h2><span>Total Price: </span>{receiptTotalPrice}</h2>
          <h2><span>Total Tax: </span>{receiptTotalTax}</h2>      
      </div>
      <div>
        <Button onClick={save}>save</Button>
      </div>
      <div>
        {renderTable(itemAdded)}
      </div>
      
    </div>
  );
}
