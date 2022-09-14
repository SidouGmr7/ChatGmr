// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAVa7dCv0PnBG-xWuonlMZaTKCM6lkzENQ',
  authDomain: 'chatgmr.firebaseapp.com',
  projectId: 'chatgmr',
  storageBucket: 'chatgmr.appspot.com',
  messagingSenderId: '160334141115',
  appId: '1:160334141115:web:990fe38dc7f739f439fb9e',
  measurementId: 'G-GPBDJJD5FB',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
