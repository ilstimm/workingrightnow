import React, {useState, createContext, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {Client} from '@stomp/stompjs';
import {useSelector} from 'react-redux';
import {useLayoutEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const client = new Client();
let value;

export async function websocket(account) {
  // let chatData;
  const time = new Date();
  // const user =
  console.log('account1223: ' + JSON.stringify(account));
  client.configure({
    brokerURL: 'http://tim.ils.tw:80/project/chat',
    forceBinaryWSFrames: true,
    appendMissingNULLonIncoming: true,
    onConnect: async () => {
      // const userId = useSelector(state => state.userId);
      console.log('connect');

      client.subscribe(
        'chat/single/123', // /chat/single/ + username
        async message => {
          value = JSON.parse(await AsyncStorage.getItem('@chatdata'));
          let data = JSON.parse(message.body);
          console.log('聊天訊息: ' + JSON.stringify(data)); // 收到訊息之後要做的事
          // console.log(
          //   'value:  ' +
          //     JSON.stringify(
          //       JSON.parse(value).filter(
          //         item => item.users[1].name == data.sender,
          //       )[0].messages,
          //     ),
          // );
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
      console.log(str);
    },
    connectHeaders: {},

    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });
  client.forceBinaryWSFrames = true;
  client.activate();
}

export function publish(receiver, message, userId) {
  // const userId = useSelector(state => state.userId);
  client.publish({
    destination: 'app/ptp/single/chat',
    body: JSON.stringify({
      sender: userId, // username
      receiver: receiver, // 要寄給誰
      message: message, // 訊息
    }),
  });
}
