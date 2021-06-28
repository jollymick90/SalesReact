import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class CategoryList extends Component {

  render() {
    return (
      <div>
        <Link to="/category-edit/-1" className="btn btn-primary">Add</Link>
      </div>
    );
  }
}
