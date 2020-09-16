import axios from 'axios';

// import utils from '../utils';

import apiKeys from '../apiKey.json';

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

const getUserByEmail = (email) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="email"&equalTo="${email}"`)
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

      resolve(myUsers[0]);
    })
    .catch((err) => reject(err));
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
  createUser,
  updateUser,
  deleteUser,
  createFamily,
};
