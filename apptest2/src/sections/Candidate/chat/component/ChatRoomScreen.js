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
import chatRoomData from '../assets/Chats';
import MessageInput from './MessageInput';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RefreshContext = React.createContext();

const ChatRoomScreen = ({navigation, route, user}) => {
  const [chatData, setChatData] = useState();
  const [refreshing, setRefreshing] = useState(false);
  // console.log('outside: ' + JSON.parse(chatData));

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
    getChatData();
  };

  const getChatData = async () => {
    try {
      let chat = await AsyncStorage.getItem('chatdata');
      console.log('test');
      setChatData(
        JSON.parse(chat).filter(
          item => item.users[1].name == route.params.user.name,
        )[0].messages,
      );
      console.log(
        'chatdata= ' +
          // JSON.parse(
          JSON.stringify(
            chatData,
            // ),
          ),
      );
    } catch (error) {}
  };

  useLayoutEffect(() => {
    navigation.setOptions({title: route.params.chatRoom.users[1].name});
    getChatData();
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        refreshing={refreshing}
        // onRefresh={onRefresh}
        data={chatData}
        renderItem={({item}) => <Message message={item} />}
        inverted
      />
      <MessageInput user={route.params.user.name} refresh={onRefresh} />
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
