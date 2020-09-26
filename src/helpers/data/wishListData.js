import axios from 'axios';

// import utils from '../utils';

import apiKeys from '../apiKey.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getWishListByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/wishlists.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const allWishLists = response.data;
      const myWishList = [];

      if (allWishLists) {
        Object.keys(allWishLists).forEach((wishlistId) => {
          const wishlists = allWishLists[wishlistId];
          wishlists.id = wishlistId;
          myWishList.push(wishlists);
        });
      }

      resolve(myWishList);
    })
    .catch((err) => reject(err));
});

const getAllWishLists = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/wishlists.json`)
    .then((response) => {
      const allWishLists = response.data;
      const myWishList = [];

      if (allWishLists) {
        Object.keys(allWishLists).forEach((wishlistId) => {
          const singleWishList = allWishLists[wishlistId];
          singleWishList.id = wishlistId;
          myWishList.push(singleWishList);
        });
      }

      resolve(myWishList);
    })
    .catch((err) => reject(err));
});

const getWishList = (uid) => axios.get(`${baseUrl}/wishlists/${uid}.json`);

const createWishList = (newWishList) => axios.post(`${baseUrl}/wishlists.json`, newWishList);

const updateWishList = (WishListId, editedWishList) => axios.patch(`${baseUrl}/wishlists/${WishListId}.json`, editedWishList);

const deleteWishList = (uid) => axios.delete(`${baseUrl}/wishlists/${uid}.json`);

export default {
  getAllWishLists,
  getWishListByUid,
  getWishList,
  createWishList,
  updateWishList,
  deleteWishList,
};
