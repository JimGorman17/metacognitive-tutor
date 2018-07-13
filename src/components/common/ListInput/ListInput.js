import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import AddItemForm from './AddItemForm';
import {Labels} from '../../../constants';

class ListInput extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: this.props.data || []
    };

    this.addItem = this.addItem.bind(this);
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  addItem(item) {
    return this.setState(previousState => {
      return {
        data: [
          ...previousState.data,
          {
            id: new Date().getTime(),
            name: item,
            price: this.getRndInteger(2000, 3000)
          }
        ]
      }
    });
  }

  render() {
    const {error, maxItems, label, placeholder, columns, addLabel} = this.props;

    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
      wrapperClass += " " + 'has-error';
    }

    const {data} = this.state;
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
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
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
