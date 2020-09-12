import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

class Auth extends React.Component {
  processLogin = (e) => {
    e.preventDefault();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider);
  }

  processLogout = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    const loginButton = authed
      ? <button className="btn btn-warning" onClick={this.processLogout}>Logout</button>
      : <button className="btn btn-primary" onClick={this.processLogin}>Login</button>;
    return (
      <div className="Auth">
        {loginButton}
      </div>
    );
  }
}

export default Auth;
