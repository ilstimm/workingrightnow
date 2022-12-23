import {useState} from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setUserResumeData} from '../redux/userResumeDataSlice';

export default function userResumeDataInitial(userId, token, dispatch) {
  console.log('444444444444444445555555555');
  //   useEffect(() => {
  const url = 'http://localhost:8080/auth/Resumes/getUserResumes/' + userId;
  console.log('url: ' + url);
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + token,
    },
  };
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      //   console.log('userResumeData:  ' + JSON.stringify(data));
      dispatch(setUserResumeData({userResumeData: data}));
      //   setReturnData(data);
    });
  //   console.log(retunData);
  //   });
}
