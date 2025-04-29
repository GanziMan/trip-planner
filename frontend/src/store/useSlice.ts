import { createSlice } from '@reduxjs/toolkit'

interface UserData {
  id: string
  email: string
  name: string
  role: number
  image: string
}
interface InitialState {
  userData: UserData
  isAuth: boolean
  isLaoding: boolean
  erorr: string
}

const initialState: InitialState = {
  userData: {
    id: '',
    email: '',
    name: '',
    role: 0,
    image: '',
  },
  isAuth: false,
  isLaoding: false,
  erorr: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default userSlice.reducer
