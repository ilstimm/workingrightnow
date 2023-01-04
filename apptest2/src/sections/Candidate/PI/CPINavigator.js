import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabBarController from '../../../components/TabBarController';
import CPICollectionPage from './CPICollectionPage';
import CPIPage from './CPIPage';
import CJobDetailPage from '../search/CJobDetailPage';
const CPINavigator = ({navigation, route}) => {
  const Stack = createStackNavigator();
  TabBarController(navigation, route, 'CJobDetailPage');
  // TabBarController(navigation, route, 'CPICollectionPage');

  return (
    <Stack.Navigator initialRouteName="CPIPage">
      <Stack.Screen
        name="CPIPage"
        component={CPIPage}
        options={{
          headerLeft: () => null,
          title: '個人資訊',
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: 'rgb(90,148,148)',
          },
        }}
      />
      <Stack.Screen
        name="CPICollectionPage"
        component={CPICollectionPage}
        options={{
          title: '收藏',
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: 'rgb(90,148,148)',
          },
        }}
      />
      <Stack.Screen name="CJobDetailPage" component={CJobDetailPage} />
    </Stack.Navigator>
  );
};

export default CPINavigator;

const styles = StyleSheet.create({});
