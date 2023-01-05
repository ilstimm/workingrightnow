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

          if (route.name === '搜尋') {
            iconName = 'search-outline';
          } else if (route.name === '聊天室') {
            iconName = 'chatbubble-ellipses-outline';
          } else if (route.name === '工作需求') {
            iconName = 'document-outline';
          } else if (route.name === '我是雇主') {
            iconName = 'person';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarActiveBackgroundColor: 'rgb(238,169,112)',
        tabBarInactiveTintColor: 'rgb(238,169,112)',
      })}>
      <Tab.Screen name="搜尋" component={EmployerSearchNavigator} />
      <Tab.Screen name="聊天室" component={ChatPage} />
      <Tab.Screen name="工作需求" component={JoblistNavigator} />
      <Tab.Screen name="我是雇主" component={EPINavigator} />
    </Tab.Navigator>
  );
};

export default EmployerContainer;

const styles = StyleSheet.create({});
