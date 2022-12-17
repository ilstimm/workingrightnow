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

          if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'Chat') {
            iconName = 'chatbubble-ellipses-outline';
          } else if (route.name === 'ScResume') {
            iconName = 'document-outline';
          } else if (route.name === '我是應徵者') {
            iconName = 'person';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Search" component={SearchScreenNavigator} />
      <Tab.Screen name="Chat" component={ChatPage} />
      <Tab.Screen name="ScResume" component={ScanNavigator} />
      <Tab.Screen name="我是應徵者" component={PINavigator} />
    </Tab.Navigator>
  );
};

export default CandidateContainer;

const styles = StyleSheet.create({});
