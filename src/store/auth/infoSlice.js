import { createSlice } from "@reduxjs/toolkit";

export const infoSlice = createSlice({
  name: 'info',
  initialState: {
    completeInfo: false
  }, 
  reducers: {
    isCompleteInfo: (state, { payload }) => {
        state.completeInfo = payload.complete_info;
    },
    setResetCompleteInfo: (state) => {
      state.completeInfo = false;
    }
  },
});

export const { isCompleteInfo, setResetCompleteInfo } = infoSlice.actions
