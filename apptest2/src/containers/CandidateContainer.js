import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchScreenNavigator from '../sections/Candidate/search/SearchScreenNavigator';
import ScanNavigator from '../sections/Candidate/myResume/ResumelistNavigator';
import ChatPage from '../sections/Candidate/chat/ChatPage';
import PINavigator from '../sections/Candidate/PI/CPINavigator';

const Tab = createBottomTabNavigator();
const CandidateContainer = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === '搜尋') {
            iconName = 'search-outline';
          } else if (route.name === '聊天室') {
            iconName = 'chatbubble-ellipses-outline';
          } else if (route.name === '我的履歷') {
            iconName = 'document-outline';
          } else if (route.name === '我是應徵者') {
            iconName = 'person';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'rgb(130, 180, 169)',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="搜尋" component={SearchScreenNavigator} />
      <Tab.Screen name="聊天室" component={ChatPage} />
      <Tab.Screen name="我的履歷" component={ScanNavigator} />
      <Tab.Screen name="我是應徵者" component={PINavigator} />
    </Tab.Navigator>
  );
};

export default CandidateContainer;

const styles = StyleSheet.create({});
