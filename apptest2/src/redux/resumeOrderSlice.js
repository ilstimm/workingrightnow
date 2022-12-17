import {createSlice} from '@reduxjs/toolkit';

export const resumeOrderSlice = createSlice({
  name: 'resumeOrder',
  initialState: {
    resumeOrder: 1,
  },
  reducers: {
    setResumeOrder: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {setResumeOrder} = resumeOrderSlice.actions;

export default resumeOrderSlice.reducer;
