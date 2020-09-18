import React from 'react';
import users from '../../helpers/data/users';

import './AddFamilyForm.scss';

class AddFamilyForm extends React.Component {
  state = {
    email: null,
    isParent: false,
    nickname: null,
    phoneNumber: null,
  }

  updateEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  updateNickname = (e) => {
    this.setState({ nickname: e.target.value });
  }

  updatePhoneNumber = (e) => {
    this.setState({ phoneNumber: e.target.value });
  }

  updateIsParent = (e) => {
    const isParent = e.target.checked;
    this.setState({ isParent });
  }

  createAccount = (e) => {
    const {
      familyId,
      userId,
      toggleAddFamilyForm,
      updateFamily,
    } = this.props;

    const newAccount = {
      accountCreatedOn: new Date(),
      email: this.state.email,
      familyId,
      nickname: this.state.nickname,
      phoneNumber: this.state.phoneNumber,
      isParent: this.state.isParent,
      needsInfo: true,
    };
    users.createUser(newAccount)
      .then(() => {
        this.setState({ email: null, isParent: false });
        updateFamily(familyId, userId);
        toggleAddFamilyForm();
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="AddFamilyForm d-flex flex-column justify-content-around">
        <h2>Add a new family member</h2>
        <div className="form-group">
          <label htmlFor="email">New members email address</label>
          <input type="text" className="form-control" id="email" placeholder="alex@gmail.com" onChange={this.updateEmail} />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">Nickname for user</label>
          <input type="text" className="form-control" id="nickname" placeholder="Zoe" onChange={this.updateNickname} />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Member's phone number</label>
          <input type="text" className="form-control" id="phoneNumber" placeholder="(615) 867-5309" onChange={this.updatePhoneNumber} />
        </div>
        <div className="form-group">
          <label htmlFor="isParent">User is Parent (can approve purchases)</label>
          <input type="checkbox" className="form-control" id="isParent" onChange={this.updateIsParent} checked={this.state.isParent} />
        </div>
        <button className="btn btn-primary" onClick={this.props.toggleAddFamilyForm}>Cancel</button>
        <button className="btn btn-primary" onClick={this.createAccount}>Create Account</button>
      </div>
    );
  }
}

export default AddFamilyForm;
