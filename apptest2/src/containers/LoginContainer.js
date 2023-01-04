import React, {useState, createContext, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setUserId} from '../redux/userIdSlice';
import {setToken} from '../redux/tokenSlice';
import md5 from 'react-native-md5';
import websocket from '../sections/Candidate/chat/component/Websocket';
import {ScrollView} from 'react-native-gesture-handler';
import userResumeDataInitial from './userResumeInitial';
import chatDataInitial from './chatDataInitial';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginContainer = ({navigation}) => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onPressLogin = async () => {
    {
      console.log('account: ' + account);
    }
    {
      console.log('password: ' + password);
    }
    dispatch(setUserId({userId: account}));
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        userID: account,
        password: md5.b64_md5(password),
      }),
    };
    const url = 'http://tim.ils.tw:80/project/login';
    const tokenResponse = await fetch(url, options);
    if(tokenResponse.status == 400){
      Alert.alert('錯誤!', '密碼錯誤!', [
            {
              text: 'Ok',
            },
          ]);
    }else if(tokenResponse.status == 404){
      Alert.alert('錯誤!', '帳號不存在!', [
        {
          text: 'Ok',
        },
      ]);
    }else if(tokenResponse.status == 200){
      const tokenObject = await tokenResponse.json();
        dispatch(setToken({token: tokenObject.token}));
        userResumeDataInitial(account, tokenObject.token, dispatch);
        chatDataInitial(account, tokenObject.token);
        websocket(account);
        navigation.replace('candidatePage');
    }
  };
  const onPressRegister = () => {
    navigation.navigate('signUpPage');
  };
  const forgotPassword = () => {
    console.log('forgotPassword!');
  };

  const onPressDelete = () => {
    Alert.alert('確認!', '確認要刪除資料嗎!', [
      {
        text: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => {
          AsyncStorage.removeItem('@chatdata');
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Image
        source={require('../assets/theme-2.png')}
        style={styles.themeImage}
      />
      <Text style={styles.appName}>馬上上工</Text>
      <TextInput
        placeholder="Account"
        style={styles.input}
        onChangeText={value => setAccount(value)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
        onChangeText={value => setPassword(value)}
      />
      <Text style={styles.loginButton} onPress={onPressLogin}>
        Log in
      </Text>
      <Text style={styles.loginButton} onPress={onPressDelete}>
        清除資料
      </Text>
      <Text style={styles.forgotPassword} onPress={forgotPassword}>
        Forgot Password?
      </Text>
      <View style={styles.sign}>
        <Text>
          Don't have account?
          <Text style={styles.signButton} onPress={onPressRegister}>
            Sign Up
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'rgb(246,247,241)',
    alignItems: 'center',
  },
  themeImage: {
    marginTop: 50,
    width: 150,
    height: 150,
  },
  input: {
    paddingLeft: 20,
    width: '80%',
    borderRadius: 15,
    backgroundColor: '#ECECEC',
    margin: 10,
  },
  appName: {
    color: 'black',
    fontSize: 26,
    marginBottom: 50,
  },
  loginButton: {
    borderRadius: 20,
    color: 'white',
    width: '80%',
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
    margin: 5,
    backgroundColor: 'rgb(49, 110, 99)',
  },
  forgotPassword: {
    marginTop: 15,
  },
  signButton: {
    fontWeight: 'bold',
  },
  sign: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 45,
  },
});

export default LoginContainer;
