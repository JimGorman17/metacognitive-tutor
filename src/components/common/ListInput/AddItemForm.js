// inspired by https://codepen.io/antonietta/pen/KzxxWN?editors=1010, 07/11/2018

import React from 'react';
import TextInput from '../TextInput';
// import PropTypes from 'prop-types';

class AddItemForm extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.createFruit}>
        <div className="form-group">
          <TextInput
            name="bookTitle"
            label="Fruit Name"
            // value={lesson.BookTitle}
            // onChange={onChange}
            // error={errors.BookTitle}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Fruit</button>
      </form>
    );
  }
}

export default AddItemForm;
