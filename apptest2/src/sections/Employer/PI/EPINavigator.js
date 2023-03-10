import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabBarController from '../../../components/TabBarController';
import EPICollectionPage from './EPICollectionPage';
import EmployerResumeDetailScreen from '../search/EmployerResumeDetailScreen';
import EPIPage from './EPIPage';
const EPINavigator = ({navigation, route}) => {
  const Stack = createStackNavigator();
  TabBarController(navigation, route, 'EmployerResumeDetailScreen');
  return (
    <Stack.Navigator initialRoutName="EPIPage">
      <Stack.Screen
        name="EPIPage"
        component={EPIPage}
        options={{
          headerLeft: () => null,
          title: '個人資訊',
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: 'rgb(238,169,112)',
          },
        }}
      />
      <Stack.Screen
        name="EPICollectionPage"
        component={EPICollectionPage}
        options={{
          title: '收藏',
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: 'rgb(238,169,112)',
          },
        }}
      />
      <Stack.Screen
        name="EmployerResumeDetailScreen"
        component={EmployerResumeDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default EPINavigator;

const styles = StyleSheet.create({});
