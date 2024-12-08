import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setOrder, changeDirection } from '../../features/todos/todosSlice';
import { fetchTodos } from '../../features/todos/todosThunk';
import Button from '../Button';
import './index.css'


const ControlPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ordering, direction } = useSelector((state) => state.todos);

  const handleChangeOrder = (order) => {
    console.log(order)
    dispatch(setOrder(order))
    dispatch(fetchTodos())
  };

  const handleChangeDirection = () => {
    dispatch(changeDirection())
    dispatch(fetchTodos())
  };

  const handleCreate = () => { navigate('create') };

  return (
    <div className='control-container'>
      <div className='control-filter-container'>
        <Button name='username' className='btn-control-filter' onClick={() => handleChangeOrder('username')} />
        <Button name='email' className='btn-control-filter' onClick={() => handleChangeOrder('email')} />
        <Button name='status' className='btn-control-filter' onClick={() => handleChangeOrder('status')} />
        |
        <Button
          name={`Direction: ${direction == '' ? 'asc' : 'desc'}`}
          className='btn-control-filter'
          onClick={() => handleChangeDirection()}
        />
      </div>
      <div className='control-todo-container'>
        <Button name='add ToDo' className='btn-control-todo' onClick={handleCreate} />
      </div>
    </div>
  );
}


export default ControlPanel;