import React, {useState, createContext, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import chats from '../../../../components/data/Chats.json';
// import chatDatas from '../assets/Chats';

import {Client} from '@stomp/stompjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
const client = new Client();
const websocket = account => {
  let value;
  const time = new Date();
  client.configure({
    brokerURL: 'http://tim.ils.tw:80/project/chat',
    onConnect: () => {
      client.publish({
        destination: '/app/chat/addUser/' + account,
      });
      console.log('connect');
      console.log('account=   ' + account);
      client.subscribe(
        '/chat/single/' + account, // /chat/single/ + username
        async message => {
          // value = JSON.parse(await AsyncStorage.getItem('@chatdata'));
          let data = JSON.parse(message.body);
          console.log('receiverdata= ' + data); // 收到訊息之後要做的事
          console.log('chats=  ' + JSON.stringify(chats));
          if (
            chats.filter(item => item.users[1].name == data.sender).length != 0
            // true
          ) {
            chats
              .filter(item => item.users[1].name == data.sender)[0]
              .messages.unshift({
                content:
                  data.type == 'resume'
                    ? JSON.parse(data.message)
                    : data.message,
                createdAt: time.getTime(),
                name: data.sender,
                type: data.type,
              });
          } else {
            chats.unshift({
              users: [
                {
                  name: account,
                  imageUri:
                    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
                },
                {
                  name: data.sender,
                  imageUri:
                    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
                },
              ],
              messages: [
                {
                  content:
                    data.type == 'resume'
                      ? JSON.parse(data.message)
                      : data.message,
                  createdAt: data.createTime,
                  name: data.sender,
                  type: data.type,
                },
              ],
            });
          }

          // refresh();
          console.log('chatdata156498:  ' + JSON.stringify(chats));
          AsyncStorage.setItem('@chatdata', JSON.stringify(chats));
        },
        {},
      );
    },
    debug: function (str) {
      console.log('str = ' + str);
    },
    connectHeaders: {},

    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });
  client.forceBinaryWSFrames = true;
  client.activate();
};

export function publish(sender, receiver, message, type) {
  console.log('###############');
  client.publish({
    destination: '/app/ptp/single/chat',
    body: JSON.stringify({
      sender: sender, // username
      receiver: receiver, // 要寄給誰
      message: message, // 訊息
      type: type,
      createTime: '123',
    }),
  });
}

export function logout() {
  client.onWebSocketClose();
}
export default websocket;