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

const ChatRoom = ({navigation}) => {
  const user = useSelector(state => state.userId.userId);
  const [chatData, setChatData] = useState([]);
  // const [chatRoomData, setChatRoomData] = useState();
  const [chatRoomName, setChatRoomName] = useState('');

  useLayoutEffect(() => {
    getChatData();
  }, []);

  async function getChatData() {
    try {
      const result = await AsyncStorage.getItem('@chatdata');
      setChatData(JSON.parse(result));
      // console.log('chatdata1111:  ' + JSON.stringify(chatData));
    } catch (error) {}
  }

  function storeChatData(chatData) {
    const chat = chatData;
    console.log('111111111' + JSON.stringify(chat));
    chat.unshift({
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
    setChatData(chat);
    AsyncStorage.setItem('@chatdata', JSON.stringify(chat));
  }

  const newChatRoom = () => {
    storeChatData(chatData);
    setChatRoomName('');
  };

  // console.log('storechatdata: ' + JSON.stringify(chatData));

  return (
    <View style={styles.page}>
      <TextInput
        value={chatRoomName}
        onChangeText={chatRoomName => setChatRoomName(chatRoomName)}
      />
      <TouchableOpacity activeOpacity={0.5} onPress={newChatRoom}>
        <Text style={{backgroundColor: 'gray', fontSize: 30}}>新增聊天室</Text>
      </TouchableOpacity>
      {chatData == undefined ? (
        <></>
      ) : (
        <FlatList
          // refreshing={refreshing}
          // extraData={chatData}
          // {...console.log('chatRoomData: ' + chatData)}
          data={chatData}
          renderItem={props => (
            <ChatRoomItem navigation={navigation} chatRoom={props.item} />
          )}
          // ListHeaderComponent = {() => <Text style = { styles.header }>聊天室</Text>}
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
