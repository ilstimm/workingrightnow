import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabBarController from '../../../components/TabBarController';
import JoblistPage from './JoblistPage';
import AddJobs from './AddJobs';

const JoblistNavigator = ({navigation, route}) => {
  const Stack = createStackNavigator();
  TabBarController(navigation, route, 'AddJobs');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="JoblistPage"
        component={JoblistPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddJobs"
        component={AddJobs}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default JoblistNavigator;

const styles = StyleSheet.create({});
