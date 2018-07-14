import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import AddItemForm from './AddItemForm';
import {Labels} from '../../../constants';
import {Button, ButtonToolbar} from 'react-bootstrap/lib';

class ListInput extends React.Component {
  constructor(props, context) {
    super(props, context);

    const {data} = this.props;

    this.state = {
      columns: [
      {
        dataField: 'id',
        hidden: true
      },
      {
        dataField: 'item',
        text: this.props.label // never changes
      },
      {
        dataField: 'buttons',
        text: "", // required
        formatter: this.renderButtons.bind(this),
        editable: false,
        headerStyle: { width: '10em' }
      }],
      data: data ? data.map((d, index) => ({id: index, item: d})) : []
    };

    this.addItem = this.addItem.bind(this);
    this.immutablySwapItems = this.immutablySwapItems.bind(this);
    this.afterSaveCell = this.afterSaveCell.bind(this);
  }

  onChange() {
    const {name} = this.props;
    const {data} = this.state;
    this.props.onChange({target: {name: name, value: data.map(d => d.item) }});
  }

  addItem(item) {
    this.setState(previousState => {
      return {
        data: [
          ...previousState.data,
          {id: new Date().getTime(), item}
        ]
      }
    }, () => {this.onChange()});
  }

  immutablySwapItems(items, firstIndex, secondIndex) { // https://stackoverflow.com/questions/41127548/how-do-i-swap-array-elements-in-an-immutable-fashion-within-a-redux-reducer, 07/14/2018
    const results = items.slice();
    const firstItem = items[firstIndex];
    results[firstIndex] = items[secondIndex];
    results[secondIndex] = firstItem;

    return results;
  }

  onMoveUp(rowIndex) {
    this.setState(previousState => {
      return {
        data: this.immutablySwapItems(previousState.data, rowIndex, rowIndex - 1)
      }
    }, () => {this.onChange()});
  }

  onMoveDown(rowIndex) {
    this.setState(previousState => {
      return {
        data: this.immutablySwapItems(previousState.data, rowIndex, rowIndex + 1)
      }
    }, () => {this.onChange()});
  }

  onDelete(rowIndex) {
    this.setState(previousState => {
      return {
        data: previousState.data.filter((_, i) => i !== rowIndex)
      }
    }, () => {this.onChange()});
  }

  afterSaveCell(oldValue, newValue, row) {
    if (oldValue !== newValue) {
      this.setState(previousState => {
        const newData = previousState.data.slice();
        newData[row.id] = row;
        return {
          data: newData
        }
      }, () => {this.onChange()});
    }
  }

  renderButtons(cell, row, rowIndex) {
    return (
        <ButtonToolbar>
          <Button disabled={rowIndex === 0} className="btn-sm" onClick={this.onMoveUp.bind(this,rowIndex)} title={Labels.teacher.lesson_form.manage_lesson.move_up}><i className={`fa fa-arrow-up fa-fw`} aria-hidden="true" /></Button>
          <Button disabled={rowIndex === this.state.data.length - 1} className="btn-sm" onClick={this.onMoveDown.bind(this,rowIndex)} title={Labels.teacher.lesson_form.manage_lesson.move_down}><i className={`fa fa-arrow-down fa-fw`} aria-hidden="true" /></Button>
          <Button className="btn-sm" onClick={this.onDelete.bind(this,rowIndex)} title={Labels.teacher.lesson_form.manage_lesson.remove}><i className={`fa fa-trash-o fa-fw`} aria-hidden="true" /></Button>
        </ButtonToolbar>
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

    const cellEdit = cellEditFactory({
       mode: 'click'
      ,blurToSave: true
      ,afterSaveCell: (oldValue, newValue, row, column) => this.afterSaveCell(oldValue, newValue, row, column)
    });

    return (
      <div className={wrapperClass}>
        <div className="card">
          <div className="card-body">
            <div className="card-text">
              <BootstrapTable keyField='id' data={data} columns={columns} cellEdit={cellEdit} />
              <AddItemForm onAddItem={this.addItem} placeholder={placeholder} addLabel={addLabel} deactivate={deactivate} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ListInput.propTypes = {
  name: PropTypes.string.isRequired,
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
