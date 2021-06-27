import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getGoods } from '../../services/network/goods';

export class Goods extends Component {
  static displayName = Goods.name;
  constructor(props) {
    super(props);
    this.state = { goods: [], loading: true };  
  }

  componentDidMount() {
    this.populateGoodData();
  }

  static renderGoodsTable(goods) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {goods.map(good =>
            <tr key={good.id}>
              <td>{good.name}</td>
              <td>{good.price}</td>
              <td>                  
                  <Link to={`/edit-good/${good.id}`} className="btn btn-primary">Edit</Link>
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
        : Goods.renderGoodsTable(this.state.goods);

    return (
      <div>
        <h1 id="tabelLabel" >Goods</h1>
        <p>All Goods</p>
        <div>
            <Link to="/edit-good/-1" className="btn btn-primary">Add</Link>
        </div>
        {contents}
      </div>
    );
  }

  async populateGoodData() {
    const response = await getGoods();
    const data = await response.data;
    this.setState({ goods: data, loading: false });
  }
}
