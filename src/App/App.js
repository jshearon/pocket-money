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
import users from '../helpers/data/users';

import './App.scss';
import Auth from '../Components/Auth/Auth';

import '../Components/UserMenu/UserMenu';
import ledger from '../helpers/data/ledger';

fbConnection();

class App extends React.Component {
  state = {
    authed: null,
    guid: {},
    userMenu: false,
    navbarShow: false,
    user: null,
    balance: 0,
  }

  componentDidMount() {
    this.listener = firebase.auth().onAuthStateChanged((guid) => {
      if (guid) {
        this.setState({ authed: true, guid, navbarShow: true });
        this.getUser(guid.email);
      } else {
        this.setState({ authed: false, guid: {}, navbarShow: false });
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  getUserBalance = () => {
    const { user } = this.state;
    ledger.getLedgerByChildId(user.id)
      .then((ledgerData) => {
        const balance = utils.getBalance(ledgerData);
        this.setState({ balance });
      })
      .catch((err) => console.error(err));
  }

  getUser = (email) => {
    users.getUserByEmail(email)
      .then((user) => {
        if (user) {
          this.setState({ user }, this.getUserBalance);
        } else {
          this.setState({ user: {} });
        }
      })
      .catch((err) => console.error(err));
  }

  openMenu = () => {
    this.setState((prevState) => ({
      userMenu: !prevState.userMenu,
    }));
  }

  navbarOff = () => {
    if (this.state.navbarShow !== false) {
      this.setState({ navbarShow: false });
    }
  }

  navbarOn = () => {
    if (this.state.navbarShow !== true) {
      this.setState({ navbarShow: true });
    }
  }

  render() {
    const {
      authed,
      guid,
      userMenu,
      navbarShow,
      user,
      balance,
    } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <div className="container">
            <div className="firstName">{guid.displayName ? utils.firstName(guid.displayName) : ''}</div>
            <img className="thumbnail" src={guid.photoURL} alt="user thumbnail" onClick={this.openMenu} />
            <CSSTransition in={userMenu} timeout={250} classNames="userSettings" unmountOnExit appear exit>
                  <Auth authed={authed} openMenu={this.openMenu} />
            </CSSTransition>
              <RoutesContainer
                authed={authed}
                guid={guid}
                navbarOff={this.navbarOff}
                navbarOn={this.navbarOn}
                getUser={this.getUser}
                user={user}
                balance={balance}
                getUserBalance={this.getUserBalance}
              />
            {
              navbarShow
                ? <Navbar user={user} />
                : ''
            }
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
