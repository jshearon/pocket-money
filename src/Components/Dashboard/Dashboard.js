import React from 'react';
import users from '../../helpers/data/users';

import './Dashboard.scss';
import Onboarding from '../Onboarding/Onboarding';
import utils from '../../helpers/utils';

class Dashboard extends React.Component {
  state = {
    showOnboardForm: false,
    user: {},
  }

  componentDidMount() {
    users.getUserByUid(this.props.guid.uid)
      .then((user) => {
        user.uid
          ? this.setState({ user })
          : this.setState({ showOnboardForm: true });
      })
      .catch((err) => console.error(err));
  }

  hideForm = () => this.setState({ showOnboardForm: false });

  buildDashboard = () => {
    const { guid } = this.props;
    const { user } = this.state;
    return (
      user.isParent
        ? (
        <div className="parent">
          <p>parent stats go here</p>
        </div>
        )
        : (
          <div className="child">
            <span className="name">{utils.firstName(guid.displayName)}</span>
            <img className="thumbnail" src={guid.photoURL} alt="user thumbnail" />
            <p className="content">child stats go here</p>
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
          ? (<Onboarding guid={this.props.guid} hideForm={this.hideForm} />)
          : this.buildDashboard()
        }
      </div>
    );
  }
}

export default Dashboard;
