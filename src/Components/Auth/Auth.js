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
    if (this.props.openMenu) {
      this.props.openMenu();
    }
  }

  render() {
    const { authed } = this.props;
    const loginButton = authed
      ? <button className="btn btn-warning login-button" onClick={this.processLogout}>Logout</button>
      : <button className="btn btn-primary login-button" onClick={this.processLogin}><i className="fab fa-google"></i> Login <i className="fas fa-arrow-right ml-5"></i></button>;
    return (
      <div className="d-flex justify-content-center flex-column align-items-center">
        <div className="Auth d-flex w-100 flex-row justify-content-end">
          {loginButton}
        </div>
      </div>
    );
  }
}

export default Auth;
