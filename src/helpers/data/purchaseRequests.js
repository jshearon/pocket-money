import axios from 'axios';

// import utils from '../utils';

import apiKeys from '../apiKey.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getRequestsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/requests.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const allRequests = response.data;
      const myRequests = [];

      if (allRequests) {
        Object.keys(allRequests).forEach((requestId) => {
          const request = allRequests[requestId];
          request.id = requestId;
          myRequests.push(request);
        });
      }

      resolve(myRequests);
    })
    .catch((err) => reject(err));
});

const getAllRequests = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/requests.json`)
    .then((response) => {
      const allRequests = response.data;
      const myRequests = [];

      if (allRequests) {
        Object.keys(allRequests).forEach((requestId) => {
          const singleRequests = allRequests[requestId];
          singleRequests.id = requestId;
          myRequests.push(singleRequests);
        });
      }

      resolve(myRequests);
    })
    .catch((err) => reject(err));
});

const getSingleRequest = (requestId) => axios.get(`${baseUrl}/requests/${requestId}.json`);

const createRequest = (newRequest) => axios.post(`${baseUrl}/requests.json`, newRequest);

const updateRequest = (requestId, editedRequest) => axios.patch(`${baseUrl}/requests/${requestId}.json`, editedRequest);

const deleteRequest = (requestId) => axios.delete(`${baseUrl}/requests/${requestId}.json`);

export default {
  getRequestsByUid,
  getAllRequests,
  createRequest,
  updateRequest,
  deleteRequest,
  getSingleRequest,
};
