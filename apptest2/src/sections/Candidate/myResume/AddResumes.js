import React, {useState} from 'react';
import {Text, View, TextInput, StyleSheet, Button, Picker} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CheckBox, Tile} from 'react-native-elements';
import {SelectList} from 'react-native-dropdown-select-list';
import {ScrollView} from 'react-native-gesture-handler';
import {Post} from './ResumeMethod.js';
import {useDispatch, useSelector} from 'react-redux';
import SwitchSelector from 'react-native-switch-selector';
import {TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import resumeData from '../../../components/data/resumeJobData';
import regionData from '../../../components/data/縣市.json';
import schoolData from '../../../components/data/學校名稱.json';
import moment from 'moment';
import {Alert} from 'react-native';
import {setResumeOrder} from '../../../redux/resumeOrderSlice.js';

const InputView = props => (
  <View style={{padding: '3%'}}>
    <Text>{props.text}</Text>
    <TextInput {...props} style={[styles.textInput, props.style]} />
  </View>
);

const AddResumes = ({navigation, route}) => {
  const mode = route.params.mode;
  // console.log('12: ' + JSON.stringify(route.params));
  // 履歷基本資料
  const [title, onChangTitle] = useState(route.params.resumeObject.title); // 履歷主旨
  const [name, onChangeName] = useState(route.params.resumeObject.name); // 應徵者姓名
  const [sex, setSex] = useState(route.params.resumeObject.sex); // 應徵者性別
  const [birthday, setBirthday] = useState(route.params.resumeObject.birth); // 設定生日
  const [phone, onChangePhone] = useState(
    route.params.resumeObject.phoneNumber,
  ); // 電話
  const [email, onChangeEmail] = useState(route.params.resumeObject.email); // 信箱

  // 學經歷
  const [schoolName, setSchoolName] = useState(
    route.params.resumeObject.school,
  ); // 學校名稱
  const [department, setDepartment] = useState(
    route.params.resumeObject.department,
  ); // 科系名稱
  const [schoolStatus, setSchoolStatus] = useState(
    route.params.resumeObject.status,
  ); // 就學狀態(畢業、肄業、就學中)

  // 求職條件
  let nature = route.params.resumeObject.nature; // 工作性質(工讀、正職...)傳值
  const [resumeNature, setResumeNature] = useState(0); // 工作性質(工讀、正職...)
  let type = route.params.resumeObject.type; // 應徵工作種類傳值
  const [resumeType, setResumeType] = useState(); // 應徵工作種類
  let period = route.params.resumeObject.time; // 工作時段
  const [period1, setPeriod1] = useState(
    route.params.resumeObject.time.split('~', 2)[0],
  ); // 工作時段
  const [period2, setPeriod2] = useState(
    route.params.resumeObject.time.split('~', 2)[1],
  ); // 工作時段
  let region = route.params.resumeObject.region; // 工作地區(縣市)
  const [region1, setRegion1] = useState(1); // 工作地區(縣市)
  const [region2, setRegion2] = useState(); // 工作地區(鄉鎮市區)
  const [salary, setSalary] = useState(route.params.resumeObject.salary); // 薪資待遇

  const [introduction, onChangeIntroduction] = useState(
    route.params.resumeObject.introduction,
  ); // 自我簡介

  // 日期選擇器
  const [date0, setDate0] = useState(new Date()); // datepicker日期參數
  const [date1, setDate1] = useState(new Date(1995, 1, 1, 9, 0, 0)); // datepicker日期參數
  const [date2, setDate2] = useState(new Date(1995, 1, 1, 10, 0, 0)); // datepicker日期參數
  const [openBirthday, setOpenBirthday] = useState(false); // datepicker開啟狀態
  const [openTime1, setOpenTime1] = useState(false); // datepicker開啟狀態
  const [openTime2, setOpenTime2] = useState(false); // datepicker開啟狀態

  // redux

  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId.userId);
  const token = useSelector(state => state.token);

  const BirthdayPicker = () => {
    return (
      <DatePicker
        modal
        mode="date"
        title="BIRTHDAY"
        open={openBirthday}
        date={date0}
        onConfirm={date => {
          setOpenBirthday(false);
          setDate0(date);
          setBirthday(
            date.getFullYear() +
              '-' +
              (date.getMonth() + 1) +
              '-' +
              date.getDate(),
          );
        }}
        onCancel={() => {
          setOpenBirthday(false);
        }}
      />
    );
  };

  const TimePicker = () => {
    return (
      <DatePicker
        modal
        mode="time"
        open={openTime1}
        date={date1}
        minuteInterval={10}
        onConfirm={date => {
          setOpenTime1(false);
          setDate1(date);
          setPeriod1(moment(date).format('HH:mm'));
        }}
        onCancel={() => {
          setOpenTime1(false);
        }}
      />
    );
  };

  const TimePicker2 = () => {
    return (
      <DatePicker
        modal
        mode="time"
        open={openTime2}
        date={date2}
        minuteInterval={10}
        cancelText={' '}
        onConfirm={date => {
          setOpenTime2(false);
          setDate2(date);
          setPeriod2(moment(date).format('HH:mm'));
        }}
        onCancel={() => {
          setOpenTime2(false);
          console.log('cancel');
        }}
      />
    );
  };

  return (
    <ScrollView style={styles.body}>
      <View style={styles.headers}>
        <Ionicons name="person-outline" size={35} color="#bbb" />
        <Text style={styles.headerText}>基本資料</Text>
      </View>
      <InputView
        text={'履歷主旨'}
        onChangeText={title => onChangTitle(title)}
        value={title}
        placeholder={'例: 數學家教'}
      />
      <InputView
        text={'姓名'}
        onChangeText={text => onChangeName(text)}
        value={name}
        placeholder={'例: 黃提姆'}
      />
      <View style={{padding: '3%'}}>
        <Text>性別</Text>
        <SwitchSelector
          // initial={}
          onPress={sex => setSex(sex)}
          textColor="gray"
          buttonColor="gray"
          borderColor="gray"
          hasPadding
          options={[
            {label: '男', value: '先生'}, //images.feminino = require('./path_to/assets/img/feminino.png')
            {label: '女', value: '小姐'}, //images.masculino = require('./path_to/assets/img/masculino.png')
          ]}
          testID="gender-switch-selector"
          accessibilityLabel="gender-switch-selector"
        />
      </View>
      <View style={{padding: '3%'}}>
        <Text>生日</Text>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => setOpenBirthday(true)}>
          <View style={styles.textInput}>
            <BirthdayPicker />
            <Text style={{fontSize: 15}}>{birthday}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <InputView
        text={'電話'}
        onChangeText={phone => onChangePhone(phone)}
        value={phone}
        placeholder={'例: 0900123456'}
      />
      <InputView
        text={'信箱'}
        onChangeText={email => onChangeEmail(email)}
        value={email}
        placeholder={'例: mashanghot@mail.ntou.edu.tw'}
      />

      <View style={styles.headers}>
        <Ionicons name="book" size={35} color="#bbb" />
        <Text style={styles.headerText}>學經歷</Text>
      </View>
      <View style={{padding: '3%'}}>
        <Text>學校名稱</Text>
        <SelectList
          setSelected={schoolName => {
            setSchoolName(schoolName);
          }}
          data={schoolData}
          placeholder={schoolName}
          save={'value'}
          // defaultOption={{key: '1', value: '國立政治大學'}}
          boxStyles={styles.selectListBox}
          dropdownStyles={styles.selectListDropdown}
        />
      </View>
      <InputView
        text={'學系'}
        onChangeText={department => setDepartment(department)}
        value={department}
        placeholder={'例: 資訊工程學系'}
      />
      <View style={{padding: '3%'}}>
        <Text>就學狀態</Text>
        <RadioButton.Group
          onValueChange={schoolStatus => setSchoolStatus(schoolStatus)}
          value={schoolStatus}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.radioButton}>
              <RadioButton value="就讀中" color="gray" />
              <Text style={{color: 'black'}}>就讀中</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton value="已畢業" color="gray" />
              <Text style={{color: 'black'}}>已畢業</Text>
            </View>
          </View>
        </RadioButton.Group>
      </View>

      <View style={styles.headers}>
        <MaterialIcons name="work" size={35} color="#bbb" />
        <Text style={styles.headerText}>工作條件</Text>
      </View>
      <View style={{padding: '3%'}}>
        <Text>工作性質</Text>
        <SelectList
          setSelected={resumeNature => {
            setResumeNature(resumeNature);
            nature = resumeData[resumeNature].value;
          }}
          data={resumeData}
          placeholder={nature}
          // defaultOption={{key: '0', value: '及時工作'}}
          boxStyles={styles.selectListBox}
          dropdownStyles={styles.selectListDropdown}
        />
        {console.log('nature: ' + resumeNature)}
        <Text>工作種類</Text>
        <SelectList
          setSelected={resumeType => {
            setResumeType(resumeType);
            type = resumeType;
          }}
          data={resumeData[resumeNature].type}
          placeholder={type}
          save={'value'}
          // defaultOption={resumeData[resumeNature].type[0]}
          boxStyles={styles.selectListBox}
          dropdownStyles={styles.selectListDropdown}
        />
        {console.log('type: ' + type)}
      </View>

      <View style={{padding: '3%'}}>
        <Text>工作時段</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              setOpenTime1(true);
            }}>
            <View style={styles.timeView}>
              <TimePicker />
              <Text style={{fontSize: 15}}>{period1}</Text>
            </View>
          </TouchableOpacity>
          <Text style={{fontSize: 30}}>{'  ~  '}</Text>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              setOpenTime2(true);
            }}>
            <View style={styles.timeView}>
              <TimePicker2 />
              {/* {
                (period =
                  moment(date1).format('HH:mm') +
                  '~' +
                  moment(date2).format('HH:mm'))
              } */}
              <Text style={{fontSize: 15}}>{period2}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <InputView
        text={'希望待遇'}
        onChangeText={salary => setSalary(salary)}
        value={salary}
        placeholder={'例: 170'}
      />
      <View style={{padding: '3%'}}>
        <Text>工作地點</Text>
        <SelectList
          setSelected={setRegion1}
          data={regionData}
          placeholder={region}
          save={'key'}
          // defaultOption={{key: '1', value: '台北市'}}
          boxStyles={styles.selectListBox}
          dropdownStyles={styles.selectListDropdown}
        />
        {console.log('縣市: ' + region1)}
        <SelectList
          setSelected={region2 => {
            setRegion2(region2);
          }}
          data={
            region1 != null
              ? regionData[region1 - 1].districts
              : regionData[1].districts
          }
          placeholder={region}
          save={'value'}
          // defaultOption={regionData[region1 - 1].districts[0]}
          boxStyles={styles.selectListBox}
          dropdownStyles={styles.selectListDropdown}
        />
      </View>
      <InputView
        text={'自我簡介'}
        onChangeText={introduction => onChangeIntroduction(introduction)}
        value={introduction}
        placeholder={'例: 我好帥'}
        multiline={true}
        style={[
          {
            height: 250,
            textAlignVertical: 'top',
            justifyContent: 'flex-start',
            paddingTop: 10,
            borderWidth: 1.5,
            borderRadius: 3,
          },
        ]}
      />
      <View style={styles.view}>
        <Button
          title="送出"
          style={styles.button}
          onPress={async () => {
            period = period1 + '~' + period2;
            region = regionData[region1 - 1].value + region2;
            {
              console.log('地區: ' + region);
            }
            {
              console.log('性質種類: ' + nature + type);
            }
            {
              console.log('時間: ' + period);
            }
            {
              console.log('學校: ' + schoolName);
            }

            {
              Alert.alert('新增', '確認要新增履歷嗎', [
                {
                  text: 'Cancel!',
                  onPress: () => {},
                },
                {
                  text: 'Ok!',
                  onPress: () => {
                    const url = 'http://tim.ils.tw:80/project/auth/Resumes';
                    let httpUrl;
                    let method;
                    if (mode == 'add') {
                      httpUrl = url;
                    } else if (mode == 'modify') {
                      httpUrl =
                        url +
                        '/replace/' +
                        userId +
                        '/' +
                        route.params.resumeObject.createTime;
                    }
                    const options = {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                        Authorization: 'Bearer ' + token.token,
                      },
                      body: JSON.stringify({
                        userID: userId,
                        title: title,
                        name: name,
                        sex: sex,
                        birth: birthday,
                        phoneNumber: phone,
                        email: email,
                        school: schoolName,
                        department: department,
                        status: schoolStatus,
                        nature: nature,
                        type: type,
                        time: period,
                        salary: salary,
                        region: region,
                        introduction: introduction,
                      }),
                    };
                    console.log('====================================');
                    console.log('url:  ' + httpUrl);
                    console.log('method:  ' + method);
                    console.log('====================================');
                    fetch(httpUrl, options)
                      .then(response => response.json())
                      .then(data => {
                        console.log('data: ' + data);
                      });
                    navigation.replace('ResumelistPage'); // 返回上一页
                  },
                },
              ]);
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    marginTop: 5,
    flex: 1,
  },
  headers: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 5,
  },
  headerText: {
    fontSize: 25,
  },
  textInput: {
    height: 40,
    wight: '70%',
    fontSize: 15,
    borderBottomWidth: 1.5,
    borderColor: 'gray',
    padding: 0,
    paddingLeft: 8,
    color: 'black',
    justifyContent: 'center',
  },
  ageText: {
    height: 40,
    wight: '70%',
    borderBottomWidth: 1.5,
    fontSize: 15,
    borderColor: 'gray',
    margin: '5%',
    justifyContent: 'center',
  },
  radioButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectListBox: {
    borderRadius: 2,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 1.5,
    borderColor: 'gray',
    marginTop: 10,
    marginBottom: 1,
    padding: '3%',
    paddingLeft: 8,
  },
  selectListDropdown: {
    borderRadius: 2,
    marginVertical: 10,
  },
  timeView: {
    height: 50,
    wight: '70%',
    fontSize: 30,
    borderBottomWidth: 1.5,
    borderColor: 'gray',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddResumes;
