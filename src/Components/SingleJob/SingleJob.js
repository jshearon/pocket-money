import React from 'react';
import moment from 'moment';
import userData from '../../helpers/data/users';
import './SingleJob.scss';

class SingleJob extends React.Component {
  state = {
    acceptedByThumbnail: {},
  }

  componentDidMount() {
    const { singleJob } = this.props;
    userData.getUserThumbnail(singleJob.acceptedBy)
      .then((acceptedByThumbnail) => {
        this.setState({ acceptedByThumbnail });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const {
      user,
      singleJob,
      editJob,
      deleteJob,
      acceptJob,
      approveJob,
      markJobComplete,
    } = this.props;
    const { acceptedByThumbnail } = this.state;
    return (
      <div className="DisplayLedger m-4">
        <div className="d-flex justify-content-between align-items-start">
        <div className="w-100 ml-3">
          <h4 className="text-left">{singleJob.description}</h4>
          <p className="text-left">Expires on {moment(singleJob.expireDate).format('MMM Do YYYY')}</p>
        </div>
        <h4>${singleJob.payAmount.toFixed(2)}</h4>
        </div>
        { /* Parent Button States  */ }
        { // job unassigned
          user && user.isParent && singleJob.acceptedBy === 0 && <div className="w-100 d-flex justify-content-end">
          <button className="btn ledger-btn" onClick={() => { editJob(singleJob); }}>Edit</button>
          <button className="btn ledger-btn" onClick={() => { deleteJob(singleJob.id); }}>Delete</button>
        </div>
        }
        { // assigned but not complete
          user && user.isParent && singleJob.acceptedBy !== 0 && !singleJob.isComplete && <div className="w-100 d-flex justify-content-end">
          <div className="badgeTight"><img src={acceptedByThumbnail.photoURL} alt="User" className="mr-4" /> <i class="fas fa-hourglass-start"></i> In Progress</div>
        </div>
        }
        { // complete but not approved
          user && user.isParent && singleJob.acceptedBy !== 0 && singleJob.isComplete && singleJob.approvedDate === 0 && <div className="w-100 d-flex justify-content-end">
          <button className="btn ledger-btn-wide" onClick={() => { approveJob(singleJob.id); }}><i class="fas fa-check"></i> Approve {acceptedByThumbnail.name}'s work</button>
        </div>
        }
        { // complete and approved
          user && user.isParent && singleJob.acceptedBy !== 0 && singleJob.isComplete && singleJob.approvedDate !== 0 && <div className="w-100 d-flex justify-content-end">
          <div className="badgeTight">Completed by {acceptedByThumbnail.name}</div>
        </div>
        }
        { /* Child Button States */ }
        { // Not Assigned
          user && !user.isParent && singleJob.acceptedBy === 0 && <div className="w-100 d-flex justify-content-end">
          <button className="btn ledger-btn" onClick={() => { acceptJob(singleJob.id); }}>Accept Job</button>
        </div>
        }
        { // Assigned To Self
          user && !user.isParent && singleJob.acceptedBy !== 0 && singleJob.acceptedBy === user.id && <div className="w-100 d-flex justify-content-end">
          <button className="btn ledger-btn" onClick={() => { markJobComplete(singleJob.id); }}>Report job completed</button>
        </div>
        }
        { // Assigned to someone else incomplete
          user && !user.isParent && singleJob.acceptedBy !== 0 && singleJob.acceptedBy !== user.id && !singleJob.isComplete && <div className="w-100 d-flex justify-content-end">
          <div className="badgeTight"><img src={acceptedByThumbnail.photoURL} alt="User" className="mr-4" />In Progress</div>
        </div>
        }
        { // Assigned to someone else complete
          user && !user.isParent && singleJob.acceptedBy !== 0 && singleJob.acceptedBy !== user.id && singleJob.isComplete && <div className="w-100 d-flex justify-content-end">
          <div className="badgeTight"><img src={acceptedByThumbnail.photoURL} alt="User" className="mr-4" />Completed by {acceptedByThumbnail.name}</div>
        </div>
        }
        { // Complete but not approved
          user && !user.isParent && singleJob.acceptedBy !== 0 && singleJob.acceptedBy === user.id && singleJob.approvedDate === 0 && <div className="w-100 d-flex justify-content-end">
          <div className="badgeTight">Pending Approval</div>
        </div>
        }
        { // complete and approved
          user && !user.isParent && singleJob.acceptedBy !== 0 && singleJob.acceptedBy === user.id && singleJob.approvedDate !== 0 && <div className="w-100 d-flex justify-content-end">
          <div className="badgeTight">Approved!</div>
        </div>
        }
      </div>
    );
  }
}

export default SingleJob;
