import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import AddItemForm from './AddItemForm';
import {Labels} from '../../../constants';

class ListInput extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      columns: [{
        dataField: 'id',
        text: this.props.columnLabel // never changes
      }],
      data: this.props.data ? this.props.data.map(d => ({id: d})) : []
    };

    this.addItem = this.addItem.bind(this);
  }

  addItem(item) {
    return this.setState(previousState => {
      return {
        data: [
          ...previousState.data,
          {id: item}
        ]
      }
    });
  }

  render() {
    const {error, maxItems, label, placeholder, addLabel} = this.props;

    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
      wrapperClass += " " + 'has-error';
    }

    const {columns, data} = this.state;
    const deactivate = maxItems <= (data ? data.length : 0);

    return (
      <div className={wrapperClass}>
        <label>{label}</label>
        <div className="field">
          <div className="card">
            <div className="card-body">
              <div className="card-text">
                <BootstrapTable keyField='id' data={data} columns={columns} />
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
  columnLabel: PropTypes.string,
  addLabel: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  maxItems: PropTypes.number,
  value: PropTypes.array,
  error: PropTypes.string
};

ListInput.defaultProps = {
  addLabel: Labels.common.add_item,
  columnLabel: Labels.common.items
};

export default ListInput;
