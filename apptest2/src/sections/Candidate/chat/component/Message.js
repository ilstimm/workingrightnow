import React from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from 'react-native';

const blue = 'blue';
const gray = 'lightgray';

const myID = '123';
const Message = ({message}) => {
  // console.log('message:  ' + JSON.stringify(message));
  const isMe = message.name === myID;

  return (
    <View
      style={[
        styles.container,
        isMe ? styles.containerRight : styles.containerLeft,
      ]}>
      <Text style={{color: isMe ? 'black' : 'white'}}>{message.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
  containerLeft: {
    backgroundColor: blue,
    marginLeft: 10,
    marginRight: 'auto',
  },
  containerRight: {
    backgroundColor: gray,
    marginLeft: 'auto',
    marginRight: 10,
  },
  text: {
    color: 'white',
  },
});
export default Message;
