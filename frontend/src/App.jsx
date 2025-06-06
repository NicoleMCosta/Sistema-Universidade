import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Form from './components/Form.jsx';
import Dashboard from './components/Dashboard.jsx';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/dashboard" element={ isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
