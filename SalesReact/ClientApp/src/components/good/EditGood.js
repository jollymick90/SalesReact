import React, { Component } from 'react';
import { getGood } from '../../services/network/goods';

export class EditGood extends Component {
    static displayName = EditGood.name;

    constructor(props) {
        super(props);
        this.goodid = props.goodid
        this.state = { good: [], loading: true };
    }

    componentDidMount() {
        this.populateGoodData();
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : EditGood.renderGood(this.state.good);

        return (
            <div>
                <h1 id="tabelLabel" >Good</h1>
                {contents}
            </div>
        );
    }

    static renderGood(good) {
        return (
          <div>
              <h4>Name: {good.name}</h4>
              <h5>Price: {good.price}</h5>              
          </div>
        );
      }

    async populateGoodData() {
        let goodData = {}
        if (this.goodid > 0) {
            const response = await getGood(this.goodid);
            goodData = await response.data;
        }

        this.setState({ good: goodData, loading: false });
    }
}
