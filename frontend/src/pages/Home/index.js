import React from 'react';
import TodoList from '../../components/TodoList';
import ControlPanel from '../../components/ControlPanel';
import Pagination from '../../components/Pagination';
import './index.css'


const Home = () => {
  return (
    <div>
      <div className='home-container'>
        <ControlPanel />
        <TodoList />
        <Pagination />
      </div>
    </div>
  );
}


export default Home;