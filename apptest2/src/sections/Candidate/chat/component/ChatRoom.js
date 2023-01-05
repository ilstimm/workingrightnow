import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  Button,
  TextInput,
  View,
  Alert,
  Nevigator,
  TouchableOpacity,
} from 'react-native';
import ChatRoomItem from './ChatRoomItem';
import ChatRoomsData from '../assets/ChatRooms';
import ChatRoomScreen from './ChatRoomScreen';
import {Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import chats from '../../../../components/data/Chats.json';

const ChatRoom = ({navigation}) => {
  const user = useSelector(state => state.userId.userId);
  const [chatRoomName, setChatRoomName] = useState('');

  function storeChatData() {
    chats.unshift({
      users: [
        {
          name: user,
          imageUri:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/123.jpg',
        },
        {
          name: chatRoomName,
          imageUri:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
        },
      ],
      messages: [],
    });
    AsyncStorage.setItem('@chatdata', JSON.stringify(chats));
  }

  const newChatRoom = () => {
    storeChatData();
    setChatRoomName('');
    // await AsyncStorage.setItem('@chatdata', JSON.stringify(chats));
  };

  return (
    <View style={styles.page}>
      {chats == undefined ? (
        <></>
      ) : (
        <FlatList
          data={chats.filter(item => item.users[0].name == user)} //篩選當前使用者的聊天資料
          renderItem={props => (
            <ChatRoomItem navigation={navigation} chatRoom={props.item} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    fontWeight: '800',
    fontSize: 30,
    alignSelf: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
  },
});

export default ChatRoom;
