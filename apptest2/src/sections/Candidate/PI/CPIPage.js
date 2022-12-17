import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const CPIPage = ({navigation}) => {
  const onPressSwitchMode = () => {
    navigation.replace('employerPage');
  };
  const onPressLogout = () => {
    navigation.replace('loginPage');
  };
  const onPressCollect = () => {
    navigation.navigate('CPICollectionPage');
  };
  const username = useSelector(state => state.username);
  return (
    <View style={{flex: 1}}>
      <Text>{username.username}</Text>
      <TouchableOpacity style={styles.buttons} onPress={onPressSwitchMode}>
        <Text style={styles.buttonText}>切換為雇主模式</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} onPress={onPressCollect}>
        <Text style={styles.buttonText}>收藏</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} onPress={onPressLogout}>
        <Text style={styles.buttonText}>登出</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CPIPage;

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#555',
    backgroundColor: '#d1ddf9',
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
