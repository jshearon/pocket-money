import firebase from 'firebase';
import 'firebase/auth';

const getuid = () => firebase.auth().currentUser;

export default { getuid };
