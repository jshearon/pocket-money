import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './Dashboard.scss';
import Onboarding from '../Onboarding/Onboarding';
import Family from '../Family/Family';
import AddFamilyForm from '../AddFamilyForm/AddFamilyForm';
import blankAddUser from '../../Assets/Images/blankAddUser.svg';

class Dashboard extends React.Component {
  state = {
    showOnboardForm: false,
    addFamilyForm: false,
  }

  componentDidMount() {
    this.props.updateUser();
  }

  hideForm = () => this.setState({ showOnboardForm: false });

  toggleAddFamilyForm = () => {
    this.setState((prevState) => ({
      addFamilyForm: !prevState.addFamilyForm,
    }));
  }

  buildDashboard = () => {
    const { addFamilyForm } = this.state;
    const { family, user, updateFamily } = this.props;
    return (
      user.isParent
        ? (
        <div className="parent d-flex flex-column justify-content-start align-items-center h-100">
          <CSSTransition in={addFamilyForm} timeout={250} classNames="addFamilyForm" unmountOnExit appear exit>
            <AddFamilyForm userId={user.id} familyId={user.familyId} toggleAddFamilyForm={this.toggleAddFamilyForm} updateFamily={updateFamily} />
          </CSSTransition>
          <h2>{user.familyName}</h2>
          <div className="d-flex flex-row flex-wrap justify-content-around align-items-start">
            <Family userId={user.id} familyId={user.familyId} updateFamily={updateFamily} family={family} />
            <div className="d-flex flex-column justify-content-between text-center">
              <img className="addBlankUser align-items-start" src={blankAddUser} alt="Blank Add User" onClick={this.toggleAddFamilyForm} />
              <h5>New</h5>
            </div>
          </div>
        </div>
        )
        : (
          <div className="child">
            <p>child stats go here</p>
          </div>
        )
    );
  }

  render() {
    const { showOnboardForm } = this.state;
    const { guid, updateUser } = this.props;
    return (
      <div className="Dashboard content">
        {
        showOnboardForm
          ? (<Onboarding guid={guid} hideForm={this.hideForm} updateUser={updateUser}/>)
          : this.buildDashboard()
        }
      </div>
    );
  }
}

export default Dashboard;
