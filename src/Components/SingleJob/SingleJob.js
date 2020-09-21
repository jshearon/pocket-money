import React from 'react';
import moment from 'moment';

class SingleJob extends React.Component {
  render() {
    const {
      user,
      singleJob,
    } = this.props;
    return (
      <div className="DisplayLedger m-4">
        <div className="d-flex justify-content-between align-items-start">
        <div className="w-100 ml-3">
          <h4 className="text-left">{singleJob.description}</h4>
          <p className="text-left">Expires on {moment(singleJob.expireDate).format('MMM Do YYYY')}</p>
        </div>
        <h4>${singleJob.payAmount.toFixed(2)}</h4>
        </div>
        {
          user && user.isParent && <div className="w-100 d-flex justify-content-end">
          <button className="btn ledger-btn" onClick={() => {  }}>Edit</button>
          <button className="btn ledger-btn" onClick={() => {  }}>Delete</button>
        </div>
        }
      </div>
    );
  }
}

export default SingleJob;
