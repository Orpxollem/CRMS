import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Deals from './pages/Deals';
import Tasks from './pages/Tasks';
import Companies from './pages/Companies';
import Settings from './pages/Settings';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="deals" element={<Deals />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="companies" element={<Companies />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;