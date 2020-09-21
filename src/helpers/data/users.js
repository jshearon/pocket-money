import axios from 'axios';

// import utils from '../utils';

import apiKeys from '../apiKey.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json`)
    .then((response) => {
      const allUsers = response.data;
      const myUsers = [];

      if (allUsers) {
        Object.keys(allUsers).forEach((userId) => {
          const singleUser = allUsers[userId];
          singleUser.id = userId;
          myUsers.push(singleUser);
        });
      }

      resolve(myUsers);
    })
    .catch((err) => reject(err));
});

const getFamilyMembers = (familyId, thisUserId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="familyId"&equalTo="${familyId}"`)
    .then((response) => {
      const allUsers = response.data;
      const myUsers = [];

      if (allUsers) {
        Object.keys(allUsers).forEach((userId) => {
          const singleUser = allUsers[userId];
          singleUser.id = userId;
          if (singleUser.id !== thisUserId) {
            myUsers.push(singleUser);
          }
        });
      }

      resolve(myUsers);
    })
    .catch((err) => reject(err));
});

const getUserByEmail = (email) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="email"&equalTo="${email}"`)
    .then((response) => {
      const allUsers = response.data;
      const myUser = [];
      if (allUsers) {
        Object.keys(allUsers).forEach((userId) => {
          const singleUser = allUsers[userId];
          singleUser.id = userId;
          myUser.push(singleUser);
        });
      }
      resolve(myUser[0]);
    })
    .catch((err) => reject(err));
});

const getFamily = (famId) => axios.get(`${baseUrl}/families/${famId}.json`);

const getUserWithFamily = (email) => new Promise((resolve, reject) => {
  getUserByEmail(email)
    .then((user) => {
      getFamily(user.familyId)
        .then((family) => {
          const combinedUser = user;
          combinedUser.familyName = family.data.familyName;
          resolve(combinedUser);
        });
    })
    .catch((err) => console.error(err));
});

const getUserThumbnail = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users/${uid}.json`)
    .then((returnedUser) => {
      const userThumbnail = {
        name: utils.firstName(returnedUser.data.name),
        photoURL: returnedUser.data.photoURL,
      };
      resolve(userThumbnail);
    })
    .catch((err) => console.error(err));
});

const getUser = (uid) => axios.get(`${baseUrl}/users/${uid}.json`);

const createUser = (newUser) => axios.post(`${baseUrl}/users.json`, newUser);

const createFamily = (newFamily) => axios.post(`${baseUrl}/families.json`, newFamily);

const updateUser = (uid, editedUser) => axios.patch(`${baseUrl}/users/${uid}.json`, editedUser);

const deleteUser = (uid) => axios.delete(`${baseUrl}/users/${uid}.json`);

export default {
  getAllUsers,
  getUser,
  getUserByEmail,
  getUserThumbnail,
  createUser,
  updateUser,
  deleteUser,
  createFamily,
  getFamily,
  getUserWithFamily,
  getFamilyMembers,
};
