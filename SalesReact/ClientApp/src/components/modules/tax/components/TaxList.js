import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class TaxList extends Component {

  render() {
    return (
      <div>
        <Link to="/tax-edit/-1" className="btn btn-primary">Add</Link>
      </div>
    );
  }
}
