import firebase from 'firebase';
import 'firebase/auth';

const getuid = () => firebase.auth().currentUser;

const firstName = (name) => name.split(' ')[0];

const getBalance = (items) => {
  let balance = 0;
  items.forEach((item) => {
    item.isDebit
      ? balance -= item.amount
      : balance += item.amount;
  });
  return balance.toFixed(2);
};

export default { getuid, firstName, getBalance };
