import React from 'react';
// import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import AddItemForm from './AddItemForm';

class ListInput extends React.Component {
  constructor(props, context) {
    super(props, context);

    const currentTime = (new Date()).getTime();

    this.state = {
      products: [{id: currentTime, name: 'Item name 0', price: 2100}, {id: currentTime + 1, name: 'Item name 1', price: 2101}, {id: currentTime + 2, name: 'Item name 2', price: 2102}]
    };

    this.addItem = this.addItem.bind(this);
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  addItem(item) {
    return this.setState({products: [
      ...this.state.products,
      Object.assign({}, {id: (new Date()).getTime(), name: item, price: this.getRndInteger(2000, 3000)})
    ]});
  }

  render() {
    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    return (
      <div>
        <BootstrapTable keyField='id' data={ this.state.products } columns={ columns } />
        <AddItemForm onAddItem={this.addItem} addLabel="CHANGEME" />
      </div>
    );
  }
}

export default ListInput;
