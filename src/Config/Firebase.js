import firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCISm-bKQIq1RwAaUpQWkQMawrzZ2cfwTY',
  authDomain: 'chatwae-255111.firebaseapp.com',
  databaseURL: 'https://chatwae-255111.firebaseio.com',
  projectId: 'chatwae-255111',
  storageBucket: '',
  messagingSenderId: '795918562003',
  appId: '1:795918562003:web:c7fa0b8c0a824a7c561a26',
};
firebase.initializeApp(firebaseConfig);

export const Firestore = firebase.firestore();
export default firebase;
