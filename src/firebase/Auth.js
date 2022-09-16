import { auth, db } from '../firebase'
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  const { uid, displayName, photoURL } = auth.currentUser
  const Data = {
    name: displayName,
    uid,
    timestamp: serverTimestamp(),
    photoURL: photoURL,
  }
  const docSnap = await getDoc(doc(db, 'users', uid))

  if (!docSnap.exists()) {
    await setDoc(doc(db, 'users', uid), Data)
  } else {
    await updateDoc(doc(db, 'users', uid), {
      LastIn: serverTimestamp(),
    })
  }
}

export const facebookSignIn = () => {
  const provider = new FacebookAuthProvider()
  signInWithPopup(auth, provider)
}
