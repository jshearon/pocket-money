import React from 'react';
import './DisplayLedger.scss';

class DisplayLedger extends React.Component {
  render() {
    const { ledgerItem, editLedgerItem } = this.props;
    return (
      <div className="DisplayLedger m-4">
        <p>{ledgerItem.amount}</p>
        <p>{ledgerItem.description}</p>
        <p>{ledgerItem.isDebit}</p>
        <button className="btn" onClick={() => { editLedgerItem(ledgerItem); }}>Edit</button>
        <button className="btn" onClick={() => { this.props.deleteLedger(ledgerItem.id); }}>Delete</button>
      </div>
    );
  }
}

export default DisplayLedger;
