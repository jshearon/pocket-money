import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// eslint-disable-next-line import/no-unresolved
import './SingleWishList.scss';

class SingleWishList extends React.Component {
  render() {
    const {
      singleWishList,
      editWishList,
      deleteWishList,
      approveWishList,
      balance,
    } = this.props;
    const percentage = balance / singleWishList.costAmount < 1
      ? balance / singleWishList.costAmount
      : 100;
    return (
      <div className="DisplayLedger m-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <img className="wishlist-thumbnail" src={singleWishList.photoUrl} alt="product" />
          <div className="w-100 ml-3">
            <h6>{singleWishList.description}</h6>
            <h6>${singleWishList.costAmount.toFixed(2)}</h6>
          </div>
            <CircularProgressbarWithChildren value={percentage} className="progressBar">
              <span>{(percentage * 100).toFixed(0)}%</span>
            </CircularProgressbarWithChildren>
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
