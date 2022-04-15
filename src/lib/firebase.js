import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
}

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)

export const db = getFirestore(firebaseApp)
enableIndexedDbPersistence(db).catch((err) => {
  console.log(err.message)
})
export default firebase
