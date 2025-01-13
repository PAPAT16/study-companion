import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [userRecords, setUserRecords] = useState({
    flashcards: [],
    quizzes: [],
    notes: []
  });

  // Get user-specific storage key
  const getUserStorageKey = (email) => {
    return `user_records_${email}`;
  };

  // Load user records from localStorage
  const loadUserRecords = (email) => {
    try {
      const storageKey = getUserStorageKey(email);
      const savedRecords = localStorage.getItem(storageKey);
      if (savedRecords) {
        setUserRecords(JSON.parse(savedRecords));
      } else {
        // Initialize empty records for new user
        setUserRecords({
          flashcards: [],
          quizzes: [],
          notes: []
        });
      }
    } catch (error) {
      console.error('Error loading user records:', error);
    }
  };

  // Save user records to localStorage
  const saveUserRecords = () => {
    if (user?.email) {
      try {
        const storageKey = getUserStorageKey(user.email);
        localStorage.setItem(storageKey, JSON.stringify(userRecords));
      } catch (error) {
        console.error('Error saving user records:', error);
      }
    }
  };

  // Save specific record type (flashcards, quizzes, notes)
  const saveRecords = (recordType, records) => {
    setUserRecords(prev => ({
      ...prev,
      [recordType]: records
    }));
  };

  // Clear user records from localStorage on logout
  const clearUserRecords = (email) => {
    const storageKey = getUserStorageKey(email);
    localStorage.removeItem(storageKey);
    setUserRecords({
      flashcards: [],
      quizzes: [],
      notes: []
    });
  };

  // Handle user login
  const login = (userData) => {
    setUser(userData);
    loadUserRecords(userData.email);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Handle user logout
  const logout = () => {
    if (user?.email) {
      saveUserRecords(); // Save current user's records before logging out
      clearUserRecords(user.email);
    }
    setUser(null);
    localStorage.removeItem('user');
  };

  // Save records when they change
  useEffect(() => {
    if (user?.email) {
      saveUserRecords();
    }
  }, [userRecords]);

  // Load user records on mount or when user changes
  useEffect(() => {
    if (user?.email) {
      loadUserRecords(user.email);
    }
  }, [user?.email]);

  const value = {
    user,
    userRecords,
    login,
    logout,
    saveRecords
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
