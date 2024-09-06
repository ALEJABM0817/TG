import { configureStore } from '@reduxjs/toolkit'
import { authSlice, infoOfertantes, infoSlice } from './auth'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    info: infoSlice.reducer,
    users: infoOfertantes.reducer,
  },
})