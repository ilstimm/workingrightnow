import React, {useState, createContext, useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './containers/MainStackNavigator';
import {Provider} from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
      {/* {/* <AddInformations />
      {/* <SignUpPage /> */}
    </Provider>
    // <LoginPage />
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginbtn: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
  },
});

export default App;
