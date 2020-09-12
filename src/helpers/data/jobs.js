import axios from 'axios';

// import utils from '../utils';

import apiKeys from '../apiKey.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getJobsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/jobs.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const allJobs = response.data;
      const myJobs = [];

      if (allJobs) {
        Object.keys(allJobs).forEach((JobsId) => {
          const Jobs = allJobs[JobsId];
          Jobs.id = JobsId;
          myJobs.push(Jobs);
        });
      }

      resolve(myJobs);
    })
    .catch((err) => reject(err));
});

const getAllJobs = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/jobs.json`)
    .then((response) => {
      const allJobs = response.data;
      const myJobs = [];

      if (allJobs) {
        Object.keys(allJobs).forEach((JobId) => {
          const singleJob = allJobs[JobId];
          singleJob.id = JobId;
          myJobs.push(singleJob);
        });
      }

      resolve(myJobs);
    })
    .catch((err) => reject(err));
});

const getJob = (uid) => axios.get(`${baseUrl}/Jobs/${uid}.json`);

const createJob = (newJob) => axios.post(`${baseUrl}/Jobs.json`, newJob);

const updateJob = (uid, editedJob) => axios.patch(`${baseUrl}/Jobs/${uid}.json`, editedJob);

const deleteJob = (uid) => axios.delete(`${baseUrl}/Jobs/${uid}.json`);

export default {
  getAllJobs,
  getJobsByUid,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
