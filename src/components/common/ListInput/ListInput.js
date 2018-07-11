import React from 'react';
// import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import AddItemForm from './AddItemForm';

class ListInput extends React.Component {
  constructor(props, context) {
    super(props, context);
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

    const products = [{id: 0, name: 'Item name 0', price: 2100}, {id: 1, name: 'Item name 1', price: 2101}, {id: 2, name: 'Item name 2', price: 2102}];

    return (
      <div>
        <BootstrapTable keyField='id' data={ products } columns={ columns } />
        <AddItemForm />
      </div>
    );
  }
}

export default ListInput;
