import React from 'react';
import { Route, Routes} from 'react-router'

import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateTodo from './pages/CreateTodo';
import EditTodo from './pages/EditTodo';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='create' element={<CreateTodo />} />
        <Route element={<PrivateRoute />}>
          <Route path='edit/:todoId' element={<EditTodo />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
