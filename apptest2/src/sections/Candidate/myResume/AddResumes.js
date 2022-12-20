import * as React from 'react';
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
import {useState} from 'react';
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
  console.log('123: ' + route.params.resumeObject.mode);
  console.log('12: ' + JSON.stringify(route.params));
  // 履歷基本資料
  const [title, onChangTitle] = React.useState(route.params.resumeObject.title); // 履歷主旨
  const [name, onChangeName] = React.useState(route.params.resumeObject.name); // 應徵者姓名
  const [sex, setSex] = React.useState(route.params.resumeObject.sex); // 應徵者性別
  const [birthday, setBirthday] = useState(route.params.resumeObject.birth); // 設定生日
  const [phone, onChangePhone] = React.useState(
    route.params.resumeObject.phoneNumber,
  ); // 電話
  const [email, onChangeEmail] = React.useState(
    route.params.resumeObject.email,
  ); // 信箱

  // 學經歷
  const [schoolName, setSchoolName] = React.useState(
    route.params.resumeObject.school,
  ); // 學校名稱
  const [department, setDepartment] = React.useState(
    route.params.resumeObject.department,
  ); // 科系名稱
  const [schoolStatus, setSchoolStatus] = React.useState(
    route.params.resumeObject.status,
  ); // 就學狀態(畢業、肄業、就學中)

  // 求職條件
  const [resumeNature, setResumeNature] = React.useState(0); // 工作性質(工讀、正職...)
  const [type, setType] = React.useState(0); // 應徵工作種類
  const [period, setPeriod] = React.useState(route.params.resumeObject.time); // 工作時段
  const [period1, setPeriod1] = React.useState(''); // 工作時段
  const [period2, setPeriod2] = React.useState(''); // 工作時段
  const [region1, setRegion1] = React.useState(1); // 工作地區(縣市)
  const [region2, setRegion2] = React.useState(); // 工作地區(鄉鎮市區)
  const [salary, setSalary] = React.useState(route.params.resumeObject.salary); // 薪資待遇

  const [introduction, onChangeIntroduction] = React.useState(
    route.params.resumeObject.introduction,
  ); // 自我簡介

  // 日期選擇器
  const [date0, setDate0] = useState(new Date()); // datepicker日期參數
  const [date1, setDate1] = useState(new Date(1995, 1, 1, 9, 0, 0)); // datepicker日期參數
  const [date2, setDate2] = useState(new Date(1995, 1, 1, 10, 0, 0)); // datepicker日期參數
  const [openBirthday, setOpenBirthday] = useState(false); // datepicker開啟狀態
  const [openTime1, setOpenTime1] = useState(false); // datepicker開啟狀態
  const [openTime2, setOpenTime2] = useState(false); // datepicker開啟狀態

  // 工作種類
  const [teacher, setTeacher] = React.useState(false);
  const [engineer, setEngineer] = React.useState(false);
  const [cleaner, setCleaner] = React.useState(false);
  const [other, setOther] = React.useState(false);

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
          initial={0}
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
          setSelected={setSchoolName}
          data={schoolData}
          placeholder={'選擇學校'}
          save={'value'}
          defaultOption={{key: '1', value: '國立政治大學'}}
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
          setSelected={setResumeNature}
          onSelect={console.log('Select!')}
          data={resumeData}
          placeholder={'選擇工作性質'}
          defaultOption={{key: '0', value: '及時工作'}}
          boxStyles={styles.selectListBox}
          dropdownStyles={styles.selectListDropdown}
        />
        <Text>工作種類</Text>
        <SelectList
          setSelected={type => setType(type)}
          data={resumeData[resumeNature].type}
          save={'value'}
          placeholder={'選擇工作種類'}
          defaultOption={resumeData[resumeNature].type[0]}
          boxStyles={styles.selectListBox}
          dropdownStyles={styles.selectListDropdown}
        />
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
          placeholder={'選擇地區'}
          // save={'value'}
          defaultOption={{key: '1', value: '台北市'}}
          boxStyles={styles.selectListBox}
          dropdownStyles={styles.selectListDropdown}
        />
        <SelectList
          setSelected={setRegion2}
          data={regionData[region1 - 1].districts}
          placeholder={'選擇地區'}
          // save={'value'}
          defaultOption={regionData[region1 - 1].districts[0]}
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
            Alert.alert('新增', '確認要新增履歷嗎', [
              {
                text: 'Cancel!',
                onPress: () => {},
              },
              {
                text: 'Ok!',
                onPress: () => {
                  const url = 'http://localhost:8080/auth/Resumes';
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
                      school: schoolData[schoolName - 1].value,
                      department: department,
                      status: schoolStatus,
                      nature: resumeData[resumeNature].value,
                      type: resumeData[resumeNature].type.filter(
                        item => item.key == type,
                      )[0].value,
                      time: period1 + '~' + period2,
                      salary: salary,
                      region:
                        regionData[region1 - 1].value +
                        regionData[region1 - 1].districts.filter(
                          item => item.key == region2,
                        )[0].value,
                      introduction: introduction,
                      shelvesStatus: true,
                    }),
                  };
                  fetch(url, options)
                    .then(response => response.json())
                    .then(data => {
                      console.log('data: ' + data);
                    });
                  navigation.replace('ResumelistPage'); // 返回上一页
                },
              },
            ]);
            console.log(
              'userId: ' + userId,
              'title: ' + title,
              'name: ' + name,
              'sex: ' + sex,
              'birth: ' + birthday,
              'phoneNumber: ' + phone,
              'email: ' + email,
              'school: ' + schoolData[schoolName - 1].value,
              'department: ' + department,
              'status: ' + schoolStatus,
              'nature: ' + resumeData[resumeNature].value,
              'type: ' +
                resumeData[resumeNature].type.filter(
                  item => item.key == type,
                )[0].value,
              'region: ' +
                (regionData[region1 - 1].value +
                  regionData[region1 - 1].districts.filter(
                    item => item.key == region2,
                  )[0].value),
              'time: ' + period,
              'salary: ' + salary,
              'introduction: ' + introduction,
            );
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