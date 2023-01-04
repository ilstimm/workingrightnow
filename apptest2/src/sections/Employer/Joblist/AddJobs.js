import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SwitchSelector from 'react-native-switch-selector';
import {CheckBox} from 'react-native-elements';
import {SelectList} from 'react-native-dropdown-select-list';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';

import jobData from '../../../components/data/resumeJobData';
import regionData from '../../../components/data/縣市.json';
import moment from 'moment';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';

const InputView = props => (
  <View style={{padding: '3%'}}>
    <Text>{props.text}</Text>
    <TextInput {...props} style={[styles.textInput, props.style]} />
  </View>
);

const AddJobs = ({navigation, route}) => {
  const mode = route.params.mode;
  //雇主基本資料
  const [title, setTitle] = useState(route.params.jobObject.title); //工作主旨
  const [name, setName] = useState(route.params.jobObject.name); //雇主姓名
  const [sex, setSex] = useState(route.params.jobObject.sex); //性別
  const [phone, setPhone] = useState(route.params.jobObject.phoneNumber); //電話
  const [email, setEmail] = useState(route.params.jobObject.email); //信箱

  //工作需求條件
  let nature = route.params.jobObject.nature; // 工作性質(工讀、正職...)傳值
  const [jobNature, setJobNature] = useState(0); //工作性質
  let type = route.params.jobObject.type; // 應徵工作種類傳值
  const [jobType, setJobType] = useState(); //工作需求種類
  const [content, setContent] = useState(route.params.jobObject.content); //工作內容
  const [date, setDate] = useState(route.params.jobObject.date); //工作日期
  let period = route.params.jobObject.time; // 工作時段
  const [period1, setPeriod1] = useState(
    route.params.jobObject.time.split('~', 2)[0],
  ); // 工作時段
  const [period2, setPeriod2] = useState(
    route.params.jobObject.time.split('~', 2)[1],
  ); // 工作時段
  let place = route.params.jobObject.region; // 工作地區(縣市)
  const [place1, setPlace1] = useState(1); //工作地點(縣市)
  const [place2, setPlace2] = useState(); //工作地點(鄉鎮市區)
  const [salary, setSalary] = useState(route.params.jobObject.salary); //薪資待遇

  //日期選擇器
  const [date0, setDate0] = useState(new Date()); // datepicker日期參數
  const [date1, setDate1] = useState(new Date(1995, 1, 1, 9, 0, 0)); // datepicker日期參數
  const [date2, setDate2] = useState(new Date(1995, 1, 1, 10, 0, 0)); // datepicker日期參數
  const [openJobDate, setOpenJobDate] = useState(false);
  const [openTime1, setOpenTime1] = useState(false); // datepicker開啟狀態
  const [openTime2, setOpenTime2] = useState(false); // datepicker開啟狀態

  //others
  const [payType, setPayType] = useState(route.params.jobObject.salaryMethod); //支薪方式
  const [payDate, setPayDate] = useState(route.params.jobObject.salaryDate); //支薪日

  //redux
  const userId = useSelector(state => state.userId);
  const token = useSelector(state => state.token);

  const JobDatePicker = () => {
    return (
      <DatePicker
        modal
        mode="date"
        title="工作日期"
        open={openJobDate}
        date={date0}
        onConfirm={date => {
          setOpenJobDate(false);
          setDate0(date);
          setDate(
            date.getFullYear() +
              '-' +
              (date.getMonth() + 1) +
              '-' +
              date.getDate(),
          );
        }}
        onCancel={() => {
          setOpenJobDate(false);
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

  const payTypeData = [
    {key: 0, value: '現金'},
    {key: 1, value: '匯款'},
    {key: 2, value: '行動支付'},
  ];

  return (
    <ScrollView style={styles.body}>
      <View style={styles.headers}>
        <Ionicons name="person-outline" size={35} color="#bbb" />
        <Text style={styles.headerText}>基本資料</Text>
      </View>
      <InputView
        text={'需求主旨'}
        onChangeText={text => setTitle(text)}
        value={title}
        placeholder={'例: 幫我倒垃圾'}
      />
      <InputView
        text={'姓名'}
        onChangeText={name => setName(name)}
        value={name}
        placeholder={'例: 江江'}
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
            {label: '女', value: '女士'}, //images.masculino = require('./path_to/assets/img/masculino.png')
          ]}
          testID="gender-switch-selector"
          accessibilityLabel="gender-switch-selector"
        />
      </View>
      <InputView
        text={'電話'}
        onChangeText={phone => setPhone(phone)}
        value={phone}
        placeholder={'例: 0900123456'}
      />
      <InputView
        text={'信箱'}
        onChangeText={email => setEmail(email)}
        value={email}
        placeholder={'例: mashanghot@mail.ntou.edu.tw'}
      />

      <View style={styles.headers}>
        <MaterialIcons name="work" size={35} color="#bbb" />
        <Text style={styles.headerText}>工作條件</Text>
      </View>
      <View style={{padding: '3%'}}>
        <Text>工作性質</Text>
        <SelectList
          setSelected={jobNature => setJobNature(jobNature)}
          data={jobData}
          placeholder={nature}
          // defaultOption={{key: '0', value: '及時工作'}}
          boxStyles={styles.selectListBox}
          dropdownStyles={styles.selectListDropdown}
        />
        <Text>工作種類</Text>
        <SelectList
          setSelected={jobType => setJobType(jobType)}
          data={jobData[jobNature].type}
          save={'value'}
          placeholder={type}
          // defaultOption={jobData[jobNature].type[0]}
          boxStyles={styles.selectListBox}
          dropdownStyles={styles.selectListDropdown}
        />
      </View>
      <InputView
        text={'工作內容'}
        onChangeText={content => setContent(content)}
        value={content}
        placeholder={'例: 幫我倒垃圾'}
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
      <View style={{padding: '3%'}}>
        <Text>工作日期</Text>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => setOpenJobDate(true)}>
          <View style={styles.textInput}>
            <JobDatePicker />
            <Text style={{fontSize: 15}}>{date}</Text>
          </View>
        </TouchableOpacity>
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
              <Text style={{fontSize: 15}}>{period}</Text>
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
              <Text style={{fontSize: 15}}>{period}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{padding: '3%'}}>
        <Text>工作地點</Text>
        <SelectList
          setSelected={setPlace1}
          data={regionData}
          placeholder={place}
          save={'key'}
          // defaultOption={{key: '1', value: '台北市'}}
          boxStyles={styles.selectListBox}
          dropdownStyles={styles.selectListDropdown}
        />
        {console.log('縣市: ' + place1)}
        <SelectList
          setSelected={setPlace2}
          data={
            place1 != null
              ? regionData[place1 - 1].districts
              : regionData[1].districts
          }
          placeholder={place}
          save={'value'}
          // defaultOption={regionData[place1 - 1].districts[0]}
          boxStyles={styles.selectListBox}
          dropdownStyles={styles.selectListDropdown}
        />
        {console.log('地區: ' + place2)}
      </View>

      <View style={styles.headers}>
        <MaterialIcons name="attach-money" size={35} color="#bbb" />
        <Text style={styles.headerText}>薪資</Text>
      </View>
      <InputView
        text={'薪資待遇'}
        onChangeText={salary => setSalary(salary)}
        value={salary}
        placeholder={'例: 時薪170'}
      />
      <View style={{padding: '3%'}}>
        <Text>支薪方式</Text>
        <SelectList
          setSelected={setPayType}
          onSelect={console.log('Select!')}
          data={payTypeData}
          placeholder={payType}
          save={'value'}
          // defaultOption={{key: '0', value: '現金'}}
          boxStyles={styles.selectListBox}
          dropdownStyles={styles.selectListDropdown}
        />
      </View>
      <InputView
        text={'支薪日'}
        onChangeText={payDate => setPayDate(payDate)}
        value={payDate}
        placeholder={'例: 當日現領、每月五號'}
      />

      <View>
        <Button
          title="送出"
          style={styles.button}
          onPress={async () => {
            period = period1 + '~' + period2;
            Alert.alert('新增', '確認要新增需求嗎', [
              {
                text: 'Cancel!',
                opPress: () => {},
              },
              {
                text: 'Ok!',
                onPress: () => {
                  const url = 'http://tim.ils.tw:80/project/auth/Jobs';
                  let httpUrl;
                  let method;
                  if (mode == 'add') {
                    httpUrl = url;
                  } else {
                    httpUrl =
                      url +
                      '/replace/' +
                      userId +
                      '/' +
                      route.params.jobObject.createTime;
                  }
                  const options = {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json;charset=UTF-8',
                      Authorization: 'Bearer ' + token.token,
                    },
                    body: JSON.stringify({
                      userID: userId.userId,
                      title: title,
                      name: name,
                      sex: sex,
                      phoneNumber: phone,
                      date: date,
                      email: email,
                      nature: nature,
                      type: type,
                      time: period,
                      salary: salary,
                      region: place,
                      salaryMethod: payType,
                      salaryDate: payDate,
                      content: content,
                    }),
                  };
                  fetch(url, options)
                    .then(response => response.json())
                    .then(data => {
                      console.log('data: ' + data);
                    });
                  navigation.replace('JoblistPage'); // 返回上一页
                },
              },
            ]);
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
  selectListBox: {
    // fontSize: 15,
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
  button: {},
});

export default AddJobs;
