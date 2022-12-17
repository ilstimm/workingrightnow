import {createSlice} from '@reduxjs/toolkit';

export const usernameSlice = createSlice({
  name: 'username',
  initialState: {
    username: '',
    password: '',
  },
  reducers: {
    setUsername: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {setUsername} = usernameSlice.actions;

export default usernameSlice.reducer;
