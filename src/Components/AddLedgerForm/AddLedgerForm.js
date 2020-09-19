import React from 'react';
import ledger from '../../helpers/data/ledger';
import utils from '../../helpers/utils';

import './AddLedgerForm.scss';

class AddLedgerForm extends React.Component {
  state = {
    amount: 0,
    description: null,
    isDebit: false,
  }

  updateState = (e) => {
    this.setState({
      [e.target.id]: e.target.id === 'amount'
        ? parseFloat(e.target.value)
        : e.target.value,
    });
  }

  updateIsDebit = (e) => {
    const isDebit = e.target.checked;
    this.setState({ isDebit });
  }

  createEntry = (e) => {
    const {
      childId,
      updateLedger,
      toggleAddLedgerForm,
    } = this.props;

    const {
      amount,
      description,
      isDebit,
    } = this.state;

    const newLedgerEntry = {
      childId,
      amount,
      description,
      isDebit,
      entryDate: new Date(),
      depositedBy: this.props.parentName,
    };
    ledger.createLedger(newLedgerEntry)
      .then((newLedger) => {
        this.setState({ amount: 0, description: null, isDebit: false });
        updateLedger(childId);
        toggleAddLedgerForm();
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { childName } = this.props;
    return (
      <div className="AddFamilyForm d-flex flex-column justify-content-around">
        <h2>New Transaction for {utils.firstName(childName)}</h2>
        <div className="form-group">
          <label htmlFor="amount">Amount to deposit</label>
          <input type="number" className="form-control" id="amount" placeholder="0.00" onChange={this.updateState} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" id="description" placeholder="Money from Grandma" onChange={this.updateState} />
        </div>
        <div className="form-group">
          <label htmlFor="isDebit">This is a debit</label>
          <input type="checkbox" className="form-control" id="isDebit" onChange={this.updateIsDebit} />
        </div>
        <button className="btn btn-primary" onClick={this.props.toggleAddLedgerForm}>Cancel</button>
        <button className="btn btn-primary" onClick={this.createEntry}>Complete Transaction</button>
      </div>
    );
  }
}

export default AddLedgerForm;
