import React from 'react';
import { CSSTransition } from 'react-transition-group';
import wishListDataCrud from '../../helpers/data/wishListData';
import AddWishListForm from '../AddWishListForm/AddWishListForm';
import SingleWishList from '../SingleWishList/SingleWishList';
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
        this.setState({ wishList });
      })
      .catch((err) => console.error(err));
  }

  approveWishList = (wishListId) => {
    const updatedPart = {
      requestApproval: 'pending',
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
        approveWishList={this.approveWishList}
        user={user}
        balance={balance}
      />);
    return (
      <React.Fragment>
      <div className="WishList content d-flex flex-column justify-content-start">
        <button className="btn btn-primary m-3" onClick={this.toggleAddWishListForm} id="newItem"><i className="fas fa-plus-circle"></i> Add New List Item</button>
        <div className="wishlists">
          {printWishLists}
        </div>
        </div>
        <CSSTransition key={'addWishListForm'} in={addWishListForm} timeout={500} classNames="addWishListForm" unmountOnExit appear exit>
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
