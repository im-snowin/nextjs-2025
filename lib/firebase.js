import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { config } from '../config/firebase.config';

export const initialize = () => {
  const firebaseApp = initializeApp(config);
  const firebaseAuth = getAuth(firebaseApp);

  return { firebaseApp, firebaseAuth };
};
