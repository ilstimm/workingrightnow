import React, {useState, createContext, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
// import chatDatas from '../assets/Chats';

import {Client} from '@stomp/stompjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
const client = new Client();
const websocket = (account) => {
  let value;
  const time = new Date();
  client.configure({
    brokerURL: 'http://tim.ils.tw:80/project/chat',
    onConnect: () => {
      console.log('connect');
      console.log('account=   '+ account)
      client.subscribe(
        '/chat/single/' + account, // /chat/single/ + username
        async message => {
          value = JSON.parse(await AsyncStorage.getItem('@chatdata'));
          let data = JSON.parse(message.body);
          console.log(data); // 收到訊息之後要做的事
          value
          .filter(item => item.users[1].name == data.sender)[0]
          .messages.unshift({
            content: data.message,
            createdAt: time.getTime(),
            name: data.sender,
          });

          console.log('chatdata156498:  ' + JSON.stringify(value));
          AsyncStorage.setItem('@chatdata', JSON.stringify(value));
        },
        {},
      );
    },
    debug: function (str) {
      console.log("str = " + str);
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
  console.log("###############");
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