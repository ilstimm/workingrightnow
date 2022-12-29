import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Modal,
  Pressable,
  SafeAreaView,
  Alert,
  Switch,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {CommonActions, StackActions} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const InformationText = props => {
  const [resumeState, setResumeState] = React.useState(false);
  const toggleSwitch = () => setResumeState(previousState => !previousState);
  return (
    <View style={styles.titleFreshtimeInformation}>
      <View style={{justifyContent: 'center'}}>
        <Text style={{fontSize: 25}}>{props.title}</Text>
        <Text>更新時間: {props.refreshTime}</Text>
      </View>
      <RadioButton value={props.index} />
    </View>
  );
};

const CJobDetailPage = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const information = useSelector(state => state.userResumeData.userResumeData);
  const name =
    route.params.name != null
      ? route.params.name[0] + route.params.sex
      : '你好';
  console.log('name: ' + route.params.name);

  const [value, setFocus] = React.useState('first'); // 履歷radio button
  const [isEmpty, setIsEmpty] = React.useState(true); // 履歷是否為空

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.main}>
        <FontAwesome name="star" style={{fontSize: 35, color: 'red'}} />
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
            <View style={styles.basic}>
              <TextView text={'雇主稱呼'} content={name} />
              <TextView text={'電話'} content={route.params.phoneNumber} />
              <TextView text={'信箱'} content={route.params.email} />
            </View>
            <View style={styles.separater}></View>
          </View>
          <View style={styles.basic}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="content-paste"
                style={{fontSize: 30}}
              />
              <Text style={styles.text}>工作內容</Text>
            </View>
            <View style={styles.basic}>
              <Textview content={route.params.content} />
            </View>
            <View style={styles.separater}></View>
          </View>
          <View style={styles.basic}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons name="work-outline" style={{fontSize: 30}} />
              <Text style={styles.text}>工作資訊</Text>
            </View>
            <View style={styles.basic}>
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
                <TextView text={'薪資'} content={route.params.salary} />
              </View>
            </View>
            <View style={styles.separater}></View>
          </View>
          <View style={styles.basic}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons name="work-outline" style={{fontSize: 30}} />
              <Text style={styles.text}>支薪</Text>
            </View>
            <View style={styles.basic}>
              <View style={styles.icon}>
                <MaterialCommunityIcons
                  name="hand-coin-outline"
                  style={{fontSize: 20}}
                />
                <Text> </Text>
                <TextView
                  text={'支薪方式'}
                  content={route.params.salaryMethod}
                />
              </View>
              <View style={styles.icon}>
                <MaterialIcons name="date-range" style={{fontSize: 20}} />
                <Text> </Text>
                <TextView text={'支薪日'} content={route.params.salaryDate} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={views.submit}>
        <Pressable
          style={[styles.button]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>我要應徵</Text>
        </Pressable>
      </View>
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={views.centeredView}>
            <View style={views.modalView}>
              <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                <AntDesign
                  name="close"
                  style={{fontSize: 20}}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                />
              </View>
              <ScrollView>
                <RadioButton.Group
                  onValueChange={value => setFocus(value)}
                  value={value}>
                  {information.map((information, index) => (
                    <View key={index} style={styles.resumeListContainer}>
                      <InformationText
                        title={information.title}
                        refreshTime={information.refreshTime}
                        index={index}
                      />
                      {/* <InformationButton
                          user={information.name}
                          createTime={information.createTime}
                          resumeObject={data[index]}
                          /> */}
                    </View>
                  ))}
                </RadioButton.Group>
              </ScrollView>

              <View style={styles.sendResumeButton}>
                <Pressable
                  // style={[styles.button]}
                  onPress={() => console.log('新增履歷')}>
                  <AntDesign name="addfile" style={{fontSize: 30}} />
                </Pressable>
                <Text>{isEmpty ? '履歷空空如也~' : null}</Text>
                <Pressable
                  // style={[styles.button]}
                  onPress={() => console.log('送出履歷')}>
                  <Text style={[styles.textStyle]}>送出履歷</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
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

  button: {
    marginHorizontal: 3,
    borderRadius: 3,
  },
  buttonOpen: {
    backgroundColor: 'rgb(49, 110, 99)',
  },
  buttonClose: {
    height: 50,
    marginHorizontal: 5,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    fontSize: 18,
    padding: 3,
    color: 'white',
    backgroundColor: 'rgb(49, 110, 99)',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  resumeListContainer: {
    backgroundColor: 'rgb(246,247,241)',
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
    marginTop: 10,
    borderWidth: 1,
    borderTopWidth: 4,
    borderColor: 'rgb(130, 180, 169)',
  },
  titleFreshtimeInformation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'rgb(130, 180, 169)',
    textAlign: 'center',
  },

  statusText: {
    color: 'black',
  },
  sendResumeButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});
export default CJobDetailPage;
