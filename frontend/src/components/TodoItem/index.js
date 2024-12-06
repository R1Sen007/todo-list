import React from 'react';
import './index.css'


const TodoItem = () => {
  return (
    <div className='todo-card'>
      <div className='todo-card-header'>
        <div className='todo-card-info'>
          <div className='todo-card-username'>
            <h3>John Doe</h3>
          </div>
          <div className='todo-card-email'>
            email@example.com
          </div>
        </div>
        <div className='todo-card-status'>
          active
        </div>
      </div>
      <div className='todo-card-body'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet accumsan blandit. Cras rhoncus lacus lectus, malesuada dignissim arcu rhoncus.
      </div>
      <div className='todo-card-footer'>
        if admin button will be here
      </div>
    </div>
  );
}


export default TodoItem;