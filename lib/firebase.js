import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { config } from '../config/firebase.config';

export const initialize = () => {
  const firebaseApp = initializeApp(config);
  const fireStore = getFirestore();
  const firebaseAuth = getAuth(firebaseApp);

  return { firebaseApp, firebaseAuth, fireStore };
};
