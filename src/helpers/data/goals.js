import axios from 'axios';

// import utils from '../utils';

import apiKeys from '../apiKey.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getGoalsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/goals.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const allGoals = response.data;
      const myGoals = [];

      if (allGoals) {
        Object.keys(allGoals).forEach((goalsId) => {
          const goals = allGoals[goalsId];
          goals.id = goalsId;
          myGoals.push(goals);
        });
      }

      resolve(myGoals);
    })
    .catch((err) => reject(err));
});

const getAllGoals = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/goals.json`)
    .then((response) => {
      const allGoals = response.data;
      const myGoals = [];

      if (allGoals) {
        Object.keys(allGoals).forEach((goalsId) => {
          const singleGoals = allGoals[goalsId];
          singleGoals.id = goalsId;
          myGoals.push(singleGoals);
        });
      }

      resolve(myGoals);
    })
    .catch((err) => reject(err));
});

const getSingleGoals = (goalsId) => axios.get(`${baseUrl}/goals/${goalsId}.json`);

const creategoals = (newGoal) => axios.post(`${baseUrl}/goals.json`, newGoal);

const updateGoals = (goalsId, editedGoals) => axios.patch(`${baseUrl}/goals/${goalsId}.json`, editedGoals);

const deleteGoals = (goalId) => axios.delete(`${baseUrl}/goals/${goalId}.json`);

export default {
  getGoalsByUid,
  getAllGoals,
  creategoals,
  updateGoals,
  deleteGoals,
  getSingleGoals,
};
