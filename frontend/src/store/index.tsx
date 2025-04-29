import { combineReducers, configureStore } from '@reduxjs/toolkit'
// TODO: Import your slice reducers here, for example:
// import userReducer from '../features/user/userSlice'
import userReducer from './useSlice'
import {
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  FLUSH,
  REHYDRATE,
  persistStore,
} from 'redux-persist'
import localStorage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  user: userReducer,
})

const persistConfig = {
  key: 'root',
  storage: localStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, PURGE, REGISTER, FLUSH, REHYDRATE, PAUSE],
      },
    }),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
