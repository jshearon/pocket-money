import React from 'react';
import users from '../../helpers/data/users';

import './Onboarding.scss';

class Onboarding extends React.Component {
  state = {
    familyName: null,
    phoneNumber: null,
    nickname: null,
  }

  updateFamily = (e) => {
    this.setState({ familyName: e.target.value });
  }

  updatePhoneNumber = (e) => {
    this.setState({ phoneNumber: e.target.value });
  }

  updateNickname = (e) => {
    this.setState({ nickname: e.target.value });
  }

  createAccount = (e) => {
    const { guid, hideForm, getUser } = this.props;
    const newFamily = {
      familyName: this.state.familyName,
    };
    const newAccount = {
      name: guid.displayName,
      email: guid.email,
      nickname: this.state.nickname,
      phoneNumber: this.state.phoneNumber,
      photoURL: guid.photoURL,
      isParent: true,
      accountCreatedOn: new Date(),
    };
    users.createFamily(newFamily)
      .then((res) => {
        newAccount.familyId = res.data.name;
        users.createUser(newAccount)
          .then(() => {
            hideForm();
            getUser(guid.email);
          });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="Onboarding d-flex flex-column justify-content-around">
        <h2>Looks like you’re new around here!</h2>
        <div className="form-group">
          <label htmlFor="familyName">Create a new family nickname so you can invite members</label>
          <input type="text" className="form-control" id="familyName" placeholder="Family Name" onChange={this.updateFamily} />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNum">We’ll use your phone number to send you SMS text notifications</label>
          <input type="text" className="form-control" id="phoneNum" placeholder="(615) 555-5555" onChange={this.updatePhoneNumber} />
        </div>
        <div className="form-group">
          <label htmlFor="nickName">Nickname you'd like to appear as to others?</label>
          <input type="text" className="form-control" id="nickName" placeholder="Mom, Grandma, etc" onChange={this.updateNickname} />
        </div>
        <button className="btn btn-primary" onClick={this.createAccount}>Next</button>
      </div>
    );
  }
}

export default Onboarding;
