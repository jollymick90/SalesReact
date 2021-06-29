import React, { Component } from 'react';
import CategoryApi from '../../../../services/network/category';

export class EditCategory extends Component {

  constructor(props) {
    super(props);
    this.categoryId = props.dataId;
    this.onChangeName = this.onChangeName.bind(this);
    this.save = this.save.bind(this);
    this.setState({ category: {}, loading: false });
  }

  componentDidMount() {
    this.populate();
  }

  async populate() {
    let data = {};
    if (this.categoryId > 0) {
      const response = await CategoryApi.get(this.categoryId);
      data = response.data;
    }

    this.setState({ category: data, loading: false });
  }

  onChangeValue(e) {
    const taxUpdate = { ...this.state.tax };
    taxUpdate.value = e.target.value;
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
        value: this.state.category.value
      };
      if (this.categoryId) {
        data.categoryId = this.categoryId;
        await CategoryApi.update(this.categoryId, data);
      } else {
        await CategoryApi.create(data);
      }

    } catch (error) {
      console.log(`Error ${this.categoryId ? "updating" : "saving"} category`, error);
    }
  }


  render() {
    return (
      <div>
        <div>
          <div className="form-group">
            <label htmlFor="name">name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={this.state.caegoery.name || ''}
              onChange={this.onChangeName}
              name="name"
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
