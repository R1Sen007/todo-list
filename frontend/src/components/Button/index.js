import React from 'react'; 
import './index.css'

const Button = ({onSubmit, name, type, className, onClick, disabled}) => {
  return <button className={className} onClick={onClick} type={type} onSubmit={onSubmit} disabled={disabled}>{name}</button>
};

export default Button;