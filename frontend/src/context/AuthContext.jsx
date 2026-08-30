// Intended path: /frontend/src/context/AuthContext.jsx
//
// Central place that tracks the Firebase auth state and the matching Mongo
// profile (with role). Wrap <App /> in <AuthProvider> so any component can
// call useAuth() to get { firebaseUser, profile, loading, signOutUser }.

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { syncUserProfile, getMyProfile } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [profile, setProfile] = useState(null); // Mongo user doc, includes `role`
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fires whenever Firebase sign-in state changes (sign-up, login, logout, refresh)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);

      if (user) {
        try {
          // Sync (create-or-update) the Mongo profile every time we get a fresh
          // Firebase session, then fetch it back so we know the assigned role.
          const idToken = await user.getIdToken();
          await syncUserProfile(idToken, { name: user.displayName || user.email });
          const mongoProfile = await getMyProfile(idToken);
          setProfile(mongoProfile);
        } catch (err) {
          console.error('Failed to sync/fetch user profile:', err);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signOutUser = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ firebaseUser, profile, loading, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an <AuthProvider>');
  return ctx;
}
