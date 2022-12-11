import { createContext, useContext, useEffect, useState } from 'react';
import {
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { initialize } from './firebase';

const { firebaseAuth } = initialize();

// Creating auth context
const authContext = createContext();

// Authentication functionalities
const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = (rawUser) => {
    // If a user already login
    if (rawUser) {
      const user = formatUser(rawUser);
      setLoading(false);
      setUser(user);
      return user;
    }

    // not login
    setLoading(false);
    setUser(false);
    return false;
  };

  const signinWithGithub = async () => {
    const githubProvider = new GithubAuthProvider();

    const res = await signInWithPopup(firebaseAuth, githubProvider);
    console.log(res.user);
    handleUser(res.user);
    return res.user;
  };

  const signout = async () => {
    await signOut(firebaseAuth);
    return handleUser(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, handleUser);

    return () => unsubscribe;
  }, []);

  return {
    user,
    loading,
    signinWithGithub,
    signout
  };
};

// Format the user return from the firebase auth
const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL
  };
};
// Auth provider
export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// Custom auth hook
export const useAuth = () => useContext(authContext);
