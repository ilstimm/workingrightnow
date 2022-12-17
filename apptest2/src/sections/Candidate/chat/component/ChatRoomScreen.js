import React, {Component, useEffect, useRef, useState} from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/core';
import Message from './Message';
import chatRoomData from '../assets/Chats';
import MessageInput from './MessageInput';
import {Button} from 'react-native-elements';

export const RefreshContext = React.createContext();

const ChatRoomScreen = ({navigation, route, user}) => {
  // const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    navigation.setOptions({title: route.params.chatRoom.users[1].name});
    console.log(route.params.chatRoom.users[1].name);
    console.log('21:' + route.params.user.name);
    console.log(
      '123: ' +
        JSON.stringify(
          chatRoomData.filter(
            item => item.users[1].name == route.params.chatRoom.users[1].name,
          )[0].messages,
        ),
    );

    console.log('21111:' + JSON.stringify(chatRoomData));
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        refreshing={refreshing}
        // onRefresh={onRefresh}
        data={
          chatRoomData.filter(
            item => item.users[1].name == route.params.user.name,
          )[0].messages
        }
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
