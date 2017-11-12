import firebase from 'firebase'

export const appName = 'react-course-f262b'

firebase.initializeApp({
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    apiKey: "AIzaSyAt-smU_1tqNdkj9pmSpVLxqaOjhDwf4dk",
    storageBucket: "react-course-f262b.appspot.com",
    messagingSenderId: "447165438476"
})