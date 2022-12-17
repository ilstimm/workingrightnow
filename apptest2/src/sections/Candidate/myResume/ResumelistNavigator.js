import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabBarController from '../../../components/TabBarController';
import ResumelistPage from './ResumelistPage';
import AddResumes from './AddResumes';

const ResumeNavigator = ({navigation, route}) => {
  const Stack = createStackNavigator();
  TabBarController(navigation, route, 'AddResumes');

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ResumelistPage"
        component={ResumelistPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddResumes"
        component={AddResumes}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default ResumeNavigator;

const styles = StyleSheet.create({});
