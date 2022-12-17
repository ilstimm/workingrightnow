import {configureStore} from '@reduxjs/toolkit';
import {resumeOrderSlice} from './resumeOrderSlice';
import {tokenSlice} from './tokenSlice';
import {usernameSlice} from './usernameSlice';

export default configureStore({
  reducer: {
    username: usernameSlice.reducer,
    token: tokenSlice.reducer,
    resumeOrder: resumeOrderSlice.reducer,
  },
});
