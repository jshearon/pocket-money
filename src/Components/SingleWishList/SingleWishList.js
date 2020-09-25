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
      requestApproveWishList,
      approveWishList,
      balance,
      user,
    } = this.props;
    const percentage = (Math.round(balance > singleWishList.costAmount))
      ? 100
      : Math.round((balance / singleWishList.costAmount) * 100);
    return (
      <div className="DisplayLedger m-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <img className="wishlist-thumbnail" src={singleWishList.photoUrl} alt="product" />
          <div className="w-100 ml-3">
            <h6>{singleWishList.description}</h6>
            <h6>${singleWishList.costAmount.toFixed(2)}</h6>
          </div>
            <CircularProgressbarWithChildren value={percentage} className="progressBar">
              <span>{percentage}%</span>
            </CircularProgressbarWithChildren>
        </div>
        <div className="w-100 d-flex justify-content-end">
          {
            user && !user.isParent && singleWishList.isApproved === 0
              && <React.Fragment>
                  <button className="btn ledger-btn-wide" onClick={() => { editWishList(singleWishList); }}>Edit</button>
                  <button className="btn ledger-btn-wide ml-2" onClick={() => { deleteWishList(singleWishList.id); }}>Delete</button>
                </React.Fragment>
          }
          {
            user && !user.isParent && singleWishList.isApproved === 0 && balance >= singleWishList.costAmount
              && <button className="btn ledger-btn-wide ml-2" onClick={() => { requestApproveWishList(singleWishList.id); }}>
                  Ask To Buy
                 </button>
          }
          {
            user && !user.isParent && singleWishList.isApproved === 'pending'
              && <span className="badge ml-2">Pending</span>
          }
          {
            user && !user.isParent && singleWishList.isApproved === 'approved'
              && <span className="badge ml-2">Approved</span>
          }
          {
            user && !user.isParent && singleWishList.isApproved === 'declined'
              && <React.Fragment>
                <span className="badge ml-2">Declined</span>
              </React.Fragment>
          }
          {
            user && user.isParent && singleWishList.isApproved === 'pending'
            && <React.Fragment>
            <button className="btn ledger-btn-wide" onClick={() => { approveWishList(singleWishList, 'approved'); }}>Approve</button>
            <button className="btn ledger-btn-wide ml-2" onClick={() => { approveWishList(singleWishList.id, 'declined'); }}>Decline</button>
            </React.Fragment>
          }
          {
            user && user.isParent && singleWishList.isApproved === 'approved'
            && <React.Fragment>
              <span className="badge ml-2">Approved</span>
            </React.Fragment>
          }
          {
            user && user.isParent && singleWishList.isApproved === 'declined'
            && <React.Fragment>
              <span className="badge ml-2">Declined</span>
            </React.Fragment>
          }
        </div>
      </div>
    );
  }
}

export default SingleWishList;
