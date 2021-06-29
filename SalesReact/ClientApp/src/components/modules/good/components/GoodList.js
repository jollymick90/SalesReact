import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoodApi from '../../../../services/network/good';

export class GoodList extends Component {

  static displayName = GoodList.name;
  static editPath = "/good-edit/";
  
  constructor(props) {
    super(props);
    this.state = { dataList: [], loading: true };
  }

  componentDidMount() {
    this.populate();
  }

  async populate() {
    const response = await GoodApi.getAll();
    const data = response.data;
    this.setState({ dataList: data, loading: false });
  }

  static renderTable(goodList) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>CategoryId</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {goodList.map(good =>
            <tr key={good.goodId}>
              <td>{good.name}</td>
              <td>{good.price}</td>
              <td>CategoryId</td>
              <td>
                <Link to={`${GoodList.editPath}${good.goodId}`} className="btn btn-primary">Edit</Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    const contents = this.state.loading ? <p>Loading...</p> :
    GoodList.renderTable(this.state.dataList);
    return (
      <div>
        <h1 id="tabelLabel">All Goods</h1>
        <Link to={`${GoodList.editPath}-1`} className="btn btn-primary">Add</Link>
        <div>
          {contents}
        </div>
      </div>
    );
  }
}
