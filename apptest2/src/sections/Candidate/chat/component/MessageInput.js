import React, {useContext, useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, TextInput, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import chatData from '../assets/Chats';
import {RefreshContext} from './ChatRoomScreen';
import {publish} from './Websocket';

const MessageInput = props => {
  const userId = useSelector(state => state.userId);
  const [message, setMessage] = useState('');
  const [time, setTime] = useState(new Date());
  const dispatch = useContext(RefreshContext);
  console.log('123456: ' + props.user);

  const sendMessage = () => {
    // setMessage('');
    // console.log('send', message);
    publish(props.user, message);
    chatData
      .filter(item => item.users[1].name == props.user)[0]
      .messages.unshift({
        content: message,
        createdAt: time.getTime(),
        name: userId.userId,
      });
    setMessage('');
    props.refresh();
  };
  const onPlusClicked = () => {
    console.log('plus');
  };

  const onPress = () => {
    if (message) {
      sendMessage();
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
};
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
export default MessageInput;
