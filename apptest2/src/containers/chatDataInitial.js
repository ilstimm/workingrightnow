import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {useEffect} from 'react';
import {setChat} from '../redux/chatSlice';
import chats from '../components/data/Chats.json';

export default async function chatDataInitial(userId, token) {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + token,
    },
  };
  const url = 'http://tim.ils.tw:80/project/auth/getChatData/' + userId;
  const offlinechats = await fetch(url, options);
  const offlineChats = await offlinechats.json();
  console.log('離線data: ' + JSON.stringify(offlineChats));
  // AsyncStorage.removeItem('@chatdata');
  if (offlineChats.length != 0) {
    //如果有離線資料
    try {
      // AsyncStorage.removeItem('@chatdata');
      const storekey = await AsyncStorage.getAllKeys();
      console.log('\n\nstorekey:\n\n' + storekey);
      if (!storekey.includes('@chatdata')) {
        chats.splice(0);
        chats.unshift({
          users: [
            {
              name: '',
              imageUri: '',
            },
            {
              name: '',
              imageUri: '',
            },
          ],
          messages: [
            {
              content: '',
              createdAt: '',
              name: '',
              type: '',
            },
          ],
        });
        console.log('chatsdata:   ' + JSON.stringify(chats));
        AsyncStorage.setItem('@chatdata', JSON.stringisfy([]));
      } else {
        chats.splice(0);
        JSON.parse(await AsyncStorage.getItem('@chatdata')).forEach(element => {
          chats.unshift(element);
        });
        console.log('chatdata13216546: ' + JSON.stringify(chatData));
      }
    } catch (error) {}
    console.log('====================================');
    console.log('chats12345679:   ' + JSON.stringify(chats));
    console.log('====================================');
    offlineChats.forEach(offlineChatsdata => {
      chats.forEach(data => {
        if (data.users[1].name === offlineChatsdata.sender) {
          console.log('==========================');
          data.messages.unshift({
            content: offlineChatsdata.message,
            createdAt: offlineChatsdata.createTime,
            name: offlineChatsdata.sender,
            type: offlineChatsdata.type,
          });
        } else {
          console.log('**************************');
          chats.unshift({
            users: [
              {
                name: userId,
                imageUri:
                  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
              },
              {
                name: offlineChatsdata.sender,
                imageUri:
                  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
              },
            ],
            messages: [
              {
                content: offlineChatsdata.message,
                createdAt: offlineChatsdata.createTime,
                name: offlineChatsdata.sender,
                type: offlineChatsdata.type,
              },
            ],
          });
        }
      });
    });
  } else {
    try {
      // AsyncStorage.removeItem('@chatdata');
      console.log('33333333333333333333333');
      const storekey = await AsyncStorage.getAllKeys();
      console.log('\n\nstorekey:\n\n' + storekey);
      if (!storekey.includes('@chatdata')) {
        chats.splice(0);
        AsyncStorage.setItem('@chatdata', JSON.stringisfy([]));
      } else {
        chats.splice(0);
        JSON.parse(await AsyncStorage.getItem('@chatdata')).forEach(element => {
          chats.unshift(element);
        });
        console.log('chatdata13216546: ' + JSON.stringify(chats));
      }
    } catch (error) {}
  }
  console.log('chatdata0000000000000000: ' + JSON.stringify(chats));
  AsyncStorage.setItem('@chatdata', JSON.stringify(chats));
}
