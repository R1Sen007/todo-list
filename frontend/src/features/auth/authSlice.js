import { createSlice } from '@reduxjs/toolkit';
import { login, signOut, fetchUserData } from './authThunk';
import { getToken, getUserData, removeToken, removeUserData } from '../../utils/dataFunctions';


const initialState = {
  token: getToken(),
  loading: false,
  userData: getUserData()
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.token = null;
      state.userData = null;
      removeToken();
      removeUserData();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const accessToken = action.payload.access_token;
        state.token = accessToken;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(signOut.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = {};
        state.token = null;
      })

      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = { ...action.payload }
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.userData = {};
        state.token = null;
      })
  },
});

export const { clearUserData } = authSlice.actions;


export default authSlice.reducer;