import React from 'react';
import { CSSTransition } from 'react-transition-group';
import CountUp from 'react-countup';
import users from '../../helpers/data/users';

import './Dashboard.scss';
import Onboarding from '../Onboarding/Onboarding';
import Family from '../Family/Family';
import AddFamilyForm from '../AddFamilyForm/AddFamilyForm';
import blankAddUser from '../../Assets/Images/blankAddUser.svg';

class Dashboard extends React.Component {
  state = {
    showOnboardForm: false,
    addFamilyForm: false,
    family: [],
  }

  updateUser = () => {
    const {
      navbarOff,
      navbarOn,
      user,
    } = this.props;
    if (user === null) return;
    if (user.email) {
      if (this.state.showOnboardForm === true) {
        this.setState({ showOnboardForm: false });
      }
      navbarOn();
    } else if (this.state.showOnboardForm === false && !user.email) {
      this.setState({ showOnboardForm: true });
      navbarOff();
    }
  }

  updateFamily = (familyId, userId) => {
    users.getFamilyMembers(familyId, userId)
      .then((family) => {
        if (family) {
          this.setState({ family });
        }
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    setTimeout(() => {
      const { user, guid } = this.props;
      const newInfo = {
        name: guid.displayName,
        photoURL: guid.photoURL,
        needsInfo: false,
      };
      if (user !== null && user.needsInfo === true) {
        users.updateUser(user.id, newInfo);
      }
    }, 5000);
  }

  componentDidUpdate() {
    if (this.props.user !== null) {
      this.updateUser();
    }
  }

  hideForm = () => {
    this.setState({ showOnboardForm: false });
  }

  toggleAddFamilyForm = () => {
    this.setState((prevState) => ({
      addFamilyForm: !prevState.addFamilyForm,
    }));
  }

  buildDashboard = () => {
    const { addFamilyForm, family } = this.state;
    const { user, balance } = this.props;
    return (
      user.isParent
        ? (
        <div className="parent d-flex flex-column justify-content-start align-items-center h-100">
          <CSSTransition in={addFamilyForm} timeout={250} classNames="addFamilyForm" unmountOnExit appear exit>
            <AddFamilyForm userId={user.id} familyId={user.familyId} toggleAddFamilyForm={this.toggleAddFamilyForm} updateFamily={this.updateFamily} />
          </CSSTransition>
          <h2>{user.familyName}</h2>
          <div className="d-flex flex-row flex-wrap justify-content-around align-items-start">
            <Family userId={user.id} familyId={user.familyId} updateFamily={this.updateFamily} family={family} />
            <div className="d-flex flex-column justify-content-between text-center">
              <img className="addBlankUser align-items-start" src={blankAddUser} alt="Blank Add User" onClick={this.toggleAddFamilyForm} />
              <h5>New</h5>
            </div>
          </div>
        </div>
        )
        : (
          <div className="child dashboard-balance d-flex flex-column justify-content-center align-items-center h-100">
            <h3>You've Saved:</h3>
            <h1>$<CountUp start={0} end={balance * 1} decimals={2} duration={4} /></h1>
          </div>
        )
    );
  }

  render() {
    const { showOnboardForm } = this.state;
    const { getUser, user } = this.props;
    if (user === null) {
      return (
        <div className="loader fa-3x"><i className="fas fa-cog fa-spin"></i></div>
      );
    }
    return (
      <div className="Dashboard content">
        {
        showOnboardForm
          ? (<Onboarding guid={this.props.guid} hideForm={this.hideForm} getUser={getUser} />)
          : this.buildDashboard()
        }
      </div>
    );
  }
}

export default Dashboard;
