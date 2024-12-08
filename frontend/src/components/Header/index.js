import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../features/auth/authThunk';
import Button from '../Button';
import './index.css'


const Header = () => {
  const { token, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignOut = () => {
    dispatch(signOut())
    navigate('/')
  };

  const onSignIn = () => navigate('/login');

  return (
    <nav>
      <a onClick={() => { navigate('/') }}>ToDo List</a>
      {userData && userData.username}
      {
        token ?
          <Button
            name='Sign OUT'
            className='btn-login'
            onClick={onSignOut}
          />
          :
          <Button
            name='Sign IN'
            className='btn-login'
            onClick={onSignIn}
          />
      }
    </nav>
  )
};

export default Header