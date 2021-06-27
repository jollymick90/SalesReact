import React, { Component } from 'react';
import { getReceipt } from '../../services/network/receipt';

export class EditReceipt extends Component {
    static displayName = EditReceipt.name;

    constructor(props) {
        super(props);
        this.receiptId = props.receiptId
        this.state = { receipt: [], loading: true };
    }

    componentDidMount() {
        this.populateReceiptData();
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : EditReceipt.renderReceipt(this.state.receipt);

        return (
            <div>
                <h1 id="tabelLabel" >Receipt</h1>
                {contents}
            </div>
        );
    }

    static renderReceipt(receipt) {
        return (
          <div>
              <p>{receipt.id}</p>
              <h5>{receipt.total}</h5>
          </div>
        );
      }

    async populateReceiptData() {
        let receiptData = {}
        if (this.receiptId > 0) {
            const response = await getReceipt(this.receiptId);
            receiptData = await response.data;
        }

        this.setState({ receipt: receiptData, loading: false });
    }
}
