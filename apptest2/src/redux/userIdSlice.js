import {createSlice} from '@reduxjs/toolkit';

export const userIdSlice = createSlice({
  name: 'userId',
  initialState: {
    userId: '',
  },
  reducers: {
    setUserId: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {setUserId} = userIdSlice.actions;

export default userIdSlice.reducer;
