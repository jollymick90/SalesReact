import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class GoodList extends Component {

  render() {
    return (
      <div>
          <Link to="/good-edit/-1" className="btn btn-primary">Add</Link>      
      </div>
    );
  }
}
