import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Landing from '../Landing/Landing';
import Onboarding from '../Onboarding/Onboarding';
import Dashboard from '../Dashboard/Dashboard';
import Wishlist from '../Wishlist/Wishlist';
import Jobs from '../Jobs/Jobs';
import Purchases from '../Purchases/Purchases';
import Goals from '../Goals/Goals';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} authed={authed} />)
    : (<Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} authed={authed} {...rest} />)
    : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />));
  return <Route render={(props) => routeChecker(props)} {...rest} />;
};

class RoutesContainer extends React.Component {
  render() {
    const {
      authed,
      guid,
      navbarOff,
      navbarOn,
    } = this.props;
    if (authed === null) {
      return (
        <div className="fas fa-spinner fa-spin" id="spinner" />
      );
    }
    return (
      <Switch>
        <PrivateRoute path='/goals' component={Goals} authed={authed} guid={guid} />
        <PrivateRoute path='/purchases' component={Purchases} authed={authed} guid={guid} />
        <PrivateRoute path='/jobs' component={Jobs} authed={authed} guid={guid} />
        <PrivateRoute path='/wishlist' component={Wishlist} authed={authed} guid={guid} />
        <PrivateRoute path='/dashboard' component={Dashboard} authed={authed} guid={guid} navbarOff={navbarOff} navbarOn={navbarOn} />
        <PrivateRoute path='/onboarding' component={Onboarding} authed={authed} />
        <PublicRoute path='/' component={Landing} authed={authed} />
        <Redirect from="*" to="/dashboard"/>
      </Switch>
    );
  }
}

export default RoutesContainer;
