import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginContainer from './LoginContainer';
import CandidateContainer from './CandidateContainer';
import EmployerContainer from './EmployerContainer';
import SignUpContainer from './SignUpContainers';

const MainStackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="loginPage"
        component={LoginContainer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="signUpPage"
        component={SignUpContainer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="candidatePage"
        component={CandidateContainer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="employerPage"
        component={EmployerContainer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
