import React from 'react';
import { CSSTransition } from 'react-transition-group';
import AddJobForm from '../AddJobForm/AddJobForm';
import SingleJob from '../SingleJob/SingleJob';
import jobsData from '../../helpers/data/jobsData';

class Jobs extends React.Component {
  state = {
    addJobForm: null,
    jobsList: [],
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

  componentDidMount() {
    this.updateJobs();
  }

  render() {
    const { user } = this.props;
    const { addJobForm, jobsList } = this.state;
    const printJobs = jobsList.map((singleJob) => <SingleJob key={singleJob.id} singleJob={singleJob} user={user} />);
    return (
      <div className="Jobs content d-flex flex-column justify-content-start">
        <CSSTransition key={'addJobForm'} in={addJobForm} timeout={500} classNames="addFamilyForm" unmountOnExit appear exit>
          <AddJobForm
            toggleAddJobForm={this.toggleAddJobForm}
            updateJobs={this.updateJobs}
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
