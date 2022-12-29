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

const ChatRoomScreen = ({navigation, route, user}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [chatData, setChatData] = useState();
  // console.log('outside: ' + JSON.parse(chatData));

  function onRefresh() {
    getChatData();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
    console.log('refresh');
  }

  const getChatData = async () => {
    try {
      chat = await AsyncStorage.getItem('@chatdata');
      console.log('test');
      setChatData(
        JSON.parse(chat).filter(
          item => item.users[1].name == route.params.otheruser,
        )[0].messages,
      );
      // console.log(
      //   'chatdata= ' +
      //     // JSON.parse(
      //     JSON.stringify(
      //       chatData,
      //       // ),
      //     ),
      // );
    } catch (error) {}
  };

  useLayoutEffect(() => {
    navigation.setOptions({title: route.params.chatRoom.users[1].name});
    getChatData();
  }, []);

  useEffect(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, [websocket]);

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        refreshing={refreshing}
        // onRefresh={onRefresh}
        data={chatData}
        renderItem={({item}) => <Message message={item} />}
        inverted
      />
      <MessageInput
        // {...console.log('message:  ' + JSON.stringify(route.params.chatRoom))}
        otheruser={route.params.otheruser}
        refresh={onRefresh}
        chatData={route.params.messages}
      />
    </SafeAreaView>
  );
};;
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
});
export default ChatRoomScreen;
