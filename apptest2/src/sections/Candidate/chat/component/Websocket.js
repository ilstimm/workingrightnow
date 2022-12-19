import React, {useState, createContext, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import chatDatas from '../assets/Chats';

import {Client} from '@stomp/stompjs';
import {useSelector} from 'react-redux';
const client = new Client();

const websocket = account => {
  const time = new Date();
  console.log('account: ' + account);

  client.configure({
    brokerURL: 'http://localhost:8080/chat',
    forceBinaryWSFrames: true,
    appendMissingNULLonIncoming: true,
    onConnect: () => {
      // const userId = useSelector(state => state.userId);
      console.log('connect');
      client.subscribe(
        '/chat/single/' + account, // /chat/single/ + username
        message => {
          let data = JSON.parse(message.body);
          console.log(data); // 收到訊息之後要做的事
          chatDatas
            .filter(item => item.users[1].name == data.sender)[0]
            .messages.unshift({
              content: data.message,
              createdAt: time.getTime(),
              name: data.sender,
            });
        },
        {},
      );
    },
    debug: function (str) {
      console.log(str);
    },
    connectHeaders: {},

    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });
  client.forceBinaryWSFrames = true;
  client.activate();
};

export function publish(receiver, message) {
  // const userId = useSelector(state => state.userId);
  client.publish({
    destination: '/app/ptp/single/chat',
    body: JSON.stringify({
      sender: '123', // username
      receiver: receiver, // 要寄給誰
      message: message, // 訊息
    }),
  });
}
export default websocket;
