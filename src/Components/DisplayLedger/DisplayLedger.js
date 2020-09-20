import React from 'react';
import './DisplayLedger.scss';

class DisplayLedger extends React.Component {
  render() {
    const { ledgerItem, editLedgerItem, deleteLedgerItem } = this.props;
    return (
      <div className="DisplayLedger m-4">
        <p>{ledgerItem.amount}</p>
        <p>{ledgerItem.description}</p>
        <p>{ledgerItem.isDebit}</p>
        <button className="btn" onClick={() => { editLedgerItem(ledgerItem); }}>Edit</button>
        <button className="btn" onClick={() => { deleteLedgerItem(ledgerItem.id); }}>Delete</button>
      </div>
    );
  }
}

export default DisplayLedger;
