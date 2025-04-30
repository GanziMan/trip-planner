import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@/api/axiosInstance'

interface RegisterUserPayload {
  email: string
  name: string
  password: string
}

interface LoginUserPayload {
  email: string
  password: string
}

export const registerUser = createAsyncThunk(
  '/user/register',
  async (value: RegisterUserPayload, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/user/register', value)

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const loginUser = createAsyncThunk(
  '/user/login',
  async (value: LoginUserPayload, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/user/login', value)

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)
