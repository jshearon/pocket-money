import React from 'react';
import users from '../../helpers/data/users';

import './Dashboard.scss';
import Onboarding from '../Onboarding/Onboarding';

class Dashboard extends React.Component {
  state = {
    showOnboardForm: false,
    user: {},
  }

  updateUser = () => {
    const { guid, navbarOff, navbarOn } = this.props;
    users.getUserByEmail(guid.email)
      .then((user) => {
        if (user) {
          this.setState({ user });
          navbarOn();
        } else {
          this.setState({ showOnboardForm: true });
          navbarOff();
        }
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.updateUser();
  }

  hideForm = () => this.setState({ showOnboardForm: false });

  buildDashboard = () => {
    const { user } = this.state;
    return (
      user.isParent
        ? (
        <div className="parent">
          <p>parent stats go here</p>
        </div>
        )
        : (
          <div className="parent">
            <p>child stats go here</p>
          </div>
        )
    );
  }

  render() {
    const { showOnboardForm } = this.state;
    return (
      <div className="Dashboard content">
        {
        showOnboardForm
          ? (<Onboarding guid={this.props.guid} hideForm={this.hideForm} updateUser={this.updateUser}/>)
          : this.buildDashboard()
        }
      </div>
    );
  }
}

export default Dashboard;
