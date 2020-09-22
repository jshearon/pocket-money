import React from 'react';
// eslint-disable-next-line import/no-unresolved
import './SingleWishList.scss';

class SingleWishList extends React.Component {
  render() {
    const {
      singleWishList,
      editWishList,
      deleteWishList,
      approveWishList,
    } = this.props;
    return (
      <div className="DisplayLedger m-4">
        <div className="d-flex justify-content-between align-items-start">
        <div className="w-100 ml-3">
          <h4>{singleWishList.description}</h4>
          <h6>${singleWishList.costAmount.toFixed(2)}</h6>
        </div>
        </div>
        <div className="w-100 d-flex justify-content-end">
          <button className="btn ledger-btn-wide" onClick={() => { editWishList(singleWishList); }}>Edit</button>
          <button className="btn ledger-btn-wide ml-2" onClick={() => { deleteWishList(singleWishList.id); }}>Delete</button>
          {
            singleWishList.requestApproval === 'pending'
              ? <span className="badge ml-2">Pending</span>
              : <button className="btn ledger-btn-wide ml-2" onClick={() => { approveWishList(singleWishList.id); }}>Ask To Buy</button>
          }
        </div>
      </div>
    );
  }
}

export default SingleWishList;
