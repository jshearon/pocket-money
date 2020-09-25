import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ledger from '../../helpers/data/ledger';
import users from '../../helpers/data/users';

import AddLedgerForm from '../AddLedgerForm/AddLedgerForm';
import utils from '../../helpers/utils';

import './Ledger.scss';
import DisplayLedger from '../DisplayLedger/DisplayLedger';

class Ledger extends React.Component {
  state = {
    childData: {},
    childBalance: 0,
    childLedger: [],
    isLoaded: false,
    addLedgerForm: false,
    ledgerData: {},
  }

  updateChildBalance = (childId) => {
    ledger.getLedgerByChildId(childId)
      .then((ledgerData) => {
        const childBalance = utils.getBalance(ledgerData);
        this.setState({ childBalance });
      })
      .catch((err) => console.error(err));
  }

  getChildData() {
    const { childId } = this.props.match.params;
    const { balance } = this.props;
    this.updateChildBalance(childId);
    this.setState({ isLoaded: false });
    users.getUser(childId)
      .then((childData) => {
        ledger.getLedgerByChildId(childId)
          .then((ledgerData) => {
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
    const { getUserBalance, user } = this.props;
    ledger.getLedgerByChildId(childId)
      .then((ledgerData) => {
        user && user.isParent ? this.updateChildBalance(childId) : getUserBalance();
        this.setState({ childLedger: ledgerData, isLoaded: true });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
      });
  }

  editLedgerItem = (ledgerData) => {
    this.setState({ ledgerData });
    this.toggleAddLedgerForm();
  }

  deleteLedgerItem = (itemId) => {
    const { childId } = this.props.match.params;
    ledger.deleteLedger(itemId)
      .then(() => {
        this.updateLedger(childId);
      })
      .catch((err) => console.error(err));
  }

  clearLedger = () => {
    this.setState({ ledger: {} });
  }

  toggleAddLedgerForm = (e) => {
    if (e && e.target.id === 'newItem') {
      this.setState({ ledgerData: {} });
    }
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
      childBalance,
      isLoaded,
      addLedgerForm,
      childLedger,
      ledgerData,
    } = this.state;
    const { childId } = this.props.match.params;
    const { user, balance } = this.props;
    const printLedger = childLedger.map((ledgerItem) => <DisplayLedger
      key={ledgerItem.id}
      ledgerItem={ledgerItem}
      editLedgerItem={this.editLedgerItem}
      deleteLedgerItem={this.deleteLedgerItem}
      user={user} />);
    if (!isLoaded || !user) {
      return <div className="loader fa-3x"><i className="fas fa-cog fa-spin"></i></div>;
    }
    return (
      <div className="Child content d-flex flex-column justify-content-start">
        <CSSTransition key={'addFamilyForm'} in={addLedgerForm} timeout={500} classNames="addFamilyForm" unmountOnExit appear exit>
          <AddLedgerForm
            childId={childId}
            childName={childData.name}
            parentName={this.props.user.id}
            toggleAddLedgerForm={this.toggleAddLedgerForm}
            updateLedger={this.updateLedger}
            ledgerData={ledgerData}
            clearLedger={this.clearLedger}
          />
        </CSSTransition>
        <div className="child-info d-flex flex-row justify-content-around align-items-center py-3 px-2 w-100">
          {
            user && user.isParent && <img src={childData.photoURL} alt="child" className="ChildThumbnail child-parent-view-image"/>
          }
          <div>
            {
              user && user.isParent && <h2>{utils.firstName(childData.name)}</h2>
            }
            {
              user && user.isParent
                ? <span className="badge">Balance: ${childBalance}</span>
                : <div className="badge">Balance: ${balance}</div>
            }
          </div>
        </div>
        {
          user.isParent && <button className="btn btn-primary m-3" onClick={this.toggleAddLedgerForm} id="newItem"><i className="fas fa-plus-circle"></i> New Entry</button>
        }
              <div className="child-ledger">
          {printLedger}
        </div>
      </div>
    );
  }
}

export default Ledger;
