import React from 'react';

import wishListDataCrud from '../../helpers/data/wishListData';

import './AddWishListForm.scss';

class AddWishListForm extends React.Component {
  state = {
    costAmount: 0,
    description: null,
    wishListData: {},
  }

  updateState = (e) => {
    this.setState({
      [e.target.id]: e.target.id === 'costAmount'
        ? parseFloat(e.target.value)
        : e.target.value,
    });
  }

  addNewWishList = (e) => {
    const {
      user,
      updateWishList,
      toggleAddWishListForm,
    } = this.props;

    const {
      costAmount,
      description,
    } = this.state;

    const newWishListEntry = {
      uid: user.id,
      entryDate: new Date(),
      description,
      costAmount,
      isApproved: false,
      approvedDate: 0,
      approvedBy: 0,
    };
    wishListDataCrud.createWishList(newWishListEntry)
      .then((newWishList) => {
        this.setState({ costAmount: 0, description: null, entryDate: new Date() });
        updateWishList();
        toggleAddWishListForm();
      })
      .catch((err) => console.error(err));
  }

  editEntry = (e) => {
    const {
      updateWishList,
      toggleAddWishListForm,
      clearWishListData,
    } = this.props;
    const {
      wishListData,
      costAmount,
      description,
    } = this.state;
    const updatedWishListEntry = {
      uid: wishListData.uid,
      entryDate: wishListData.entryDate,
      description,
      costAmount,
      isApproved: wishListData.isApproved,
      approvedDate: wishListData.approvedDate,
      approvedBy: wishListData.approvedBy,
    };
    wishListDataCrud.updateWishList(wishListData.id, updatedWishListEntry)
      .then(() => {
        clearWishListData();
        this.setState({ costAmount: 0, description: null, entryDate: new Date() });
        updateWishList();
        toggleAddWishListForm();
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    const { wishListData } = this.props;
    wishListData.id && this.setState({
      wishListData,
      costAmount: wishListData.costAmount,
      description: wishListData.description,
      entryDate: wishListData.entryDate,
    });
  }

  render() {
    const {
      costAmount,
      description,
      wishListData,
    } = this.state;
    return (
      <div className="AddFamilyForm d-flex flex-column justify-content-around">
        <h2>Add New WishList Item</h2>
        <div>
        <div className="form-row align-items-center">
          <div className="form-group col">
            <label htmlFor="payAmount">Price</label>
            <input type="number" className="form-control w-50" id="costAmount" placeholder="0.00" onChange={this.updateState} value={costAmount && costAmount.toFixed(2)}/>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" placeholder="New Bike" onChange={this.updateState} value={description || ''} />
          </div>
        </div>
        </div>
            {
              wishListData.id && wishListData.isApproved !== 0
                ? <button className="btn btn-primary m-1" onClick={this.editEntry}>Edit Job</button>
                : <button className="btn btn-primary m-1" onClick={this.addNewWishList}>Add Job</button>
            }
        <button className="btn btn-primary m-1" onClick={this.props.toggleAddWishListForm}>Cancel</button>
      </div>
    );
  }
}

export default AddWishListForm;
