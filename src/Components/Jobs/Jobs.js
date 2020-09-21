import React from 'react';
import { CSSTransition } from 'react-transition-group';
import AddJobForm from '../AddJobForm/AddJobForm';
import SingleJob from '../SingleJob/SingleJob';
import jobsData from '../../helpers/data/jobsData';
import ledger from '../../helpers/data/ledger';

class Jobs extends React.Component {
  state = {
    addJobForm: null,
    jobsList: [],
    jobData: {},
  }

  clearJobData = () => {
    this.setState({ ledger: {} });
  }

  toggleAddJobForm = (e) => {
    if (e && e.target.id === 'newJob') {
      this.setState({ jobData: {} });
    }
    this.setState((prevState) => ({
      addJobForm: !prevState.addJobForm,
    }));
  }

  updateJobs = () => {
    jobsData.getAllJobs()
      .then((jobsList) => {
        this.setState({ jobsList });
      })
      .catch((err) => console.error(err));
  }

  deleteJob = (jobId) => {
    jobsData.deleteJob(jobId)
      .then(() => {
        this.updateJobs();
      })
      .catch((err) => console.error(err));
  }

  approveJob = (jobId, newDeposit) => {
    const editedJob = {
      approvedDate: new Date(),
    };
    jobsData.updateJob(jobId, editedJob)
      .then(() => {
        ledger.createLedger(newDeposit)
          .then(() => {
            this.updateJobs();
          });
      })
      .catch((err) => console.error(err));
  }

  acceptJob = (jobId, childId) => {
    const editedJob = {
      acceptedBy: childId,
    };
    jobsData.updateJob(jobId, editedJob)
      .then(() => {
        this.updateJobs();
      })
      .catch((err) => console.error(err));
  }

  markJobComplete = (jobId) => {
    const editedJob = {
      isComplete: true,
    };
    jobsData.updateJob(jobId, editedJob)
      .then(() => {
        this.updateJobs();
      })
      .catch((err) => console.error(err));
  }

  editJob = (jobData) => {
    this.setState({ jobData });
    this.toggleAddJobForm();
  }

  componentDidMount() {
    this.updateJobs();
  }

  render() {
    const { user } = this.props;
    const { addJobForm, jobsList, jobData } = this.state;
    const printJobs = jobsList.map((singleJob) => <SingleJob
        key={singleJob.id}
        singleJob={singleJob}
        editJob={this.editJob}
        deleteJob={this.deleteJob}
        approveJob={this.approveJob}
        acceptJob={this.acceptJob}
        markJobComplete={this.markJobComplete}
        user={user}
      />);
    return (
      <div className="Jobs content d-flex flex-column justify-content-start">
        <CSSTransition key={'addJobForm'} in={addJobForm} timeout={500} classNames="addFamilyForm" unmountOnExit appear exit>
          <AddJobForm
            toggleAddJobForm={this.toggleAddJobForm}
            updateJobs={this.updateJobs}
            jobData={jobData}
            clearJobData={this.clearJobData}
            user={user}
          />
        </CSSTransition>
        {
          user && user.isParent && <button className="btn btn-primary m-3" onClick={this.toggleAddJobForm} id="newItem"><i className="fas fa-plus-circle"></i> Add New Job</button>
        }
        <div className="child-ledger">
          {printJobs}
        </div>
      </div>
    );
  }
}

export default Jobs;
