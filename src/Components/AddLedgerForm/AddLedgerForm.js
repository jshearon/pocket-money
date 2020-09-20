import React from 'react';
import ledger from '../../helpers/data/ledger';
import utils from '../../helpers/utils';

import './AddLedgerForm.scss';

class AddLedgerForm extends React.Component {
  state = {
    amount: 0,
    description: null,
    isDebit: false,
    ledgerData: {},
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

  editEntry = (e) => {
    const {
      childId,
      updateLedger,
      toggleAddLedgerForm,
      clearLedger,
    } = this.props;
    const {
      ledgerData,
      amount,
      description,
      isDebit,
    } = this.state;
    const updatedLedgerEntry = {
      childId: ledgerData.childId,
      amount,
      description,
      isDebit,
      entryDate: ledgerData.entryDate,
      depositedBy: ledgerData.depositedBy,
    };
    ledger.updateLedger(ledgerData.id, updatedLedgerEntry)
      .then(() => {
        clearLedger();
        this.setState({ amount: 0, description: null, isDebit: false });
        updateLedger(childId);
        toggleAddLedgerForm();
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    const { ledgerData } = this.props;
    ledgerData.id && this.setState({
      ledgerData,
      amount: ledgerData.amount,
      description: ledgerData.description,
      isDebit: ledgerData.isDebit,
    });
  }

  render() {
    const { childName } = this.props;
    const {
      amount,
      description,
      isDebit,
      ledgerData,
    } = this.state;
    return (
      <div className="AddFamilyForm d-flex flex-column justify-content-around">
        {
          ledgerData.id
            ? <h2>Edit Transaction for {utils.firstName(childName)}</h2>
            : <h2>New Transaction for {utils.firstName(childName)}</h2>
        }
        <div>
        <div className="form-row align-items-center">
          <div className="form-group col">
            <label htmlFor="amount">Amount to deposit</label>
            <input type="number" className="form-control w-75" id="amount" placeholder="0.00" onChange={this.updateState} value={amount}/>
          </div>
          <div className="form-group form-inline col">
            <input type="checkbox" className="form-control big-checkbox m-3" id="isDebit" onChange={this.updateIsDebit} checked={isDebit} />
            <label htmlFor="isDebit" className="col-form-label">This is a debit</label>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" placeholder="Money from Grandma" onChange={this.updateState} value={description || ''} />
          </div>
        </div>
        </div>
        {
          ledgerData.id
            ? <button className="btn btn-primary m-1" onClick={this.editEntry}>Edit Transaction</button>
            : <button className="btn btn-primary m-1" onClick={this.createEntry}>Complete Transaction</button>
        }
        <button className="btn btn-primary m-1" onClick={this.props.toggleAddLedgerForm}>Cancel</button>
      </div>
    );
  }
}

export default AddLedgerForm;
