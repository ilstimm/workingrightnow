import {createSlice} from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: '',
  },
  reducers: {
    setToken: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {setToken} = tokenSlice.actions;

export default tokenSlice.reducer;
