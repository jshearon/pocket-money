import React from 'react';
import { CSSTransition } from 'react-transition-group';
import wishListDataCrud from '../../helpers/data/wishListData';
import AddWishListForm from '../AddWishListForm/AddWishListForm';
import SingleWishList from '../SingleWishList/SingleWishList';

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

  deleteWishList = (wishListId) => {
    wishListDataCrud.deleteWishList(wishListId)
      .then(() => {
        this.updateWishList();
      })
      .catch((err) => console.error(err));
  }

  editWishList = (editedWishList) => {
    this.setState({ wishListData: editedWishList });
    this.toggleAddJobForm();
  }

  componentDidMount() {
    this.updateWishList();
  }

  render() {
    const { user } = this.props;
    const {
      addWishListForm,
      wishList,
      wishListData,
    } = this.state;
    const printWishLists = wishList.map((singleWishList) => <SingleWishList
        key={singleWishList.id}
        singleWishList={singleWishList}
        editWishList={this.editJob}
        deleteWishList={this.deleteJob}
        user={user}
      />);
    return (
      <div className="WishList content d-flex flex-column justify-content-start">
        <CSSTransition key={'addWishListForm'} in={addWishListForm} timeout={500} classNames="addFamilyForm" unmountOnExit appear exit>
          <AddWishListForm
            toggleAddWishListForm={this.toggleAddWishListForm}
            updateJobs={this.updateJobs}
            wishListData={wishListData}
            clearWishListData={this.clearWishListData}
            user={user}
          />
        </CSSTransition>
        <div className="wishlists">
          {printWishLists}
        </div>
      </div>
    );
  }
}

export default WishList;
