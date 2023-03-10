import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useEffect, useRef} from 'react';
import {RefreshControl} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
import {devToolsEnhancer} from '@reduxjs/toolkit/dist/devtoolsExtension';
import AntDesign from 'react-native-vector-icons/AntDesign';

const JobForm = ({job, navigation, token, userId}) => {
  // console.log('job= ' + JSON.stringify(job));
  const [heart, setHeart] = React.useState(job.collectStatus);
  const [heartView, setHeartView] = useState(job.collectStatus); //前端顯示

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
        <Text style={{color: '#ccb574', fontSize: 13}}>{job.salary}</Text>
      </>
    );
  };

  const change = () => {
    setHeart(heart => !heart);
    setHeartView(heartView => !heartView);
  };

  const ref = useRef(false);

  useEffect(() => {
    // console.log('ref = ' + ref.current);
    if (ref.current) {
      // console.log('heart: ' + heart);
      const httpUrl = heart
        ? 'http://tim.ils.tw:80/project/auth/addJobCollect/'
        : 'http://tim.ils.tw:80/project/auth/removeJobCollect/';
      const url =
        httpUrl + userId.userId + '/' + job.userID + '/' + job.createTime;

      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: 'Bearer ' + token.token,
        },
      };
      fetch(url, options);
      // setHeart(heart => !heart);
    } else {
      ref.current = true;
    }
  }, [heartView]);

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
          <TouchableOpacity style={styles.collectView} onPress={change}>
            <View>
              {heartView ? (
                <AntDesign name="heart" style={{color: 'red', fontSize: 25}} />
              ) : (
                <AntDesign
                  name="hearto"
                  style={{color: 'gray', fontSize: 25}}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function CJobItem({
  navigation,
  searchText,
  filter,
  recommendState,
}) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectAll, setSelectAll] = useState(true);
  const [returnValue, setReturnValue] = useState('');
  const token = useSelector(state => state.token);
  const userId = useSelector(state => state.userId);

  console.log('search= ' + searchText + '  filter= ' + filter);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };

  useEffect(() => {
    let url = 'http://tim.ils.tw:80/project/auth/Jobs/';
    let options;
    if (recommendState) {
      url = url + 'match/' + userId.userId;
      options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: 'Bearer ' + token.token,
        },
      };
    } else {
      if (searchText == '' && filter == '') {
        url = url + 'getAllJobs/' + userId.userId;
        options = {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: 'Bearer ' + token.token,
          },
        };
      } else {
        url = url + 'search/' + userId.userId;
        console.log(
          '123456789: ' + '關鍵字-' + searchText,
          '工作種類-' + filter,
        );
        options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: 'Bearer ' + token.token,
          },
          body: JSON.stringify({
            searchCondition: ['關鍵字-' + searchText, '工作種類-' + filter],
          }),
        };
      }
    }

    console.log('====================================');
    console.log('url:   ' + url);
    console.log('====================================');
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
        console.log('jobdata******' + JSON.stringify(data));
        let a = (
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={data}
            renderItem={({item}) => (
              <JobForm
                job={item}
                navigation={navigation}
                token={token}
                userId={userId}
              />
            )}
            // inverted={true}
            keyExtractor={data => data.createTime}
          />
        );
        setReturnValue(a);
      });
  }, [refreshing, searchText, filter, recommendState]);
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
    borderWidth: 4,
    borderRadius: 5,
    borderColor: 'rgba(140,198,198, 0.5)',
    backgroundColor: '#FFFefe',
    borderRadius: 20,
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
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
});
