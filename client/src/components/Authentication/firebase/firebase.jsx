import  { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import Lodder from '../Lodding/LodderFile'

const firebaseConfig = {
  apiKey: "AIzaSyC5m22OEi-oH9xw0IdBNaVlh9u1SIJWk6w",
  authDomain: "inovate-togother.firebaseapp.com",
  projectId: "inovate-togother",
  storageBucket: "inovate-togother.firebasestorage.app",
  messagingSenderId: "597658265743",
  appId: "1:597658265743:web:a14ec21ad12ac747dea8fa"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div ><Lodder /></div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

export default app;
