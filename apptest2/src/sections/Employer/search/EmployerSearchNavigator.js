import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EmployerSearchScreen from './EmployerSearchScreen';
import EmployerResumeDetailScreen from './EmployerResumeDetailScreen';
import TabBarController from '../../../components/TabBarController';
const EmployerSearchNavigator = ({navigation, route}) => {
  const Stack = createStackNavigator();
  TabBarController(navigation, route, 'resumeDetailScreen');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="employerSearchScreen"
        component={EmployerSearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="resumeDetailScreen"
        component={EmployerResumeDetailScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default EmployerSearchNavigator;

const styles = StyleSheet.create({});
