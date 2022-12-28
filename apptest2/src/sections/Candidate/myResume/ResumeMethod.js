import React from 'react';
import {useSelector} from 'react-redux';
const url = 'http://tim.ils.tw:80/project/auth/Resumes';
const token = useSelector(state => state.token);

export function Post(props) {
  console.log('ResumeMethod = ' + token.token);
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + token.token,
    },
    body: JSON.stringify({
      user: props.user,
      title: props.title,
      name: props.name,
      sex: props.sex,
      age: props.age,
      type: props.type,
      region: props.region,
      phoneNumber: props.phone,
      email: props.email,
      introduction: props.introduction,
      education: props.education,
      order: props.order,
    }),
  };
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}

export function Delete(user, order) {
  console.log('user = ' + user, 'order = ' + order);
  const options = {
    method: 'Delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + token.token,
    },
  };
  fetch(url + '/' + user + '/' + order, options);
}
