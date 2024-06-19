"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db, doc } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, updateDoc } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (firebaseUser) => {
    if (!firebaseUser) return;

    const userDocRef = doc(db, "users", firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      setUser({ uid: firebaseUser.uid, ...userDoc.data() });
    } else {
      setUser(firebaseUser);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        await fetchUserData(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateUserProfile = async (updatedData) => {
    if (!user || !user.uid) return;

    const userDocRef = doc(db, "users", user.uid);

    await updateDoc(userDocRef, updatedData);

    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
