import React, { Component } from 'react';
import GoodApi from '../../../../services/network/good';

export class EditGood extends Component {

  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeCategoryId = this.onChangeCategoryId.bind(this);
    this.save = this.save.bind(this);

    this.goodId = props.dataId;
    this.state = {
      good: {},
      loading: true
    }
  }

  componentDidMount() {
    this.populate();

  }

  async populate() {
    let data = {};
    if (this.goodId > 0) {
      const response = await GoodApi.get(this.goodId);
      data = response.data;
      console.log(data)
    }

    this.setState({ good: data, loading: false });
  }

  onChangeName(e) {
    const goodUpdate = { ...this.state.good };
    goodUpdate.name = e.target.value;
    this.setState({
      good: goodUpdate,
      loading: false
    });
  }

  onChangePrice(e) {
    const goodUpdate = { ...this.state.good };
    goodUpdate.price = e.target.value;
    this.setState({
      good: goodUpdate,
      loading: false
    });
  }

  onChangeCategoryId(e) {
    const goodUpdate = { ...this.state.good };
    goodUpdate.categoryId = e.target.value;
    this.setState({
      good: goodUpdate,
      loading: false
    });
  }

  save() {
    this.onSave();
  }

  async onSave() {
    try {
      const data = {
        name: this.state.good.name,
        price: this.state.good.price,
        categoryId: this.state.good.categoryId
      };
      if (this.goodId > 0) {
        data.goodId = this.goodId;
        await GoodApi.update(this.goodId, data);
      } else {
        await GoodApi.create(data);
      }
    } catch (error) {
      console.log("Error on save", error);
    }
  }
  
  extractName(good) {
    if (good && good.name) {
      return good.name.trim();
    } else {
      return ""
    }    
  }
  render() {
    return (
      <div>
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={ this.extractName(this.state.good)}
              onChange={this.onChangeName}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              required
              value={this.state.good.price || ''}
              onChange={this.onChangePrice}
              name="price"
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryId">Category</label>
            <input
              type="text"
              className="form-control"
              id="categoryId"
              required
              value={this.state.good.categoryId || ''}
              onChange={this.onChangeCategoryId}
              name="categoryId"
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
