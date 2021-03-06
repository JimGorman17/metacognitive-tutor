// inspired by https://codepen.io/antonietta/pen/KzxxWN?editors=1010, 07/11/2018

import React from 'react';
import PropTypes from 'prop-types';
import {Button, FormControl} from 'react-bootstrap/lib';

class AddItemForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.addItem = this.addItem.bind(this);
  }

  addItem() {
    const item = this.myInput.value;
    if(typeof item === "string" && item.trim().length) {
      this.props.onAddItem(item);
      this.myInput.value = "";
    }
  }

  render() {
    const {deactivate, addLabel} = this.props;
    return (
      <div className="form-inline">
        <FormControl inputRef={ref => { this.myInput = ref; }} disabled={deactivate} />
        <Button onClick={this.addItem}><i className="fa fa-plus fa-fw" aria-hidden="true" disabled={deactivate} />&nbsp; {addLabel}</Button>
      </div>
    );
  }
}

AddItemForm.propTypes = {
  onAddItem: PropTypes.func.isRequired,
  addLabel: PropTypes.string.isRequired,
  deactivate: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string
};

export default AddItemForm;
