import React, {
  Component,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/core';
import Message from './Message';
import MessageInput from './MessageInput';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import websocket from './Websocket';
import {useSelector} from 'react-redux';
import chats from '../../../../components/data/Chats.json';

// export const onRefresh = () => {
//   const [refreshing, setRefreshing] = useState(false);
//   setRefreshing(true);
//   setTimeout(() => {
//     setRefreshing(false);
//   }, 100);
//   console.log('refresh');
// };

const ChatRoomScreen = ({navigation, route}) => {
  const userId = useSelector(state => state.userId.userId);
  const [refreshing, setRefreshing] = useState(false);
  const [chatData, setChatData] = useState();
  const messageLength = chats.filter(
    item => item.users[1].name == route.params.otheruser,
  )[0].messages;

  function onRefresh() {
    // getChatData();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
    console.log('refresh');
  }

  console.log('====================================');
  console.log('refresh: ' + JSON.stringify(messageLength));
  console.log('====================================');

  useLayoutEffect(() => {
    // websocket(userId, onRefresh);
    navigation.setOptions({title: route.params.chatRoom.users[1].name});
    // getChatData();
  });

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        refreshing={refreshing}
        extraData={messageLength}
        // onRefresh={onRefresh}
        data={
          chats.filter(item => item.users[1].name == route.params.otheruser)[0]
            .messages
        }
        renderItem={({item}) => <Message message={item} />}
        inverted
      />
      <MessageInput
        // {...console.log('message:  ' + JSON.stringify(route.params.chatRoom))}
        otheruser={route.params.otheruser}
        refresh={onRefresh}
        chatData={
          chats.filter(item => item.users[1].name == route.params.otheruser)[0]
            .messages
        }
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default ChatRoomScreen;