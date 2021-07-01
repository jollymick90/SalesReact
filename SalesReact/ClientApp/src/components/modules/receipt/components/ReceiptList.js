import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import ReceiptApi from '../../../../services/network/receipt';

export class ReceiptList extends Component {

    static displayName = ReceiptList.name;
    static editPath = "/receipt-edit/";

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);

        this.state = { dataList: [], loading: true };
    }

    componentDidMount() {
        this.populate();
    }

    extractTotalAndPrice(receipt) {
        let totalItems = 0;
        let totalPrice = 0;
        if (receipt.receiptGoods && receipt.receiptGoods.length > 0) {
            receipt.receiptGoods.forEach(el => {
                totalItems += el.quantity;
                totalPrice += el.totalPrice;
            })
        }

        return [totalItems, totalPrice];
    }

    async populate() {
        const response = await ReceiptApi.getAll();
        const data = response.data;
        const receipts = data.map(element => {
            const [totalItems, totalPrice] = this.extractTotalAndPrice(element);
            return {
                id: element.id,
                date: element.date,
                total: totalPrice,
                totalItems: totalItems
            }
        });
        this.setState({ dataList: receipts, loading: false });
    }

    async delete(id) {
        try {
           await ReceiptApi.delete(id);
        } catch (error) {
           
        }
        this.populate();
    }

    renderTable(receiptList) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Total Items</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {receiptList.map(receipt =>
                        <tr key={receipt.id}>
                            <td>{receipt.total}</td>
                            <td>{receipt.date}</td>
                            <td>{receipt.totalItems}</td>
                            <td>
                                <Link to={`${ReceiptList.editPath}${receipt.id}`} className="btn btn-primary">Edit</Link>
                            </td>
                            <td>
                                <Button onClick={() => { 
                                    this.delete(receipt.id) }}>Delete</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        const contents = this.state.loading ? <p>Loading...</p> :
            this.renderTable(this.state.dataList);
        return (
            <div>
                <h1 id="tabelLabel">All Receipts</h1>
                <Link to={`${ReceiptList.editPath}-1`} className="btn btn-primary">Add</Link>
                <div>
                    {contents}
                </div>
            </div>
        );
    }
}
