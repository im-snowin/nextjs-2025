import { doc, setDoc } from 'firebase/firestore';

import { initialize } from './firebase';

const { fireStore } = initialize();

export const createUser = async (uid, data) => {
  const userRef = doc(fireStore, 'users', uid);
  return await setDoc(userRef, { uid, ...data }, { merge: true });
};
