import React from 'react';
import './index.css'
import TodoItem from '../TodoItem';


const TodoList = () => {
  return (
    <div className='todolist-container'>
      {/* <h2>TodoList</h2> */}
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </div>
  );
}


export default TodoList;