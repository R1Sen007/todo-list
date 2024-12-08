import React from 'react';
import './index.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Button from '../Button';


const TodoItem = ({ id, username, email, status, text, edited_by_admin }) => {
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const handleEdit = () => { navigate(`edit/${id}`) };

  return (
    <div className='todo-card'>
      <div className='todo-card-header'>
        <div className='todo-card-info'>
          <div className='todo-card-username'>
            <h3>{username}</h3>
          </div>
          <div className='todo-card-email'>
            {email}
          </div>
        </div>
        <div className='todo-card-status'>
          {status}
        </div>
      </div>
      <div className='todo-card-body'>
        {text}
      </div>
      <div className='todo-card-footer'>
        {edited_by_admin && <span>edited by admin</span>}
        {userData && userData.is_superuser && <Button name='edit' className='btn-admin-edit' onClick={handleEdit} />}
      </div>
    </div>
  );
}


export default TodoItem;