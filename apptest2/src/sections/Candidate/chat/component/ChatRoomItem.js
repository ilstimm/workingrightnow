import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  Button,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';

const ChatRoomItem = ({navigation, chatRoom}) => {
  const otheruser = chatRoom.users[1].name; //對方
  // console.log('otheruser:  ' + otheruser);
  // console.log('storechatRoomdata: ' + JSON.stringify(chatRoom));

  const onPress = () => {
    navigation.navigate('ChatRoomScreen', {
      chatRoom: chatRoom,
      messages: chatRoom.messages,
      otheruser: otheruser,
    });
    // console.log('press', chatRoom.id);
    // navigation.navigate('ChatRoom', id: chatRoom.id);
  };

  return (
    <>
      {otheruser != '' ? (
        <Pressable onPress={onPress} style={styles.container}>
          <Image
            source={require('../assets/userimage.jpg')}
            style={styles.image}
          />
          {/* {chatRoom.newMessages ? (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
    </View>
  ) : null} */}
          <View style={styles.rightContainer}>
            <View style={styles.row}>
              <Text style={styles.name}>{otheruser}</Text>
              {/* <Text style={styles.text}>{chatRoom.lastMessage.createdAt}</Text> */}
            </View>
            <Text numberOfLines={1} style={styles.text}>
              {/* {chatRoom.lastMessage.content} */}
            </Text>
          </View>
        </Pressable>
      ) : (
        <></>
      )}
    </>
  );

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    // backgroundColor: 'red',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  badgeContainer: {
    backgroundColor: '#3872E9',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 45,
    top: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
  rightContainer: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: 'gray',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
});
export default ChatRoomItem;
