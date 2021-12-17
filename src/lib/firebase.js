import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyATsYHkC-12JBig5IfLuSLzfxmigRO07E4',
  authDomain: 'saitfeedback.firebaseapp.com',
  projectId: 'saitfeedback',
  storageBucket: 'saitfeedback.appspot.com',
  messagingSenderId: '1082037507867',
  appId: '1:1082037507867:web:043e88845df0998bde65be',
  measurementId: 'G-QD4XXLSHQ1',
}

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)
export const auth = getAuth(firebaseApp)

export const db = getFirestore(firebaseApp)
export default firebase
