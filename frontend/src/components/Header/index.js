import React from 'react';
import './index.css'
import Button from '../Button';


const Header = () => {
  return (
    <nav>
      ToDo List
      <Button
        name='Sign IN'
        className='btn-login'
      />
    </nav>
  )
};

export default Header