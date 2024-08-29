import { configureStore } from '@reduxjs/toolkit'
import { authSlice, infoSlice } from './auth'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    info: infoSlice.reducer
  },
})