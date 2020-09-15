import React from 'react';
import users from '../../helpers/data/users';
import utils from '../../helpers/utils';

import './Onboarding.scss';

class Onboarding extends React.Component {
  state = {
    familyName: null,
    phoneNumber: null,
  }

  updateFamily = (e) => {
    this.setState({ familyName: e.target.value });
  }

  updatePhoneNumber = (e) => {
    this.setState({ phoneNumber: e.target.value });
  }

  createAccount = (e) => {
    const { guid, hideForm } = this.props;
    const newFamily = {
      familyName: this.state.familyName,
    };
    const newAccount = {
      name: guid.displayName,
      phoneNumber: this.state.phoneNumber,
      isParent: true,
      accountCreatedOn: new Date(),
    };
    users.createFamily(newFamily)
      .then((res) => {
        newAccount.familyId = res.data.name;
        users.createUser(newAccount)
          .then(() => {
            hideForm();
          });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { guid } = this.props;
    return (
      <div className="Onboarding">
        <span>{utils.firstName(guid.displayName)}</span>
        <img className="faceThumb" src={guid.photoURL} alt="Face Thumbnail" />
        <h2>Looks like you’re new around here!</h2>
        <div className="form-group">
          <label htmlFor="familyName">If you’re a parent, create a new family nickname so you can invite members</label>
          <input type="text" className="form-control" id="familyName" placeholder="Family Name" onChange={this.updateFamily} />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNum">We’ll use your phone number to send you SMS text notifications</label>
          <input type="text" className="form-control" id="phoneNum" placeholder="(615) 555-5555" onChange={this.updatePhoneNumber} />
        </div>
        <button className="btn btn-primary" onClick={this.createAccount}>Next</button>
      </div>
    );
  }
}

export default Onboarding;
