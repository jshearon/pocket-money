import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ledger from '../../helpers/data/ledger';
import users from '../../helpers/data/users';

import AddLedgerForm from '../AddLedgerForm/AddLedgerForm';
import utils from '../../helpers/utils';

import './child.scss';
import DisplayLedger from '../DisplayLedger/DisplayLedger';

class Child extends React.Component {
  state = {
    childData: {},
    balance: {},
    childLedger: [],
    isLoaded: false,
    addLedgerForm: false,
  }

  getChildData() {
    const { childId } = this.props.match.params;
    this.setState({ isLoaded: false });
    users.getUser(childId)
      .then((childData) => {
        ledger.getLedgerByChildId(childId)
          .then((ledgerData) => {
            const balance = utils.getBalance(ledgerData);
            this.setState({
              childLedger: ledgerData,
              childData: childData.data,
              isLoaded: true,
              balance,
            });
          });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ isLoading: false });
      });
  }

  updateLedger = (childId) => {
    ledger.getLedgerByChildId(childId)
      .then((ledgerData) => {
        const balance = utils.getBalance(ledgerData);
        this.setState({ childLedger: ledgerData, isLoaded: true, balance });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
      });
  }

  toggleAddLedgerForm = () => {
    this.setState((prevState) => ({
      addLedgerForm: !prevState.addLedgerForm,
    }));
  }

  componentDidMount() {
    this.getChildData();
  }

  render() {
    const {
      childData,
      isLoaded,
      addLedgerForm,
      balance,
      childLedger,
    } = this.state;
    const { childId } = this.props.match.params;
    const printLedger = childLedger.map((ledgerItem) => <DisplayLedger ledgerItem={ledgerItem} />);
    if (!isLoaded) {
      return <div className="loader fa-3x"><i className="fas fa-cog fa-spin"></i></div>;
    }
    return (
      <div className="Child content d-flex flex-column justify-content-start">
        <CSSTransition in={addLedgerForm} timeout={250} classNames="addFamilyForm" unmountOnExit appear exit>
          <AddLedgerForm
            childId={childId}
            childName={childData.name}
            parentName={this.props.user.id}
            toggleAddLedgerForm={this.toggleAddLedgerForm}
            updateLedger={this.updateLedger}
          />
        </CSSTransition>
        <div className="child-info d-flex flex-row justify-content-start align-items-center p-3 w-100">
          <img src={childData.photoURL} alt="child" className="FamilyThumbnail child-parent-view-image"/>
          <h4>{utils.firstName(childData.name)} has saved {balance}</h4>
        </div>
        <button className="btn btn-primary w-50 m-auto" onClick={this.toggleAddLedgerForm}><i className="fas fa-plus-square"></i> Add Money</button>
        <div className="child-ledger">
          {printLedger}
        </div>
      </div>
    );
  }
}

export default Child;
