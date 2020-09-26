import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ledger from '../../helpers/data/ledger';
import wishListDataCrud from '../../helpers/data/wishListData';
import AddWishListForm from '../AddWishListForm/AddWishListForm';
import SingleWishList from '../SingleWishList/SingleWishList';
import userData from '../../helpers/data/users';
import './WishList.scss';

class WishList extends React.Component {
  state = {
    addWishListForm: false,
    wishList: [],
    wishListData: {},
  }

  clearWishListData = () => {
    this.setState({ wishListData: {} });
  }

  toggleAddWishListForm = (e) => {
    if (e && e.target.id === 'newWishList') {
      this.setState({ wishListData: {} });
    }
    this.setState((prevState) => ({
      addWishListForm: !prevState.addWishListForm,
    }));
  }

  updateWishList = () => {
    wishListDataCrud.getAllWishLists()
      .then((wishList) => {
        userData.getUser(this.props.match.params.uid)
          .then((user) => {
            if (user.data.isParent) {
              const parentList = wishList.filter((item) => item.isApproved !== 0);
              this.setState({ wishList: parentList });
            } else {
              const childList = wishList.filter((item) => item.uid === this.props.match.params.uid);
              this.setState({ wishList: childList });
            }
          });
      })
      .catch((err) => console.error(err));
  }

  approveWishList = (wishlistItem, status) => {
    const { user } = this.props;
    const updatedPart = {
      approvedBy: user.id,
      approvedDate: Date.now(),
      isApproved: status,
    };
    wishListDataCrud.updateWishList(wishlistItem.id, updatedPart)
      .then(() => {
        const newLedgerEntry = {
          childId: wishlistItem.uid,
          amount: wishlistItem.costAmount,
          description: wishlistItem.description,
          isDebit: true,
          entryDate: new Date(),
          depositedBy: this.props.user.id,
        };
        ledger.createLedger(newLedgerEntry);
        this.updateWishList();
      })
      .catch((err) => console.error(err));
  }

  requestApproveWishList = (wishListId) => {
    const updatedPart = {
      isApproved: 'pending',
    };
    wishListDataCrud.updateWishList(wishListId, updatedPart)
      .then(() => {
        this.updateWishList();
      })
      .catch((err) => console.error(err));
  }

  deleteWishList = (wishListId) => {
    wishListDataCrud.deleteWishList(wishListId)
      .then(() => {
        this.updateWishList();
      })
      .catch((err) => console.error(err));
  }

  editWishList = (editedWishList) => {
    this.setState({ wishListData: editedWishList });
    this.toggleAddWishListForm();
  }

  componentDidMount() {
    this.updateWishList();
  }

  render() {
    const { user, balance } = this.props;
    const {
      addWishListForm,
      wishList,
      wishListData,
    } = this.state;
    const printWishLists = wishList.map((singleWishList) => <SingleWishList
        key={singleWishList.id}
        singleWishList={singleWishList}
        editWishList={this.editWishList}
        deleteWishList={this.deleteWishList}
        requestApproveWishList={this.requestApproveWishList}
        approveWishList={this.approveWishList}
        user={user}
        balance={balance}
        />);
    return (
      <React.Fragment>
      <div className="WishList content d-flex flex-column justify-content-start">
        {
          user && !user.isParent
            && <button className="btn btn-primary m-3" onClick={this.toggleAddWishListForm} id="newItem"><i className="fas fa-plus-circle"></i> Add New List Item</button>
        }
        <div className="wishlists">
          {printWishLists}
        </div>
        </div>
        <CSSTransition key={'addWishListForm'} in={addWishListForm} timeout={500} classNames="addFamilyForm" unmountOnExit appear exit>
          <AddWishListForm
            toggleAddWishListForm={this.toggleAddWishListForm}
            updateWishList={this.updateWishList}
            wishListData={wishListData}
            clearWishListData={this.clearWishListData}
            user={user}
          />
        </CSSTransition>
      </React.Fragment>
    );
  }
}

export default WishList;
