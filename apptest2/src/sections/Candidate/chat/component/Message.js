import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import userIdSlice from '../../../../redux/userIdSlice';
import chats from '../../../../components/data/Chats.json';
import {color} from '@rneui/base';

const blue = 'blue';
const gray = 'lightgray';

// const myID = '123';
const Message = ({message}) => {
  const [modalVisible, setModalVisible] = useState(false);
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
    setModalVisible(true);
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={modalStyles.centeredView}>
              <View style={modalStyles.modalView}>
                <View
                  style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                  <AntDesign
                    name="close"
                    style={{fontSize: 20}}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  />
                </View>
                <DetailResume content={content} />
              </View>
            </View>
          </Modal>
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
const DetailResume = props => {
  return (
    <View style={{flex: 1}}>
      <View style={detailResumeStyle.main}>
        <FontAwesome name="star" style={{fontSize: 35, color: 'red'}} />
        <Text style={{fontSize: 28, color: 'black', paddingLeft: 15}}>
          {props.content.title}
        </Text>
      </View>
      <View style={{flex: 15}}>
        <ScrollView>
          <View style={detailResumeStyle.basic}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="person-outline" style={{fontSize: 30}} />
              <Text style={detailResumeStyle.text}>基本資料</Text>
            </View>
            <View style={detailResumeStyle.textview}>
              <TextView text={'姓名'} content={props.content.name} />
              <TextView text={'電話'} content={props.content.phoneNumber} />
              <TextView text={'信箱'} content={props.content.email} />
              <TextView text={'生日'} content={props.content.birth} />
            </View>
            <View style={detailResumeStyle.separater}></View>
          </View>

          <View style={detailResumeStyle.condition}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="book" style={{fontSize: 30}} />
              <Text style={detailResumeStyle.text}>自傳</Text>
            </View>
            <View style={detailResumeStyle.textview}>
              <Textview content={props.content.introduction} />
            </View>
            <View style={detailResumeStyle.separater}></View>
          </View>

          <View style={detailResumeStyle.condition}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="book" style={{fontSize: 30}} />
              <Text style={detailResumeStyle.text}>學經歷</Text>
            </View>
            <View style={detailResumeStyle.textview}>
              <TextView text={'就讀學校'} content={props.content.school} />
              <TextView text={'就讀科系'} content={props.content.department} />
              <TextView text={'就讀狀態'} content={props.content.status} />
            </View>
            <View style={detailResumeStyle.separater}></View>
          </View>

          <View style={detailResumeStyle.condition}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons name="work-outline" style={{fontSize: 30}} />
              <Text style={detailResumeStyle.text}>求職條件</Text>
            </View>
            <View style={detailResumeStyle.textview}>
              <View style={detailResumeStyle.icon}>
                <SimpleLineIcons name="briefcase" style={{fontSize: 20}} />
                <Text> </Text>
                <TextView text={'工作性質'} content={props.content.nature} />
              </View>
              <View style={detailResumeStyle.icon}>
                <Ionicons name="grid-outline" style={{fontSize: 20}} />
                <Text> </Text>
                <TextView text={'工作種類'} content={props.content.type} />
              </View>
              <View style={detailResumeStyle.icon}>
                <AntDesign name="clockcircleo" style={{fontSize: 20}} />
                <Text> </Text>
                <TextView text={'工作時段'} content={props.content.time} />
              </View>
              <View style={detailResumeStyle.icon}>
                <SimpleLineIcons name="location-pin" style={{fontSize: 20}} />
                <Text> </Text>
                <TextView text={'工作地區'} content={props.content.region} />
              </View>
              <View style={detailResumeStyle.icon}>
                <MaterialIcons name="attach-money" style={{fontSize: 20}} />
                <Text> </Text>
                <TextView text={'希望待遇'} content={props.content.salary} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const detailResumeStyle = StyleSheet.create({
  main: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    width: '100%',
    paddingVertical: 7,
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
});
const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,

    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

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
