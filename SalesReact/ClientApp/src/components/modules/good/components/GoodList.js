import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import GoodApi from '../../../../services/network/good';
import { extractCategory, extractTaxDescription, extractTaxValue, extractPrice } from '../../../../services/models/good/goodUtils';

export class GoodList extends Component {

  static displayName = GoodList.name;
  static editPath = "/good-edit/";
  
  constructor(props) {
    super(props);
    this.disbledEdit = props.disableEdit;
    this.onSelected = this.props.onSelected;
    this.onInternalSelected = this.onInternalSelected.bind(this);
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

  onInternalSelected(good) {
    if (this.onSelected) {
      this.onSelected(good);
    }

  }

  getButtonEdit(good) {
    return this.onSelected ? (
      <Button className="btn btn-primary" onClick={() => this.onInternalSelected(good)}>Add</Button>
    ) : (
      <Link to={`${GoodList.editPath}${good.goodId}`} className="btn btn-primary">Edit</Link>      
    )
  }

  renderTable(goodList) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Tax Type</th>
            <th>Tax Value</th>
            <th>Imported</th>
            <th>Action</th>            
          </tr>
        </thead>
        <tbody>
        
          {goodList.map(good =>
            <tr key={good.goodId}>
              <td>{good.name}</td>
              <td>{extractPrice(good.price)}</td>
              <td>{extractCategory(good)}</td>
              <td>{extractTaxDescription(good)}</td>
              <td>{extractTaxValue(good)}</td>
              <td>{ good.imported ? "yes" : "no" }</td>
              <td>
                {this.getButtonEdit(good)}            
              </td>             
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    const contents = this.state.loading ? <p>Loading...</p> :
    this.renderTable(this.state.dataList, this);
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
