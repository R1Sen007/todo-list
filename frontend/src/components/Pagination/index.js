import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../features/todos/todosSlice';
import { fetchTodos } from '../../features/todos/todosThunk';
import './index.css'
import Button from '../Button';


const Pagination = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handlePrevPage = () => {
    if (todos.pagination.currentPage > 1) {
      dispatch(setCurrentPage(todos.pagination.currentPage - 1));
      dispatch(fetchTodos());
    }
  };

  const handleNextPage = () => {
    if (todos.pagination.currentPage < todos.pagination.totalPages) {
      dispatch(setCurrentPage(todos.pagination.currentPage + 1));
      dispatch(fetchTodos());
    }
  };

  return (
    <div className='pagination-container'>
      <Button
        name='prev'
        className='btn-pagination'
        onClick={handlePrevPage}
        disabled={todos.pagination.currentPage === 1}
      />
      <span className='pagination-info' >
        Page {todos.pagination.currentPage} of {todos.pagination.totalPages}
      </span>
      <Button
        name='next'
        className='btn-pagination'
        onClick={handleNextPage}
        disabled={todos.pagination.currentPage === todos.pagination.totalPages}
      />
    </div>
  );
}


export default Pagination;