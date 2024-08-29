import { createSlice } from "@reduxjs/toolkit";

export const infoSlice = createSlice({
  name: 'info',
  initialState: {
    completeInfo: false
  }, 
  reducers: {
    isCompleteInfo: (state, { payload }) => {
        state.completeInfo = payload.complete_info;
    }
  },
});

export const { isCompleteInfo } = infoSlice.actions
