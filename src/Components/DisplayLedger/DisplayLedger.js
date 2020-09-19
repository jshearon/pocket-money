import React from 'react';

class DisplayLedger extends React.Component {
  render() {
    const { ledgerItem } = this.props;
    return (
      <div>
        <p>{ledgerItem.amount}</p>
        <p>{ledgerItem.depositedBy}</p>
        <p>{ledgerItem.description}</p>
        <p>{ledgerItem.isDebit}</p>
      </div>
    );
  }
}

export default DisplayLedger;
