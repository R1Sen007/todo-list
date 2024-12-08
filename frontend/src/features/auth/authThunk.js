import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'
import {
  removeToken,
  setToken,
  setUserData,
  removeUserData,
} from '../../utils/dataFunctions'


export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post('api/v1/auth/token', payload);
    setToken(response.data.access_token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error)
  }
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
  removeToken();
  removeUserData();
});

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('api/v1/users/me');
    setUserData(response.data);
    return response.data
  } catch (error) {
    removeToken();
    removeUserData();
    return rejectWithValue(error);
  }
});
