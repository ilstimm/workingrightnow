import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, TextInput, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {RefreshContext} from './ChatRoomScreen';
import {publish} from './Websocket';

export default function MessageInput(props) {
  const userId = useSelector(state => state.userId); //自己
  const [message, setMessage] = useState('');
  const [time, setTime] = useState(new Date());
  const [chatData, setChatData] = useState([]);

  useLayoutEffect(() => {
    getChatData();
  }, []);

  async function getChatData() {
    try {
      const result = await AsyncStorage.getItem('@chatdata');
      setChatData(JSON.parse(result));
      // console.log('chatdata1111:  ' + JSON.stringify(chatData));
    } catch (error) {}
  }

  const sendMessage = async message => {
    publish(userId.userId, props.otheruser, message);
    let value = JSON.parse(await AsyncStorage.getItem('@chatdata'));

    value
      .filter(item => item.users[1].name == props.otheruser)[0]
      .messages.unshift({
        content: message,
        createdAt: time.getTime(),
        name: userId.userId,
      });

    storeChatData(value);
    setMessage('');
    props.refresh();
  };

  async function storeChatData(value) {
    try {
      await AsyncStorage.setItem('@chatdata', JSON.stringify(value));
    } catch (error) {}
  }

  const onPlusClicked = () => {
    console.log('plus');
  };

  const onPress = () => {
    if (message) {
      sendMessage(message);
    } else {
      onPlusClicked();
    }
  };
  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          maxLine
          multiline={true}
          value={message}
          onChangeText={setMessage}
          placeholder="type here..."
        />
      </View>

      <Pressable onPress={onPress} style={styles.buttonContainer}>
        {message ? (
          <Text style={{color: 'white', fontWeight: 'bold'}}>Send</Text>
        ) : (
          <Text style={styles.buttonText}>+</Text>
        )}
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    padding: 10,
  },
  inputContainer: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#dedede',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 35,
  },
});
// export default MessageInput;

export function onRefresh2() {}
