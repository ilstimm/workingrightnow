import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  Button,
  TextInput,
  View,
  Alert,
  Nevigator,
} from 'react-native';
import ChatRoomItem from './ChatRoomItem';
import ChatRoomsData from '../assets/ChatRooms';
import ChatRoomScreen from './ChatRoomScreen';
var stompClient = null;

const chatRoom1 = ChatRoomsData[5];

const ChatRoom = ({navigation}) => {
  return (
    <View style={styles.page}>
      <FlatList
        data={ChatRoomsData}
        renderItem={props => (
          <ChatRoomItem navigation={navigation} chatRoom={props.item} />
        )}
        // ListHeaderComponent = {() => <Text style = { styles.header }>聊天室</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    fontWeight: '800',
    fontSize: 30,
    alignSelf: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
  },
});

export default ChatRoom;
