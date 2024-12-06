import React from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router'

import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
