import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, signOut } from './authThunk';


const initialState = {
  token: null,
  loading: false,
  userData: {}
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
      // state.userData = user;
      state.loading = false;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
    },
  }
});

export const {} = authSlice.actions;


export default authSlice.reducer;