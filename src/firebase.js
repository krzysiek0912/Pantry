import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyCZzzfMIBFVCp7da4rWgzuw2PMDuyUyj0Q',
    authDomain: 'pantry-7e078.firebaseapp.com',
    databaseURL: 'https://pantry-7e078.firebaseio.com',
    projectId: 'pantry-7e078',
    storageBucket: 'pantry-7e078.appspot.com',
    messagingSenderId: '934391885510',
    appId: '1:934391885510:web:ce79a34df1b2ffd968f1c7',

    // OPTIONAL
    // storageBucket: 'STORAGE_BUCKET',
    // messagingSenderId: 'MESSAGING_SENDER_ID',
};
firebase.initializeApp(config);
export default firebase;
