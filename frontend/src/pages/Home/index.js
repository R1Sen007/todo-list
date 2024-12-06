import React from 'react';
import './index.css'
import TodoList from '../../components/TodoList';


const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <div className='home-container'>
        <TodoList />
      </div>
    </div>
  );
}


export default Home;