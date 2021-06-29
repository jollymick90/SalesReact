import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TaxApi from '../../../../services/network/tax';

export class TaxList extends Component {
    static displayName = TaxList.name;
    static editPath = "/tax-edit/";

    constructor(props) {
        super(props);
        this.state = { dataList: [], loading: true };
    }

    componentDidMount() {
        this.populate();
    }

    async populate() {
        const response = await TaxApi.getAll();
        const data = response.data;
        this.setState({ dataList: data, loading: false });
    }

    static renderTable(taxList) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Value</th>
                        <th>Description</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {taxList.map(tax =>
                        <tr key={tax.taxId}>
                            <td>{tax.value}</td>
                            <td>{tax.description}</td>
                            <td>
                                <Link to={`${TaxList.editPath}${tax.taxId}`} className="btn btn-primary">Edit</Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        const contents = this.state.loading ? <p>Loading...</p> :
            TaxList.renderTable(this.state.dataList);
        return (
            <div>
                <h1 id="tabelLabel">All Taxes</h1>
                <Link to={`${TaxList.editPath}-1`} className="btn btn-primary">Add</Link>
                <div>
                    {contents}
                </div>
            </div>
        );
    }
}
