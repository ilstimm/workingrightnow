import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {useEffect} from 'react';
import {setChat} from '../redux/chatSlice';

export default async function chatDataInitial(dispatch) {
  try {
    const storekey = await AsyncStorage.getAllKeys();
    // AsyncStorage.removeItem('@chatdata');
    console.log('\n\nstorekey:\n\n' + storekey);
    if (!storekey.includes('@chatroomdata')) {
      AsyncStorage.setItem('@chatroomdata', JSON.stringify([]));
    } else if (!storekey.includes('@chatdata')) {
      AsyncStorage.setItem('@chatdata', JSON.stringify([]));
    }
  } catch (error) {}
  // const test = await AsyncStorage.getItem('@chatdata');
  // console.log('\n\ntest:\n\n' + test);
}
