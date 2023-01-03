import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EmployerSearchNavigator from '../sections/Employer/search/EmployerSearchNavigator';
import JoblistNavigator from '../sections/Employer/Joblist/JoblistNavigator';
import EPINavigator from '../sections/Employer/PI/EPINavigator';
import ChatPage from '../sections/Candidate/chat/ChatPage';

const Tab = createBottomTabNavigator();
const EmployerContainer = () => {
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
          } else if (route.name === 'Joblist') {
            iconName = 'document-outline';
          } else if (route.name === '我是雇主') {
            iconName = 'person';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Search" component={EmployerSearchNavigator} />
      <Tab.Screen name="Chat" component={ChatPage} />
      <Tab.Screen name="Joblist" component={JoblistNavigator} />
      <Tab.Screen name="我是雇主" component={EPINavigator} />
    </Tab.Navigator>
  );
};

export default EmployerContainer;

const styles = StyleSheet.create({});
