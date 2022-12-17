import React, {useState} from 'react';
import {StyleSheet, View, Text, Switch} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {Alert} from 'react-native';

export default function InformationItem({navigation}) {
  const [returnValue, setReturnValue] = useState('');
  const username = useSelector(state => state.username);
  const token = useSelector(state => state.token);
  const [pageState, setPageState] = useState(true);
  console.log(pageState);
  console.log('JobItem = ' + token.token);

  const InformationText = props => {
    const [jobState, setJobState] = useState(false);
    const toggleSwitch = () => setJobState(previousState => !previousState);
    return (
      <View>
        <Text style={{fontSize: 25}}>{props.title}</Text>
        <Text>更新時間: {props.refreshTime}</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={jobState ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={jobState}
        />
      </View>
    );
  };

  const InformationButton = props => {
    const token = useSelector(state => state.token);
    const [user, setUser] = useState(props.user);
    const [createTime, setCreateTime] = useState(props.createTime);
    const url = 'http://localhost:8080/auth/Jobs';
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          // flexWrap: 'wrap',
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert('刪除', '確認要刪除需求嗎', [
              {
                text: 'Cancel!',
                onPress: () => {},
              },
              {
                text: 'Ok!',
                onPress: async () => {
                  console.log('user = ' + user, 'createTime = ' + createTime);
                  const options = {
                    method: 'Delete',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json;charset=UTF-8',
                      Authorization: 'Bearer ' + token.token,
                    },
                    body: {},
                  };
                  await fetch(url + '/' + user + '/' + createTime, options);
                  setPageState(pageState => !pageState);
                },
              },
            ]);
          }}>
          <Text style={{fontSize: 30}}>刪除</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddJobs', props.jobObject)}>
          <Text style={{fontSize: 30}}>修改</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    const url = 'http://localhost:8080/auth/Jobs/' + username.username;
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
        let a = data.map((information, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#ff6',
              marginLeft: 10,
              marginRight: 10,
              elevation: 20,
              marginTop: 10,
              borderWidth: 2,
              borderColor: 'gray',
            }}>
            <InformationText
              title={information.title}
              refreshTime={information.refreshTime}
            />
            <InformationButton
              user={information.user}
              createTime={information.createTime}
              jobObject={data[index]}
            />
          </View>
        ));
        console.log('data: ' + JSON.stringify(data[0]));
        setReturnValue(a);
      });
  }, [pageState]);

  return returnValue;
}

const styles = StyleSheet.create({
  button: {
    width: 160.3,
    height: 60,
    alignItems: 'center',
    borderWidth: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
});
