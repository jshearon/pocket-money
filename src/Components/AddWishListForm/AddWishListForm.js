import React from 'react';
import ReactCrop from 'react-image-crop';
import firebase from 'firebase';
import 'react-image-crop/lib/ReactCrop.scss';

import wishListDataCrud from '../../helpers/data/wishListData';

import './AddWishListForm.scss';

class AddWishListForm extends React.Component {
  state = {
    src: null,
    crop: {
      unit: '%',
      width: 30,
      aspect: 1 / 1,
    },
    costAmount: 0,
    description: null,
    wishListData: {},
  }

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => this.setState({ src: reader.result }));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  updateState = (e) => {
    this.setState({
      [e.target.id]: e.target.id === 'costAmount'
        ? parseFloat(e.target.value)
        : e.target.value,
    });
  }

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg',
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        // eslint-disable-next-line no-param-reassign
        blob.name = fileName;
        console.error(blob);
        resolve(blob);
      }, 'image/jpeg');
    });
  }

  sendToFB = (e) => {
    const { croppedImageUrl } = this.state;
    console.error(croppedImageUrl);
    const storageRef = firebase.storage().ref();
    const newFileName = Date.now();
    const uploadTask = storageRef.child(`images/${newFileName}`)
      .put(croppedImageUrl);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.warn(`Upload is ${progress}% done`);
      // eslint-disable-next-line default-case
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.warn('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.warn('Upload is running');
          break;
      }
    }, (error) => {
      // eslint-disable-next-line default-case
      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        this.addNewWishList(downloadURL);
      });
    });
  }

  addNewWishList = (photoUrl) => {
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
      photoUrl,
      costAmount,
      isApproved: 0,
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
      crop,
      croppedImageUrl,
      src,
    } = this.state;
    return (
      <div className="addWishlist d-flex flex-column justify-content-around">
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
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="description">Image</label>
            <input type="file" className="form-control" id="image" accept="image/*" onChange={this.onSelectFile} />
          </div>
        </div>
        <div className="imgPreviewBox">
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {croppedImageUrl && (
          <img className="previewImage" alt="Crop" src={URL.createObjectURL(croppedImageUrl)} />
        )}
        </div>
        </div>
            {
              wishListData.id && wishListData.isApproved !== 0
                ? <button className="btn btn-primary m-1" onClick={this.editEntry}>Edit List Item</button>
                : <button className="btn btn-primary m-1" onClick={this.sendToFB}>Add List Item</button>
            }
        <button className="btn btn-primary m-1" onClick={this.props.toggleAddWishListForm}>Cancel</button>
      </div>
    );
  }
}

export default AddWishListForm;
