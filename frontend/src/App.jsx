import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Form from './components/Form.jsx';
import Dashboard from './components/Dashboard.jsx';
import { useQuery } from '@tanstack/react-query';
import {baseUrl} from "../constants/global_vars.js"

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  async function fetchDashboard() {
    const res = await fetch(baseUrl);
    const data = await res.json();
    if(!res.ok){
      throw new Error(data.error);
    }
    return data;
  }

  const {isPending, isError,data,error} = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard
  }) 
  
  if (isPending) return "Loading";
  if (isError) return error.message;
  console.log("CONTEUDO PSQL: ",data);

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
