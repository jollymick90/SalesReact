import React, { Component } from 'react';

export class EditGood extends Component {
    static displayName = EditGood.name;

    constructor(props) {
        super(props);
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
              <h2>good.name</h2>
              
          </div>
        );
      }

    async populateGoodData() {
        console.log("ciao")
        //const response = await fetch('api/goods/');
        //const data = await response.json();
        //this.setState({ goods: data, loading: false });
    }
}
