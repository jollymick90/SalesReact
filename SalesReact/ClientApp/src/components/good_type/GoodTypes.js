import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getGoodTypes } from '../../services/network/good_type';

export class GoodTypes extends Component {
  static displayName = GoodTypes.name;
  constructor(props) {
    super(props);
    this.state = { goodsTypes: [], loading: true };  
  }

  componentDidMount() {
    this.populateGoodTypesData();
  }

  static renderGoodTypessTable(goodTypes) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {goodTypes.map(goodType =>
            <tr key={goodType.id}>
              <td>{goodType.name}</td>
              <td>                  
                  <Link to={`/edit-goodType/${goodType.id}`} className="btn btn-primary">Edit</Link>
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
        : GoodTypes.renderGoodTypesTable(this.state.goods);

    return (
      <div>
        <h1 id="tabelLabel" >GoodTypes</h1>
        <p>All Good's Types</p>
        <div>
            <Link to="/edit-goodType/-1" className="btn btn-primary">Add</Link>
        </div>
        {contents}
      </div>
    );
  }

  async populateGoodTypesData() {
    const response = await getGoodTypes();
    const data = await response.data;
    this.setState({ goods: data, loading: false });
  }
}
