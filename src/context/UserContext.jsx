import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [userRecords, setUserRecords] = useState(() => {
    if (!user?.email) return { flashcards: [], quizzes: [], notes: [], quizStats: { completed: 0, averageScore: 0 } };
    try {
      const storageKey = `user_records_${user.email}`;
      const savedRecords = localStorage.getItem(storageKey);
      const parsedRecords = savedRecords ? JSON.parse(savedRecords) : null;
      return parsedRecords || {
        flashcards: [],
        quizzes: [],
        notes: [],
        quizStats: { completed: 0, averageScore: 0 }
      };
    } catch (error) {
      console.error('Error loading initial user records:', error);
      return {
        flashcards: [],
        quizzes: [],
        notes: [],
        quizStats: { completed: 0, averageScore: 0 }
      };
    }
  });

  // Update quiz statistics
  const updateQuizStats = (score) => {
    setUserRecords(prev => {
      const oldStats = prev.quizStats || { completed: 0, averageScore: 0 };
      const newCompleted = oldStats.completed + 1;
      const newAverage = ((oldStats.averageScore * oldStats.completed) + score) / newCompleted;
      
      return {
        ...prev,
        quizStats: {
          completed: newCompleted,
          averageScore: Math.round(newAverage * 100) / 100
        }
      };
    });
  };

  // Save user records whenever they change
  useEffect(() => {
    if (user?.email) {
      try {
        const storageKey = `user_records_${user.email}`;
        localStorage.setItem(storageKey, JSON.stringify(userRecords));
      } catch (error) {
        console.error('Error saving user records:', error);
      }
    }
  }, [userRecords, user?.email]);

  // Save user data whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const saveRecords = (type, data) => {
    setUserRecords(prev => {
      const newRecords = { ...prev, [type]: data };
      return newRecords;
    });
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setUserRecords({
      flashcards: [],
      quizzes: [],
      notes: [],
      quizStats: { completed: 0, averageScore: 0 }
    });
  };

  return (
    <UserContext.Provider value={{
      user,
      userRecords,
      login,
      logout,
      saveRecords,
      updateQuizStats
    }}>
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
