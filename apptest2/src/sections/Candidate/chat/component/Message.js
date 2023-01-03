import React from 'react';
import {useEffect} from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import userIdSlice from '../../../../redux/userIdSlice';
import chats from '../../../../components/data/Chats.json';
import {color} from '@rneui/base';

const blue = 'blue';
const gray = 'lightgray';

// const myID = '123';
const Message = ({message}) => {
  const myID = useSelector(state => state.userId.userId);
  const isMe = message.name === myID; //是不是使用者
  const type = message.type; //訊息的種類(履歷、時間、文字)
  const content = message.content; //訊息內容

  useEffect(() => {
    console.log('====================================');
    console.log('message:  ' + JSON.stringify(content));
    console.log('====================================');
  }, [chats]);

  const checkResume = () => {
    console.log('resumedetail');
  };

  if (type == 'message') {
    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.containerRight : styles.containerLeft,
        ]}>
        <Text style={{color: isMe ? 'black' : 'white'}}>{message.content}</Text>
      </View>
    );
  } else if (type == 'resume') {
    return (
      <View
        style={[
          styles.resumeContainer,
          isMe ? styles.resumeRight : styles.resumeLeft,
        ]}>
        <Text style={{color: 'black'}}>
          {/* {message.content.title} */}
          {'name:' + content.name + '來應徵囉'}
        </Text>
        <View>
          <Text style={{color: 'orange'}} onPress={checkResume}>
            {'查看應徵資料'}
          </Text>
          <Text>{'應徵者姓名:' + content.name}</Text>
          <Text>{'自我介紹:' + content.introduction}</Text>
        </View>
      </View>
    );
  } else if (type == 'interview') {
  }
  // else {
  //   return (
  //     <View
  //       style={[
  //         styles.container,
  //         isMe ? styles.containerRight : styles.containerLeft,
  //       ]}>
  //       <Text style={{color: isMe ? 'black' : 'white'}}>{message.content}</Text>
  //     </View>
  //   );
  // }
};

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
  resumeContainer: {
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '50%',
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
  resumeLeft: {
    backgroundColor: '#cccccccc',
    marginLeft: 10,
    marginRight: 'auto',
  },
  resumeRight: {
    backgroundColor: '#cccccccc',
    marginLeft: 'auto',
    marginRight: 10,
  },
  text: {
    color: 'white',
  },
});
export default Message;
