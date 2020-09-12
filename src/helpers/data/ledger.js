import axios from 'axios';

// import utils from '../utils';

import apiKeys from '../apiKey.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getLedgerByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ledger.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const allLedger = response.data;
      const myLedger = [];

      if (allLedger) {
        Object.keys(allLedger).forEach((ledgerId) => {
          const ledger = allLedger[ledgerId];
          ledger.id = ledgerId;
          myLedger.push(ledger);
        });
      }

      resolve(myLedger);
    })
    .catch((err) => reject(err));
});

const getAllLedger = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ledger.json`)
    .then((response) => {
      const allLedger = response.data;
      const myLedger = [];

      if (allLedger) {
        Object.keys(allLedger).forEach((ledgerId) => {
          const singleLedger = allLedger[ledgerId];
          singleLedger.id = ledgerId;
          myLedger.push(singleLedger);
        });
      }

      resolve(myLedger);
    })
    .catch((err) => reject(err));
});

const getSingleLedger = (ledgerId) => axios.get(`${baseUrl}/ledger/${ledgerId}.json`);

const createLedger = (newLedger) => axios.post(`${baseUrl}/ledger.json`, newLedger);

const updateLedger = (ledgerId, editedLedger) => axios.patch(`${baseUrl}/ledger/${ledgerId}.json`, editedLedger);

const deleteLedger = (ledgerId) => axios.delete(`${baseUrl}/ledger/${ledgerId}.json`);

export default {
  getLedgerByUid,
  getAllLedger,
  createLedger,
  updateLedger,
  deleteLedger,
  getSingleLedger,
};
