import {configureStore} from '@reduxjs/toolkit';
import {resumeOrderSlice} from './resumeOrderSlice';
import {tokenSlice} from './tokenSlice';
import {userIdSlice} from './userIdSlice';
import {userResumeDataSlice} from './userResumeDataSlice';

export default configureStore({
  reducer: {
    userId: userIdSlice.reducer,
    token: tokenSlice.reducer,
    userResumeData: userResumeDataSlice.reducer,
    resumeOrder: resumeOrderSlice.reducer,
  },
});
