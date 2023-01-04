import React, {useState} from 'react';
import {StyleSheet, View, Text, Switch} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Delete} from './ResumeMethod';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import {setResumeOrder} from '../../../redux/resumeOrderSlice';
import {setUserResumeData} from '../../../redux/userResumeDataSlice';

const InformationText = props => {
  const [shelvesStatus, setShelvesStatus] = useState(props.shelvesStatus);
  const statusChange = () => {
    setShelvesStatus(shelvesStatus => !shelvesStatus);
    const url =
      'http://tim.ils.tw:80/project/auth/Resumes/changeShelvesStatus/' +
      props.userId +
      '/' +
      props.createTime;
    console.log('url: ' + url);
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: 'Bearer ' + props.token,
      },
    };
    fetch(url, options);
  };

  return (
    <View style={styles.titleFreshtimeInformation}>
      <Text style={{fontSize: 25, color: 'black'}}>{props.title}</Text>
      <Text>更新時間: {props.refreshTime}</Text>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>履歷開啟狀態</Text>
        <View style={[{flexDirection: 'row'}, styles.statusBar]}>
          <Text style={styles.statusText}>
            {shelvesStatus ? '開啟中' : '關閉中'}
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={statusChange}
            value={shelvesStatus}
          />
        </View>
      </View>
    </View>
  );
};

const InformationButton = props => {
  const token = useSelector(state => state.token);
  const userId = useSelector(state => state.userId);
  const [createTime, setCreateTime] = useState(props.createTime);
  console.log('r: ' + JSON.stringify(props.resumeObject));
  const url = 'http://tim.ils.tw:80/project/auth/Resumes';
  return (
    <View style={styles.buttonContainer}>
      <View style={[styles.button, {borderRightWidth: 1}]}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('刪除', '確認要刪除履歷嗎', [
              {
                text: 'Cancel!',
                onPress: () => {},
              },
              {
                text: 'Ok!',
                onPress: async () => {
                  console.log(
                    'user = ' + userId.userId,
                    'createTime = ' + createTime,
                  );
                  const options = {
                    method: 'Delete',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json;charset=UTF-8',
                      Authorization: 'Bearer ' + token.token,
                    },
                    body: {},
                  };
                  await fetch(
                    url + '/' + userId.userId + '/' + createTime,
                    options,
                  );
                  props.setPageState(pageState => !pageState);
                },
              },
            ]);
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>刪除</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('AddResumes', {
              resumeObject: props.resumeObject,
              mode: 'modify',
            })
          }>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>修改</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function ResumeItem({navigation, dispatch}) {
  const [returnValue, setReturnValue] = useState('');
  const userId = useSelector(state => state.userId);
  const token = useSelector(state => state.token);
  const [pageState, setPageState] = useState(true);
  console.log(pageState);
  console.log('ResumeItem = ' + userId.userId);

  useEffect(() => {
    const url =
      'http://tim.ils.tw:80/project/auth/Resumes/getUserResumes/' +
      userId.userId;
    console.log('url: ' + url);
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: 'Bearer ' + token.token,
      },
    };
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        dispatch(setUserResumeData({userResumeData: data}));
        let a = data.map((information, index) => (
          <View key={index} style={styles.container}>
            <InformationText
              userId={userId.userId}
              token={token.token}
              createTime={information.createTime}
              title={information.title}
              refreshTime={information.refreshTime}
              shelvesStatus={information.shelvesStatus}
            />
            <InformationButton
              user={information.name}
              createTime={information.createTime}
              resumeObject={data[index]}
              setPageState={setPageState}
              navigation={navigation}
            />
          </View>
        ));
        console.log('data123: ' + JSON.stringify(data));
        setReturnValue(a);
      });
  }, [pageState]);

  return returnValue;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(246,247,241)',
    marginHorizontal: 10,
    elevation: 5,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderTopWidth: 4,
    borderColor: 'rgb(130, 180, 169)',
  },
  titleFreshtimeInformation: {
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
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    color: 'black',
  },
});
