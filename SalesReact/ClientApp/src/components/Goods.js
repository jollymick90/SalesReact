import React, { Component } from 'react';

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
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {goods.map(good =>
            <tr key={good.id}>
              <td>{good.name}</td>
              <td>{good.price}</td>
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
        {contents}
      </div>
    );
  }

    async populateGoodData() {
    const response = await fetch('api/goods');
    const data = await response.json();
    this.setState({ goods: data, loading: false });
  }
}
