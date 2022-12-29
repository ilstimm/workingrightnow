import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {useEffect} from 'react';
import {setChat} from '../redux/chatSlice';
import chatData from '../components/data/Chats.json';

export default async function chatDataInitial(dispatch) {
  try {
    const storekey = await AsyncStorage.getAllKeys();
    // AsyncStorage.removeItem('@chatdata');
    console.log('\n\nstorekey:\n\n' + storekey);
    if (!storekey.includes('@chatroomdata')) {
      AsyncStorage.setItem('@chatroomdata', JSON.stringify([]));
    } else if (!storekey.includes('@chatdata')) {
      AsyncStorage.setItem('@chatdata', JSON.stringify([]));
    } else {
      chatData.unshift(JSON.parse(await AsyncStorage.getItem('@chatdata'))[0],0);
      console.log('chatdata13216546: ' + JSON.stringify(chatData));
    }
  } catch (error) {}
  // const test = await AsyncStorage.getItem('@chatdata');
  // console.log('\n\ntest:\n\n' + test);
}
