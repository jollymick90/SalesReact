import React, { Component } from 'react';
import TaxApi from '../../../../services/network/tax';

export class EditTax extends Component {

	constructor(props) {
		super(props);
		this.onChangeValue = this.onChangeValue.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.save = this.save.bind(this);
		this.taxId = props.dataId;
		this.state = {
			tax: {},
			loading: true
		}
	}

	componentDidMount() {
		this.populate();

	}

	async populate() {
		let data = {};
		if (this.taxId > 0) {
			const response = await TaxApi.get(this.taxId);
			data = response.data;
		}

		this.setState({ tax: data, loading: false });
	}

	onChangeValue(e) {
		const taxUpdate = { ...this.state.tax };
		taxUpdate.value = e.target.value;
		this.setState({
			tax: taxUpdate,
			loading: false
		});
	}

	onChangeDescription(e) {
		const taxUpdate = { ...this.state.tax };
		taxUpdate.description = e.target.value;
		this.setState({
			tax: taxUpdate,
			loading: false
		});
	}

	save() {
		this.onSave();
	}

	async onSave() {
		try {
			const data = {
				value: this.state.tax.value,
				description: this.state.tax.description
			};
			console.log(this.taxId)
			if (this.taxId) {
				data.taxId = this.taxId;
				await TaxApi.update(this.taxId, data);
			} else {
				await TaxApi.create(data);
			}

		} catch (error) {
			console.log("Error on save", error);
		}

	}

	render() {
		return (
			<div>
				<div>
					<div className="form-group">
						<label htmlFor="value">Value</label>
						<input
							type="text"
							className="form-control"
							id="value"
							required
							value={this.state.tax.value || ''}
							onChange={this.onChangeValue}
							name="value"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="description">Description</label>
						<input
							type="text"
							className="form-control"
							id="description"
							required
							value={this.state.tax.description || ''}
							onChange={this.onChangeDescription}
							name="description"
						/>
					</div>

					<button onClick={this.save} className="btn btn-success">
						Submit
					</button>
				</div>
			</div>
		);
	}
}
