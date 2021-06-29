import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReceiptApi from '../../../../services/network/receipt';

export class ReceiptList extends Component {

  static displayName = ReceiptList.name;
  static editPath = "/receipt-edit/";

  constructor(props) {
      super(props);
      this.state = { dataList: [], loading: true };
  }

  componentDidMount() {
      this.populate();
  }

  async populate() {
      const response = await ReceiptApi.getAll();
      const data = response.data;
      console.log(data)
      this.setState({ dataList: data, loading: false });
  }

  static renderTable(receiptList) {
      return (
          <table className='table table-striped' aria-labelledby="tabelLabel">
              <thead>
                  <tr>
                      <th>Total</th>
                      <th>Date</th>
                      <th>Total Items</th>
                      <th>Edit</th>
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
                      </tr>
                  )}
              </tbody>
          </table>
      );
  }

  render() {
      const contents = this.state.loading ? <p>Loading...</p> :
      ReceiptList.renderTable(this.state.dataList);
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
