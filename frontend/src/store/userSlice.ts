import { createSlice } from '@reduxjs/toolkit'
import { loginUser, registerUser } from './thunkFunctions'
import { toast } from 'react-hot-toast'

const initialState = {
  userData: {
    id: '',
    email: '',
    name: '',
    role: 0,
    image: '',
  },
  isAuth: false,
  isLoading: false,
  error: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false
        toast.success('회원가입 성공')
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        // console.log('fafkao')
        state.error = action.payload as string
        toast.error('회원가입 실패')
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.userData = action.payload
        state.isAuth = true
        localStorage.setItem('accessToken', action.payload.accessTokenㅠㄱ)
        toast.success('회원가입 성공')
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        // console.log('fafkao')
        state.error = action.payload as string
        toast.error('회원가입 실패')
      })
  },
})

export default userSlice.reducer
