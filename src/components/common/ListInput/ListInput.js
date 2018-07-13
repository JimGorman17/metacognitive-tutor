import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import AddItemForm from './AddItemForm';
import {Labels} from '../../../constants';
import {Button} from 'react-bootstrap/lib';

class ListInput extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      columns: [
      {
        dataField: 'id',
        text: this.props.label // never changes
      },
      {
        dataField: 'buttons',
        formatter:this.cellButton.bind(this)
      }],
      data: this.props.data ? this.props.data.map(d => ({id: d})) : []
    };

    this.addItem = this.addItem.bind(this);
  }

  addItem(item) {
    this.setState(previousState => {
      return {
        data: [
          ...previousState.data,
          {id: item}
        ]
      }
    });
  }

  onDelete(rowIndex) {
    this.setState(previousState => {
      return {
        data: previousState.data.filter((_, i) => i !== rowIndex)
      }
    });
  }

  cellButton(cell, row, rowIndex) {
    return (
        <Button onClick={this.onDelete.bind(this,rowIndex)}><i className={`fa fa-trash-o fa-fw`} aria-hidden="true" />&nbsp; {Labels.teacher.lesson_form.manage_lesson.remove}</Button>
    )
  }

  render() {
    const {error, maxItems, placeholder, addLabel} = this.props;

    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
      wrapperClass += " " + 'has-error';
    }

    const {columns, data} = this.state;
    const deactivate = maxItems <= (data ? data.length : 0);

    return (
      <div className={wrapperClass}>
        <div className="field">
          <div className="card">
            <div className="card-body">
              <div className="card-text">
                <BootstrapTable keyField='id' data={data} columns={columns} deleteRow={ true } />
                <AddItemForm onAddItem={this.addItem} placeholder={placeholder} addLabel={addLabel} deactivate={deactivate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ListInput.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string),
  addLabel: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  maxItems: PropTypes.number,
  value: PropTypes.array,
  error: PropTypes.string
};

ListInput.defaultProps = {
  addLabel: Labels.common.add_item
};

export default ListInput;
