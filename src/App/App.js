import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import fbConnection from '../helpers/data/connection';

import './App.scss';
import Auth from '../Components/Auth/Auth';

fbConnection();

class App extends React.Component {
  state = {
    authed: null,
  }

  componentDidMount() {
    this.listener = firebase.auth().onAuthStateChanged((user) => {
      user
        ? this.setState({ authed: true })
        : this.setState({ authed: false });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <Auth authed={authed} />
      </div>
    );
  }
}

export default App;
