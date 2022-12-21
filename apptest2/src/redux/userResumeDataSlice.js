import {createSlice} from '@reduxjs/toolkit';

export const userResumeDataSlice = createSlice({
  name: 'resumeOrder',
  initialState: {
    userResumeData: [],
  },
  reducers: {
    setUserResumeData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {setUserResumeData} = userResumeDataSlice.actions;

export default userResumeDataSlice.reducer;
