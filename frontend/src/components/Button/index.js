import React from 'react'; 
import './index.css'

const Button = ({onSubmit, name, type, className, onClick}) => {
  return <button className={className} onClick={onClick} type={type} onSubmit={onSubmit}>{name}</button>
};

export default Button;