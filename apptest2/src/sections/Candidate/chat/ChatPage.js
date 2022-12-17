import React, {Component, useEffect, useState} from 'react';

import {Text, View, StyleSheet, Image} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ChatRoom from './component/ChatRoom';
import ChatRoomScreen from './component/ChatRoomScreen';
import TabBarController from '../../../components/TabBarController';

const ChatPage = ({navigation, route}) => {
  const Stack = createStackNavigator();
  TabBarController(navigation, route, 'ChatRoomScreen');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{headerTitle: ChatRoomHeader}}
      />
      <Stack.Screen
        name="ChatRoomScreen"
        component={ChatRoomScreen}
        options={{headerTitle: ChatRoomHeader}}
      />
    </Stack.Navigator>
  );
};

const ChatRoomHeader = props => {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',

        padding: 10,
        // alignItems: 'center',
        // backgroundColor: 'red'
      }}>
      <Text
        style={{
          flex: 1,
          textAlign: 'center',
          // alignSelf: 'center',
          // marginLeft: 50,
          fontSize: 25,
          fontWeight: 'bold',
        }}>
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default ChatPage;
