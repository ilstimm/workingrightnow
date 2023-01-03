import * as React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import md5 from 'react-native-md5';
import {useSelector} from 'react-redux';

const InputView = props => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
        // justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 20, color: 'black'}}>{props.text}</Text>
      <TextInput {...props} style={styles.textInput} />
    </View>
  );
};

const url = 'http://tim.ils.tw:80/project';

const SignUpContainer = ({navigation}) => {
  const [account, onChangeAccount] = useState('');
  const [name, onChangeName] = useState('');
  const [mail, onChangeMail] = useState('');
  const [vertification, onChangeVF] = useState('');
  const [password, onChangePassword] = useState('');
  const [password2, onChangePassword2] = useState('');
  const [accountWrongState, setAccountWrongState] = useState(true);
  const [passwordWrongState, setPasswordWrongState] = useState(true);
  const [password2WrongState, setPassword2WrongState] = useState(true);
  let vertifyState = false;
  // const [vertifyState, setVertifyState] = useState(false);
  // const [confirm, setConfirm] = useState(false);
  // const token = useSelector(state => state.token);

  const inputAccount = account => {
    if (account.search(/[^A-Za-z0-9_.]/) != -1) {
      console.log('帳號只能使用英文字母、數字、底線和句點。');
      setAccountWrongState(false);
    } else {
      onChangeAccount(account);
      setAccountWrongState(true);
    }
    console.log(accountWrongState);
    console.log(account);
  };

  const inputPassword = password => {
    if (password.search(/[^A-Za-z0-9_]/) != -1) {
      console.log('密碼只能使用英文字母、數字、底線。');
      setPasswordWrongState(false);
    } else {
      onChangePassword(password);
      setPasswordWrongState(true);
    }
  };

  const vertifyButton = async () => {
    console.log(mail);
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        receivers: mail,
      }),
    };
    const a = await fetch(url + '/mail', options);
  };

  const submitButton = async () => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        verifyCode: vertification,
        email: mail,
      }),
    };
    const a = await fetch(url + '/mail/check', options);
    const b = await a.text();

    // React.useEffect(() => {
      console.log('status = ' + b);
      console.log(b === 'success');
      vertifyState = (b === 'success');
    // }, []);

    Alert.alert('註冊', '確認要註冊嗎', [
      {
        text: 'Cancel!',
        onPress: () => {
          // setVertifyState(false);
        },
      },
      {
        text: 'Ok!',
        onPress: () => {
          console.log('====================================');
          console.log('confirmstatus:  ' + vertifyState);
          console.log('====================================');
          // setConfirm(true);
          signUpCheck();
        },
      },
    ]);
  };

  const signUpCheck = () => {
    console.log('v: ' + vertifyState);
    if (
      accountWrongState &&
      passwordWrongState &&
      password2WrongState &&
      vertifyState
    ) {
      Alert.alert('錯誤!!', '', [
        {text: 'Ok!', onPress: () => console.log('Ok')},
      ]);
    } else {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          username: name,
          userID: account,
          email: mail,
          password: md5.b64_md5(password2),
        }),
      };
      fetch(url + '/register', options).then(response => response.json());
      Alert.alert('', '註冊完成', [
        {
          text: 'Ok!',
          onPress: () => {
            console.log('Ok');
            setVertifyState(false);
          },
        },
      ]);
      navigation.navigate('loginPage');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: 'rgb(246,247,241)',
      }}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../assets/theme-2.png')}
            style={styles.themeImage}
          />
          <View style={styles.titleContainer}>
            <Text style={{color: 'black', fontSize: 30}}>Create</Text>
            <Text style={{color: 'black', fontSize: 30}}>New Account</Text>
          </View>
        </View>
        <View style={{flex: 3}}>
          <InputView
            text={'Account'}
            onChangeText={account => inputAccount(account)}
            value={account}
            keyboardType="email-address"
            // {...console.log(account)}
          />
          {/* 帳號格式錯誤訊息 */}

          <Text style={styles.wrongText}>
            {accountWrongState
              ? null
              : '帳號只能使用英文字母、數字、底線和句點。'}
          </Text>

          <InputView
            text={'User Name'}
            onChangeText={name => onChangeName(name)}
            value={name}
          />
          <Text style={styles.wrongText}>{null}</Text>
          <InputView
            secureTextEntry={true}
            text={'Password'}
            onChangeText={password => inputPassword(password)}
            value={password}
          />

          <Text style={styles.wrongText}>
            {passwordWrongState ? null : '密碼只能使用英文字母、數字、底線。'}
          </Text>

          <InputView
            secureTextEntry={true}
            text={'Confirm Password'}
            onChangeText={password2 => onChangePassword2(password2)}
            value={password2}
          />

          <Text style={styles.wrongText}>
            {password2WrongState ? null : '輸入密碼不同!'}
          </Text>
          <InputView
            text={'E-mail'}
            onChangeText={mail => onChangeMail(mail)}
            value={mail}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16}}>驗 證 碼 ：</Text>
            <TextInput
              style={[styles.textInput, {width: '40%', marginRight: 10}]}
              onChangeText={vertification => onChangeVF(vertification)}
              value={vertification}
            />
            <TouchableOpacity
              style={[styles.button, {width: '20%', borderRadius: 10}]}
              onPress={vertifyButton}>
              <Text style={styles.buttonText}>取得驗證碼</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 30}}>
            <TouchableOpacity style={styles.button} onPress={submitButton}>
              <Text style={styles.buttonText}>送出</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};;;;;

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 35,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  textInput: {
    height: 40,
    width: '80%',
    fontSize: 15,
    borderRadius: 20,
    color: 'black',
    paddingLeft: 20,
    backgroundColor: '#ECECEC',
  },
  wrongText: {
    color: 'red',
    // backgroundColor: 'red',
    alignSelf: 'center',
  },
  button: {
    height: 30,
    width: 100,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 20,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(49, 110, 99)',
  },
  buttonText: {
    color: 'white',
  },
  themeImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});

export default SignUpContainer;
