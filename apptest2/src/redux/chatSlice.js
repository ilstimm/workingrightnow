import {createSlice} from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatData: [],
    chatRoomData: [],
  },
  reducers: {
    setChat: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {setChat} = chatSlice.actions;

export default chatSlice.reducer;
