import { createSlice } from "@reduxjs/toolkit";

export const infoOfertantes = createSlice({
  name: 'ofertantes',
  initialState: {
    ofertantes: [],
    ofertanteCV: []
  }, 
  reducers: {
    setOfertantes: (state, { payload }) => {
        state.ofertantes = payload;
    },
    setOfertanteCV: (state, { payload }) => {
      state.ofertanteCV = payload;
    }
  }
});

export const { setOfertantes, setOfertanteCV } = infoOfertantes.actions
