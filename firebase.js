import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { Alert } from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyA350B46Oas-K90dk9FTyXLTL0p2znRXL8",
    authDomain: "spotper-20201.firebaseapp.com",
    projectId: "spotper-20201",
    storageBucket: "spotper-20201.appspot.com",
    messagingSenderId: "55574224974",
    appId: "1:55574224974:web:9f4949f1d855797b81631f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export {auth};
export default db;