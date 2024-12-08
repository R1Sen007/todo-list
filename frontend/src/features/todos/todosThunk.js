import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'


const ITEMS_PER_PAGE = 3;

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { getState, rejectWithValue }) => {
  try {
    const { currentPage } = getState().todos.pagination;
    const { ordering, direction } = getState().todos
    const response = await api.get(
      `api/v1/todos?page=${currentPage}&per-page=${ITEMS_PER_PAGE}&order=${direction + ordering}`
    );
    const { results: todos, pagination } = await response.data;
    return { todos, pagination }
  } catch (error) {
    console.log(error)
    return rejectWithValue(error)
  }
});

export const fetchTodo = createAsyncThunk('todos/fetchTodo', async (payload, { rejectWithValue }) => {
  try {
    const response = await api.get(`api/v1/todos/${payload}`);
    return response.data
  } catch (error) {
    console.log(error)
    return rejectWithValue(error)
  }
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (payload, { rejectWithValue }) => {
  try {
    const response = await api.patch(`api/v1/todos/${payload.todoId}`, payload.data);
    return response.data
  } catch (error) {
    console.log(error)
    return rejectWithValue(error)
  }
});

export const createTodo = createAsyncThunk('todos/createTodo', async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post(`api/v1/todos`, payload);
    return response.data
  } catch (error) {
    console.log(error)
    return rejectWithValue(error)
  }
});