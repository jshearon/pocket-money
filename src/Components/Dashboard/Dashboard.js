import React from 'react';
import users from '../../helpers/data/users';
import Auth from '../Auth/Auth';

import './Dashboard.scss';
import Onboarding from '../Onboarding/Onboarding';

class Dashboard extends React.Component {
  state = {
    showOnboardForm: false,
  }

  componentDidMount() {
    users.getUserByUid(this.props.guid.uid)
      .then((user) => {
        console.warn(user);
        if (!user.data) {
          this.setState({ showOnboardForm: true });
        }
      })
      .catch((err) => console.error(err));
  }

  hideForm = () => this.setState({ showOnboardForm: false });

  render() {
    const { showOnboardForm } = this.state;
    return (
      <div className="Dashboard">
        {
        showOnboardForm
          ? (<Onboarding guid={this.props.guid} hideForm={this.hideForm} />)
          : (<Auth authed={this.props.authed} />)
        }
      </div>
    );
  }
}

export default Dashboard;
