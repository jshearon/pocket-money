import React from 'react';
import users from '../../helpers/data/users';

import './AddFamilyForm.scss';

class AddFamilyForm extends React.Component {
  state = {
    email: null,
    isParent: false,
  }

  updateEmail = (e) => {
    this.setState({ email: e.target.value });
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
      email: this.state.email,
      isParent: this.state.isParent,
      accountCreatedOn: new Date(),
      familyId,
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
