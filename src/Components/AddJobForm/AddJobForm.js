import React from 'react';
import DatePicker from 'react-datepicker';

import jobsData from '../../helpers/data/jobsData';

import 'react-datepicker/dist/react-datepicker.css';

import './AddJobForm.scss';

class AddJobForm extends React.Component {
  state = {
    payAmount: 0,
    description: null,
    expireDate: new Date(),
    jobData: {},
  }

  updateDate = (date) => {
    this.setState({
      expireDate: date,
    });
  };

  updateState = (e) => {
    this.setState({
      [e.target.id]: e.target.id === 'payAmount'
        ? parseFloat(e.target.value)
        : e.target.value,
    });
  }

  addNewJob = (e) => {
    const {
      user,
      updateJobs,
      toggleAddJobForm,
    } = this.props;

    const {
      payAmount,
      description,
      expireDate,
    } = this.state;

    const newJobEntry = {
      createdBy: user.id,
      createdDate: new Date(),
      description,
      expireDate,
      payAmount,
      isComplete: false,
      completeDate: 0,
      acceptedBy: 0,
    };
    jobsData.createJob(newJobEntry)
      .then((newJob) => {
        this.setState({ payAmount: 0, description: null, expireDate: new Date() });
        updateJobs();
        toggleAddJobForm();
      })
      .catch((err) => console.error(err));
  }

  editEntry = (e) => {
    const {
      updateJobs,
      toggleAddJobForm,
      clearJobData,
    } = this.props;
    const {
      jobData,
      payAmount,
      description,
      expireDate,
    } = this.state;
    const updatedJobEntry = {
      createdBy: jobData.createdBy,
      createdDate: jobData.createdDate,
      description,
      expireDate,
      payAmount,
      isComplete: jobData.isComplete,
      completeDate: jobData.completeDate,
      acceptedBy: jobData.acceptedBy,
    };
    jobsData.updateJob(jobData.id, updatedJobEntry)
      .then(() => {
        clearJobData();
        this.setState({ amount: 0, description: null, isDebit: false });
        updateJobs();
        toggleAddJobForm();
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    const { jobData } = this.props;
    jobData.id && this.setState({
      jobData,
      payAmount: jobData.payAmount,
      description: jobData.description,
      expireDate: new Date(jobData.expireDate),
    });
  }

  render() {
    const {
      payAmount,
      description,
      expireDate,
    } = this.state;
    return (
      <div className="AddFamilyForm d-flex flex-column justify-content-around">
        <h2>Add New Job</h2>
        <div>
        <div className="form-row align-items-center">
          <div className="form-group col">
            <label htmlFor="payAmount">Job Pays</label>
            <input type="number" className="form-control w-75" id="payAmount" placeholder="0.00" onChange={this.updateState} value={payAmount}/>
          </div>
          <div className="form-group col">
            <label htmlFor="expireDate">Job Expire Date</label>
            <DatePicker selected={expireDate} onChange={this.updateDate} className="form-control w-100" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" placeholder="Take out the trash" onChange={this.updateState} value={description || ''} />
          </div>
        </div>
        </div>
            <button className="btn btn-primary m-1" onClick={this.editEntry}>Edit Transaction</button>
            <button className="btn btn-primary m-1" onClick={this.addNewJob}>Complete Transaction</button>
        <button className="btn btn-primary m-1" onClick={this.props.toggleAddJobForm}>Cancel</button>
      </div>
    );
  }
}

export default AddJobForm;
