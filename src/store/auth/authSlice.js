import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // 'checking', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
    typeUser: null,
    direccion: null,
  }, 
  reducers: {
    login: (state, { payload }) => {
        state.status = 'authenticated'; // 'checking', 'authenticated'
        state.uid = payload.cedula;
        state.email = payload.email;
        state.displayName = payload.name || payload.nombre;
        state.photoURL = payload?.photURL || '';
        state.errorMessage = null;
        state.typeUser = payload.typeUser;
        state.telepono = payload.telefono;
        state.direccion = payload.direccion;
    },
    logout: (state,  { payload } ) => {
        state.status= 'no-authenticated'; // 'checking', 'authenticated'
        state.uid= null;
        state.email= null;
        state.displayName= null;
        state.photoURL= null;
        state.errorMessage= payload?.errorMessage || null;
        state.typeUser = null;
        state.telefono = null;
    },
    checkingCredentials: (state) => {
        state.status = 'checking';
    }
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions
