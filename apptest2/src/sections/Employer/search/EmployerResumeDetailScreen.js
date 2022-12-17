import * as React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const EmployerResumeDetailScreen = ({navigation, route}) => {
  const name = route.params.name + '  ' + route.params.sex;
  console.log('name: ' + name);

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
    <View style={{flex: 1}}>
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
      </View>
    </View>
  );
};

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
});
export default EmployerResumeDetailScreen;
