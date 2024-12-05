import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'
import history from '../../utils/history'
import { getToken, removeToken, setToken } from '../../utils/tokenFunctions'

export const login = createAsyncThunk('auth/login', async (payload) => {
  const response = await api.post('api/v1/auth/token', payload);
  setToken(response.data.access_token);
  history.push('/home');
  return response.data;
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
  removeToken();
});
