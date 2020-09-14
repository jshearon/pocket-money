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
      <Switch>
        <PrivateRoute path='/dashboard' component={Dashboard} authed={authed} guid={guid} />
        <PrivateRoute path='/onboarding' component={Onboarding} authed={authed} />
        <PublicRoute path='/' component={Landing} authed={authed} />
        <Redirect from="*" to="/dashboard"/>
      </Switch>
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
