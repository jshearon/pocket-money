import React from 'react';
import { CSSTransition } from 'react-transition-group';
import {
  BrowserRouter,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import fbConnection from '../helpers/data/connection';
import RoutesContainer from '../Components/RoutesContainer/RoutesContainer';
import Navbar from '../Components/Navbar/Navbar';
import utils from '../helpers/utils';

import './App.scss';
import Auth from '../Components/Auth/Auth';

import '../Components/UserMenu/UserMenu';

fbConnection();

class App extends React.Component {
  state = {
    authed: null,
    guid: {},
    userMenu: false,
    navbarShow: false,
  }

  componentDidMount() {
    this.listener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true, guid: user, navbarShow: true });
      } else {
        this.setState({ authed: false, guid: {}, navbarShow: false });
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  openMenu = () => {
    this.setState((prevState) => ({
      userMenu: !prevState.userMenu,
    }));
  }

  navbarOff = () => {
    this.setState({ navbarShow: false });
  }

  navbarOn = () => {
    this.setState({ navbarShow: true });
  }

  render() {
    const {
      authed,
      guid,
      userMenu,
      navbarShow,
    } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <div className="container">
            <span className="firstName">{guid.displayName ? utils.firstName(guid.displayName) : ''}</span>
            <img className="thumbnail" src={guid.photoURL} alt="user thumbnail" onClick={this.openMenu} />
            <CSSTransition in={userMenu} timeout={250} classNames="userSettings" unmountOnExit appear exit>
                <div className="d-flex justify-content-center flex-column align-items-center">
                  <Auth authed={authed} openMenu={this.openMenu} />
                </div>
            </CSSTransition>
              <RoutesContainer authed={authed} guid={guid} navbarOff={this.navbarOff} navbarOn={this.navbarOn} />
            {
              navbarShow
                ? <Navbar />
                : ''
            }
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
