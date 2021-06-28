import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getReceipts } from '../../../services/network/receipt';

export class Receipts extends Component {
  static displayName = Receipts.name;
  constructor(props) {
    super(props);
    this.state = { receipts: [], loading: true };  
  }

  componentDidMount() {
    this.populateReceiptsData();
  }

  static renderReceiptsTable(receipts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Total</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map(receipt =>
            <tr key={receipt.id}>
              <td>{receipt.date}</td>
              <td>{receipt.total}</td>
              <td>                  
                  <Link to={`/edit-receipt/${receipt.id}`} className="btn btn-primary">Edit</Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
        : Receipts.renderGoodsTable(this.state.goods);

    return (
      <div>
        <h1 id="tabelLabel" >Receipts</h1>
        <p>All Receipts</p>
        <div>
            <Link to="/edit-good/-1" className="btn btn-primary">Add</Link>
        </div>
        {contents}
      </div>
    );
  }

  async populateReceiptsData() {
    const response = await getReceipts();
    const data = await response.data;
    this.setState({ receipts: data, loading: false });
  }
}
