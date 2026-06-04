import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Splash from './components/Splash';
import Auth from './components/Auth';
import SportsSelection from './components/SportsSelection';
import Dashboard from './components/Dashboard';

function AppContent() {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    case 'splash':
      return <Splash />;
    case 'auth':
      return <Auth />;
    case 'sports_selection':
      return <SportsSelection />;
    case 'dashboard':
      return <Dashboard />;
    default:
      return <Splash />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
