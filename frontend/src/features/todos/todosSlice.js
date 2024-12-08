import { createSlice } from '@reduxjs/toolkit';
import { fetchTodos, fetchTodo, updateTodo, createTodo } from './todosThunk';


const initialState = {
  data: [],
  currentTodo: null,
  loading: true,
  ordering: 'id',
  direction: '',
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  }
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setOrder: (state, action) => {
      state.ordering = action.payload
    },
    changeDirection: (state, action) => {
      state.direction == '' ? state.direction = '-' : state.direction = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        const { todos, pagination } = action.payload
        state.loading = false;
        state.data = todos
        state.pagination.totalPages = pagination.pages
        state.pagination.totalItems = pagination.count
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.currentTodo = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        const todo = action.payload;
        state.currentTodo = todo;
        state.loading = false;

      })
      .addCase(fetchTodo.rejected, (state) => {
        state.loading = false;
      })

      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.currentTodo = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const todo = action.payload;
        state.currentTodo = todo;
        state.loading = false;

      })
      .addCase(updateTodo.rejected, (state) => {
        state.loading = false;
      })

      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.currentTodo = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        const todo = action.payload;
        state.currentTodo = todo;
        state.loading = false;

      })
      .addCase(createTodo.rejected, (state) => {
        state.loading = false;
      })
  },
});

export const { setCurrentPage, setOrder, changeDirection } = todosSlice.actions;


export default todosSlice.reducer;