import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../features/auth/authThunk';
import Button from '../Button';
import './index.css'


const Header = () => {
  const { token, loading, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav>
      ToDo List
      {userData && userData.username}
      {
        token ?
          <Button
            name='Sign OUT'
            className='btn-login'
            onClick={() => {
              dispatch(signOut())
              navigate('/')
            }}
          />
          :
          <Button
            name='Sign IN'
            className='btn-login'
          onClick={() => { navigate('/login') }}
          />
      }
    </nav>
  )
};

export default Header