import React from 'react';
import moment from 'moment';

import './DisplayLedger.scss';

class DisplayLedger extends React.Component {
  render() {
    const {
      ledgerItem,
      editLedgerItem,
      deleteLedgerItem,
      user,
    } = this.props;
    return (
      <div className="DisplayLedger m-4">
        <div className="d-flex justify-content-between align-items-start">
        {
          ledgerItem.isDebit
            ? <h2 className={ledgerItem.isDebit ? 'isDebit' : 'isCredit'}><i className="fas fa-minus-circle"></i></h2>
            : <h2 className={ledgerItem.isDebit ? 'isDebit' : 'isCredit'}><i className="fas fa-plus-circle"></i></h2>
        }
        <div className="w-100 ml-3">
          <h4 className="text-left">{ledgerItem.description}</h4>
          <p className="text-left">{moment(ledgerItem.entryDate).format('MMM Do YYYY')}</p>
        </div>
        <h4>${ledgerItem.amount.toFixed(2)}</h4>
        </div>
        {
          user.isParent && <div className="w-100 d-flex justify-content-end">
          <button className="btn ledger-btn" onClick={() => { editLedgerItem(ledgerItem); }}>Edit</button>
          <button className="btn ledger-btn" onClick={() => { deleteLedgerItem(ledgerItem.id); }}>Delete</button>
        </div>
        }
      </div>
    );
  }
}

export default DisplayLedger;
