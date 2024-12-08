import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../../features/todos/todosThunk';
import TodoItem from '../TodoItem';
import './index.css'


const TodoList = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return <span>Loading...</span>
  }

  return (
    <div className='todolist-container'>
      {data?.map((todo) => (
        <TodoItem {...todo} key={todo.id} />
      ))}
    </div>
  );
}


export default TodoList;