import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import chats from '../../../components/data/Chats.json';
import {publish} from '../../Candidate/chat/component/Websocket';

const EmployerResumeDetailScreen = ({navigation, route}) => {
  const time = new Date();
  const user = useSelector(state => state.userId.userId);
  const otheruser = route.params.userID;
  const name =
    route.params.name != null
      ? route.params.name[0] + route.params.sex
      : '你好';
  console.log('name: ' + route.params.name);
  console.log('status: ' + route.params.shelvesStatus);

  const TextView = props => {
    return (
      <View style={{marginVertical: '3%'}}>
        <Text style={styles.text1}>
          {props.text} : {props.content}
        </Text>
      </View>
    );
  };
  const Textview = props => {
    return (
      <View style={{marginVertical: '3%'}}>
        <Text style={styles.text2}>{props.content}</Text>
      </View>
    );
  };

  function storeChatData() {
    Alert.alert('確認', '確認要聯絡應徵者嗎', [
      {
        text: 'Cancel!',
        onPress: () => {},
      },
      {
        text: 'OK',
        onPress: () => {
          publish(user, otheruser, 'hello', 'message');
          if (
            chats.filter(item => item.users[1].name == otheruser).length != 0
            // true
          ) {
            chats
              .filter(item => item.users[1].name == otheruser)[0]
              .messages.unshift({
                content: 'hello',
                createdAt: time.getTime(),
                name: user,
                type: 'message',
              });
          } else {
            chats.unshift({
              users: [
                {
                  name: user,
                  imageUri:
                    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
                },
                {
                  name: otheruser,
                  imageUri:
                    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
                },
              ],
              messages: [
                {
                  content: 'hello',
                  createdAt: time.getTime(),
                  name: user,
                  type: 'message',
                },
              ],
            });
          }

          AsyncStorage.setItem('@chatdata', JSON.stringify(chats));
        },
      },
    ]);
  }

  const openChatRoom = () => {
    storeChatData();
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.main}>
        <Text style={{fontSize: 28, color: 'black', paddingLeft: 15}}>
          {route.params.title}
        </Text>
      </View>
      <View style={{flex: 15}}>
        <ScrollView>
          <View style={styles.basic}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="person-outline" style={{fontSize: 30}} />
              <Text style={styles.text}>基本資料</Text>
            </View>
            <View style={styles.textview}>
              <TextView text={'姓名'} content={name} />
              <TextView text={'電話'} content={route.params.phoneNumber} />
              <TextView text={'信箱'} content={route.params.email} />
              <TextView text={'生日'} content={route.params.birth} />
            </View>
            <View style={styles.separater}></View>
          </View>

          <View style={styles.condition}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="book" style={{fontSize: 30}} />
              <Text style={styles.text}>自傳</Text>
            </View>
            <View style={styles.textview}>
              <Textview content={route.params.introduction} />
            </View>
            <View style={styles.separater}></View>
          </View>

          <View style={styles.condition}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="book" style={{fontSize: 30}} />
              <Text style={styles.text}>學經歷</Text>
            </View>
            <View style={styles.textview}>
              <TextView text={'就讀學校'} content={route.params.school} />
              <TextView text={'就讀科系'} content={route.params.department} />
              <TextView text={'就讀狀態'} content={route.params.status} />
            </View>
            <View style={styles.separater}></View>
          </View>

          <View style={styles.condition}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons name="work-outline" style={{fontSize: 30}} />
              <Text style={styles.text}>求職條件</Text>
            </View>
            <View style={styles.textview}>
              <View style={styles.icon}>
                <SimpleLineIcons name="briefcase" style={{fontSize: 20}} />
                <Text> </Text>
                <TextView text={'工作性質'} content={route.params.nature} />
              </View>
              <View style={styles.icon}>
                <Ionicons name="grid-outline" style={{fontSize: 20}} />
                <Text> </Text>
                <TextView text={'工作種類'} content={route.params.type} />
              </View>
              <View style={styles.icon}>
                <AntDesign name="clockcircleo" style={{fontSize: 20}} />
                <Text> </Text>
                <TextView text={'工作時段'} content={route.params.time} />
              </View>
              <View style={styles.icon}>
                <SimpleLineIcons name="location-pin" style={{fontSize: 20}} />
                <Text> </Text>
                <TextView text={'工作地區'} content={route.params.region} />
              </View>
              <View style={styles.icon}>
                <MaterialIcons name="attach-money" style={{fontSize: 20}} />
                <Text> </Text>
                <TextView text={'希望待遇'} content={route.params.salary} />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={views.submit}>
          <Pressable style={[styles.button]} onPress={() => openChatRoom()}>
            <Text style={styles.textStyle}>聯絡應徵者</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const views = StyleSheet.create({
  submit: {
    height: 50,
    justifyContent: 'center',
  },
  centeredView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  modalView: {
    width: '90%',
    height: '80%',
    margin: 20,
    backgroundColor: 'rgb(246,247,241)',
    borderRadius: 5,
    padding: 5,
    elevation: 30,
  },
});

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    width: '100%',
    paddingVertical: 7,
    paddingBottom: 10,
    flex: 1,
  },
  basic: {
    flex: 1,
    padding: '5%',
  },
  content: {
    flex: 1,
    padding: '5%',
  },
  condition: {
    flex: 1,
    padding: '5%',
  },
  textview: {
    padding: '5%',
  },
  text: {
    color: 'black',
    fontSize: 25,
  },
  text1: {
    color: 'black',
    fontSize: 15,
  },
  text2: {
    color: 'black',
    fontSize: 15,
    lineHeight: 30,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separater: {
    height: 0,
    width: '100%',
    borderTopWidth: 1,
    borderColor: 'gray',
    borderStyle: 'dashed',
  },
  textStyle: {
    fontSize: 18,
    padding: 3,
    color: 'white',
    backgroundColor: 'rgb(238,169,112)',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'rgb(238,169,112)',
    textAlign: 'center',
  },
});
export default EmployerResumeDetailScreen;
