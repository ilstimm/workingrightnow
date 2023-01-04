import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useEffect, useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {FlatList, RefreshControl} from 'react-native-gesture-handler';

const ResumeForm = ({resume, navigation, token, userId}) => {
  const [heart, setHeart] = useState(resume.collectStatus); //後端判斷
  const [heartView, setHeartView] = useState(resume.collectStatus); //前端顯示

  const onPressJobDetail = () => {
    navigation.navigate('resumeDetailScreen', resume);
  };

  const BackgroundText = () => {
    return (
      <>
        <Text style={styles.backgroundText}>{resume.nature}</Text>
        <Text style={styles.backgroundText}>{resume.type}</Text>
      </>
    );
  };

  const RegionSalaryText = () => {
    return (
      <>
        <Text style={{color: '#111111', marginRight: 15, fontSize: 13}}>
          {resume.region}
        </Text>
        <Text style={{color: '#FFE141', fontSize: 13}}>{resume.school}</Text>
      </>
    );
  };

  const change = () => {
    setHeart(heart => !heart);
    setHeartView(heartView => !heartView);
  };

  const ref = useRef(false);

  useEffect(() => {
    console.log('ref = ' + ref.current);
    if (ref.current) {
      console.log('heart: ' + heart);
      const httpUrl = heart
        ? 'http://tim.ils.tw:80/project/auth/addResumeCollect/'
        : 'http://tim.ils.tw:80/project/auth/removeResumeCollect/';
      const url =
        httpUrl + userId.userId + '/' + resume.userID + '/' + resume.createTime;

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
      <TouchableOpacity style={styles.resumeBtn} onPress={onPressJobDetail}>
        <View style={styles.resumeFormView}>
          <View style={{flex: 1}}>
            <View style={[styles.resumeItem, {flex: 1}]}>
              <Text style={styles.resumeFormTitle}>{resume.title}</Text>
            </View>

            <View style={styles.resumeItem}>
              <RegionSalaryText />
            </View>

            <View style={styles.resumeItem}>
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

export default function ResumeItem({
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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };

  useEffect(() => {
    let url = 'http://tim.ils.tw:80/project/auth/Resumes/';
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
        url = url + 'getAllResumes/' + userId.userId;
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
        // console.log(data);
        let a = (
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={data}
            renderItem={({item}) => (
              <ResumeForm
                resume={item}
                navigation={navigation}
                token={token}
                userId={userId}
              />
            )}
            // keyExtractor={data => data.createTime}
          />
        );
        setReturnValue(a);
      });
  }, [refreshing, searchText, filter]);
  return returnValue;
}

const styles = StyleSheet.create({
  resumeBtn: {
    flex: 1,
  },
  resumeFormView: {
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
  resumeFormTitle: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000',
  },
  resumeItem: {
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
