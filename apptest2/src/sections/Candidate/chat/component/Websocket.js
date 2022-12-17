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
const client = new Client();
const websocket = () => {
  const time = new Date();
  client.configure({
    brokerURL: 'http://localhost:8080/chat',
    onConnect: () => {
      console.log('connect');
      client.subscribe(
        '/chat/single/Vadim', // /chat/single/ + username
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

export function publish(sender, receiver, message) {
  client.publish({
    destination: '/app/ptp/single/chat',
    body: JSON.stringify({
      sender: sender, // username
      receiver: receiver, // 要寄給誰
      message: message, // 訊息
    }),
  });
}
export default websocket;
