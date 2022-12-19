import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchPage from './SearchPage';
import CJobDetailPage from './CJobDetailPage';
import TabBarController from '../../../components/TabBarController';
import {StackActions} from '@react-navigation/native';

const SearchScreenNavigator = ({navigation, route}) => {
  const Stack = createStackNavigator();
  TabBarController(navigation, route, 'CJobDetailPage');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="searchPage"
        component={SearchPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CJobDetailPage"
        component={CJobDetailPage}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchScreenNavigator;

const styles = StyleSheet.create({});
