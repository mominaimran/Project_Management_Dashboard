import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/useAuthStore.js';
import Dashboard from './pages/Dashboard.jsx';
import Tasks from './pages/Tasks.jsx';
import Projects from './pages/Projects.jsx';
import Login from './pages/Login.jsx';
import Settings from './pages/Settings.jsx';
import Signup from './pages/Signup.jsx';
import Layout from './layouts/Layout.jsx';

const App = () => {
  const { user, isCheckingAuth, checkAuthUser } = useAuthStore();

  useEffect(() => {
    checkAuthUser();
  }, [checkAuthUser]);

  if (isCheckingAuth) return <div>Loading...</div>;

  return (
    <div>
      <Routes>
        {/* Protected routes */}
        <Route element={user ? <Layout /> : <Navigate to="/login" />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Public routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
