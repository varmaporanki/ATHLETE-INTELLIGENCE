import React, { createContext, useContext, useState, useEffect } from 'react';
import { sportsList } from '../data/sports';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('splash'); // 'splash', 'auth', 'sports_selection', 'dashboard'
  const [user, setUser] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);
  const [activeModule, setActiveModule] = useState('analyzer'); // 'analyzer', 'nutrition', 'opponent', 'coach'
  const [permissions, setPermissions] = useState({ camera: false, media: false });

  // Handle splash transition
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('auth');
      }, 5500); // Allow splash quotes and animations to play out
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const login = (email, password) => {
    // Simulate secure authentication
    setUser({
      email,
      name: email.split('@')[0].toUpperCase() || 'ELITE ATHLETE',
      joinedAt: new Date().toLocaleDateString()
    });
    setCurrentScreen('sports_selection');
  };

  const signup = (name, email, password) => {
    setUser({
      email,
      name: name.toUpperCase(),
      joinedAt: new Date().toLocaleDateString()
    });
    setCurrentScreen('sports_selection');
  };

  const logout = () => {
    setUser(null);
    setSelectedSport(null);
    setActiveModule('analyzer');
    setPermissions({ camera: false, media: false });
    setCurrentScreen('auth');
  };

  const selectSport = (sportId) => {
    const sport = sportsList.find(s => s.id === sportId);
    setSelectedSport(sport);
    setCurrentScreen('dashboard');
    setActiveModule('analyzer'); // default to video analyzer on select
  };

  const requestPermissions = () => {
    setPermissions({ camera: true, media: true });
  };

  return (
    <AppContext.Provider value={{
      currentScreen,
      setCurrentScreen,
      user,
      setUser,
      selectedSport,
      setSelectedSport,
      activeModule,
      setActiveModule,
      login,
      signup,
      logout,
      selectSport,
      permissions,
      requestPermissions
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
