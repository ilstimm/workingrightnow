import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabBarController from '../../../components/TabBarController';
import CPICollectionPage from './CPICollectionPage';
import CPIPage from './CPIPage';
const CPINavigator = ({navigation, route}) => {
  const Stack = createStackNavigator();
  TabBarController(navigation, route, 'CPICollectionPage');
  return (
    <Stack.Navigator initialRoutName="PIPage">
      <Stack.Screen
        name="CPIPage"
        component={CPIPage}
        options={{headerLeft: () => null}}
      />
      <Stack.Screen name="CPICollectionPage" component={CPICollectionPage} />
    </Stack.Navigator>
  );
};

export default CPINavigator;

const styles = StyleSheet.create({});
