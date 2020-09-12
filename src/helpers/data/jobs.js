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
        Object.keys(allJobs).forEach((jobsId) => {
          const jobs = allJobs[jobsId];
          jobs.id = jobsId;
          myJobs.push(jobs);
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
        Object.keys(allJobs).forEach((jobId) => {
          const singleJob = allJobs[jobId];
          singleJob.id = jobId;
          myJobs.push(singleJob);
        });
      }

      resolve(myJobs);
    })
    .catch((err) => reject(err));
});

const getJob = (uid) => axios.get(`${baseUrl}/jobs/${uid}.json`);

const createJob = (newJob) => axios.post(`${baseUrl}/jobs.json`, newJob);

const updateJob = (uid, editedJob) => axios.patch(`${baseUrl}/jobs/${uid}.json`, editedJob);

const deleteJob = (uid) => axios.delete(`${baseUrl}/jobs/${uid}.json`);

export default {
  getAllJobs,
  getJobsByUid,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
