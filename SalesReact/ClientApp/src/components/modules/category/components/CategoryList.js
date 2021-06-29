import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CategoryApi from '../../../../services/network/category';

export class CategoryList extends Component {
  static displayName = CategoryList.name;
  static editPath = "/category-edit/";

  constructor(props) {
    super(props);
    this.state = { dataList: [], loading: true };
  }

  componentDidMount() {
    this.populate();
  }

  async populate() {
    const response = await CategoryApi.getAll();
    const data = response.data;
    this.setState({ dataList: data, loading: false });
  }


  static renderTable(categoryList) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Tax</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map(category =>
            <tr key={category.categoryId}>
              <td>{category.categoryName}</td>
              <td>Tax</td>
              <td>
                <Link to={`${CategoryList.editPath}${category.categoryId}`} className="btn btn-primary">Edit</Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
  render() {
    const contents = this.state.loading ? <p>Loading...</p> :
      CategoryList.renderTable(this.state.dataList);
    return (
      <div>
        <h1 id="tabelLabel">All Categories</h1>
        <Link to={`${CategoryList.editPath}-1`} className="btn btn-primary">Add</Link>
        <div>
          {contents}
        </div>
      </div>
    );
  }
}
