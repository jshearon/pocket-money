import React from 'react';
import Auth from '../Auth/Auth';
import users from '../../helpers/data/users';

import './Dashboard.scss';
import Onboarding from '../Onboarding/Onboarding';

class Dashboard extends React.Component {
  state = {
    showOnboardForm: false,
  }

  componentDidMount() {
    users.getUserByGuid(this.props.guid.uid)
      .then((user) => {
        if (user) { this.setState({ showOnboardForm: true }); }
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { showOnboardForm } = this.state;
    return (
      <div className="Dashboard">
        {
        showOnboardForm
          ? (<Onboarding guid={this.props.guid} />)
          : (<Auth authed={this.props.authed} />)
        }
      </div>
    );
  }
}

export default Dashboard;
