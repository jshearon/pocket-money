import firebase from 'firebase';
import 'firebase/auth';

const getuid = () => firebase.auth().currentUser;

const firstName = (name) => name.split(' ')[0];

export default { getuid, firstName };
