import { React, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodo } from '../../features/todos/todosThunk';
import EditForm from '../../components/EditForm';
import './index.css'



const EditTodo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, currentTodo } = useSelector((state) => state.todos);
  const { todoId } = useParams();

  useEffect(() => {
    dispatch(fetchTodo(todoId))
      .unwrap()
      .catch((err) => {
        console.log("--failed", err);
        const { status, response: { data: { message } } } = err
        handleErrorStatus(status, message)
      })
  }, []);

  const handleErrorStatus = (status, message) => {
    switch (status) {
      case 404:
        console.log('redirect')
        navigate('*');
        break;
    }
  };

  if (loading) {
    return <span>Loading...</span>
  }

  return (
    <div className='edit-container'>
      <h2>{`Edit ${todoId}`}</h2>
      <EditForm defaultData={currentTodo} todoId={todoId} />
    </div>
  )
};

export default EditTodo;