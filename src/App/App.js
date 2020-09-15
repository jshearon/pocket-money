import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import fbConnection from '../helpers/data/connection';

import './App.scss';
import Landing from '../Components/Landing/Landing';
import Onboarding from '../Components/Onboarding/Onboarding';
import Dashboard from '../Components/Dashboard/Dashboard';
import Wishlist from '../Components/Wishlist/Wishlist';
import Jobs from '../Components/Jobs/Jobs';
import Purchases from '../Components/Purchases/Purchases';
import Goals from '../Components/Goals/Goals';
import Navbar from '../Components/Navbar/Navbar';
import utils from '../helpers/utils';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} authed={authed} />)
    : (<Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({
  component: Component,
  authed,
  guid,
  ...rest
}) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} authed={authed} guid={guid} />)
    : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />));
  return <Route render={(props) => routeChecker(props)} {...rest} />;
};

const RoutesContainer = ({ authed, guid }) => {
  if (authed === null) {
    return (
      <div className="fas fa-spinner fa-spin" id="spinner" />
    );
  }
  return (
    <div className="container">
      <span className="name">{utils.firstName(guid.displayName)}</span>
      <img className="thumbnail" src={guid.photoURL} alt="user thumbnail" />
      <Switch>
        <PrivateRoute path='/goals' component={Goals} authed={authed} guid={guid} />
        <PrivateRoute path='/purchases' component={Purchases} authed={authed} guid={guid} />
        <PrivateRoute path='/jobs' component={Jobs} authed={authed} guid={guid} />
        <PrivateRoute path='/wishlist' component={Wishlist} authed={authed} guid={guid} />
        <PrivateRoute path='/dashboard' component={Dashboard} authed={authed} guid={guid} />
        <PrivateRoute path='/onboarding' component={Onboarding} authed={authed} />
        <PublicRoute path='/' component={Landing} authed={authed} />
        <Redirect from="*" to="/dashboard"/>
      </Switch>
      <Navbar />
    </div>
  );
};

class App extends React.Component {
  state = {
    authed: null,
    guid: {},
  }

  componentDidMount() {
    this.listener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true, guid: user });
      } else {
        this.setState({ authed: false, guid: {} });
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { authed, guid } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <RoutesContainer authed={authed} guid={guid} />
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
