import axios from 'axios';

// import utils from '../utils';

import apiKeys from '../apiKey.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getRequestsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/request.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const allRequest = response.data;
      const myRequest = [];

      if (allRequest) {
        Object.keys(allRequest).forEach((RequestId) => {
          const Request = allRequest[RequestId];
          Request.id = RequestId;
          myRequest.push(Request);
        });
      }

      resolve(myRequest);
    })
    .catch((err) => reject(err));
});

const getAllRequests = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/request.json`)
    .then((response) => {
      const allRequest = response.data;
      const myRequest = [];

      if (allRequest) {
        Object.keys(allRequest).forEach((RequestId) => {
          const singleRequest = allRequest[RequestId];
          singleRequest.id = RequestId;
          myRequest.push(singleRequest);
        });
      }

      resolve(myRequest);
    })
    .catch((err) => reject(err));
});

const getSingleRequest = (RequestId) => axios.get(`${baseUrl}/Request/${RequestId}.json`);

const createRequest = (newRequest) => axios.post(`${baseUrl}/Request.json`, newRequest);

const updateRequest = (RequestId, editedRequest) => axios.patch(`${baseUrl}/Request/${RequestId}.json`, editedRequest);

const deleteRequest = (itemId) => axios.delete(`${baseUrl}/items/${itemId}.json`);

export default {
  getRequestsByUid,
  getAllRequests,
  createRequest,
  updateRequest,
  deleteRequest,
  getSingleRequest,
};
