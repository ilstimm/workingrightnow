import {configureStore} from '@reduxjs/toolkit';
import {resumeOrderSlice} from './resumeOrderSlice';
import {tokenSlice} from './tokenSlice';
import {userIdSlice} from './userIdSlice';

export default configureStore({
  reducer: {
    userId: userIdSlice.reducer,
    token: tokenSlice.reducer,
    resumeOrder: resumeOrderSlice.reducer,
  },
});
