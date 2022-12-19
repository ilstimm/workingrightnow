import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {RefreshControl} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
import {devToolsEnhancer} from '@reduxjs/toolkit/dist/devtoolsExtension';
import AntDesign from 'react-native-vector-icons/AntDesign';

const JobForm = ({job, navigation}) => {
  console.log('job= ' + JSON.stringify(job));
  const onPressjobDetail = () => {
    navigation.navigate('CJobDetailPage', job);
  };

  const BackgroundText = () => {
    return (
      <>
        <Text style={styles.backgroundText}>{job.nature}</Text>
        <Text style={styles.backgroundText}>{job.type}</Text>
      </>
    );
  };

  const RegionSalaryText = () => {
    return (
      <>
        <Text style={{color: '#111111', marginRight: 15, fontSize: 13}}>
          {job.region}
        </Text>
        <Text style={{color: '#FFE141', fontSize: 13}}>{job.salary}</Text>
      </>
    );
  };

  return (
    <View>
      <TouchableOpacity style={styles.jobBtn} onPress={onPressjobDetail}>
        <View style={styles.jobFormView}>
          <View style={{flex: 1}}>
            <View style={[styles.jobItem, {flex: 1}]}>
              <Text style={styles.jobFormTitle}>{job.title}</Text>
            </View>

            <View style={styles.jobItem}>
              <RegionSalaryText />
            </View>

            <View style={styles.jobItem}>
              <BackgroundText />
            </View>
          </View>
          <View style={styles.collectView}>
            <AntDesign name="heart" style={{color: 'red', fontSize: 20}} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function CJobItem({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectAll, setSelectAll] = useState(true);
  const [returnValue, setReturnValue] = useState('');
  const token = useSelector(state => state.token);
  const userId = useSelector(state => state.userId);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };

  const renderloader = () => {
    return (
      <View>
        <ActivityIndicator size={'large'} color="#aaa" />
      </View>
    );
  };

  useEffect(() => {
    const url = 'http://localhost:8080/auth/Jobs/getAllJobs/' + userId.userId;
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
        // let a = data
        //   .filter(item => item.title == '10' || selectAll)
        //   .map((item, index) => (
        //     <View key={index}>
        //       <JobForm job={item} navigation={navigation} />
        //     </View>
        //   ));
        // setReturnValue(a);
        console.log(data);
        let a = (
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={data}
            renderItem={({item}) => (
              <JobForm job={item} navigation={navigation} />
            )}
            inverted
            // keyExtractor={data => data.createTime}
          />
        );
        setReturnValue(a);
      });
  }, [refreshing]);
  return returnValue;
}

const styles = StyleSheet.create({
  jobBtn: {
    flex: 1,
  },
  jobFormView: {
    flexDirection: 'row',
    height: 110,
    marginVertical: 12,
    marginHorizontal: 7,
    padding: '2%',
    borderWidth: 1,
    borderRadius: 5,
    elevation: 5,
    borderColor: '#fefefe',
    backgroundColor: '#FFFefe',
  },
  jobFormTitle: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000',
  },
  jobItem: {
    flexDirection: 'row',
  },
  backgroundText: {
    fontSize: 13,
    backgroundColor: '#dddddd',
    borderRadius: 2,
    marginRight: 10,
    padding: 3,
  },
  collectView: {
    backgroundColor: 'gray',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
});
