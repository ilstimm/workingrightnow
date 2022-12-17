import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
// import {FlatList, RefreshControl} from 'react-native-gesture-handler';

const ResumeForm = ({resume, navigation}) => {
  // console.log(resume.name);
  // console.log('resume= ' + JSON.stringify(resume));
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
  return (
    <View>
      <TouchableOpacity style={styles.resumeBtn} onPress={onPressJobDetail}>
        <View style={styles.resumeFormView}>
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
      </TouchableOpacity>
    </View>
  );
};

export default function ResumeItem({navigation}) {
  const [returnValue, setReturnValue] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector(state => state.token);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };
  useEffect(() => {
    const url = 'http://localhost:8080/auth/Resumes';
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
        //       <ResumeForm resume={item} navigation={navigation} />
        //     </View>
        //   ));
        // setReturnValue(a);
        let a = (
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={data}
            renderItem={({item}) => (
              <ResumeForm resume={item} navigation={navigation} />
            )}
            inverted
          />
        );
        setReturnValue(a);
      });
  }, [refreshing]);
  return returnValue;
}

const styles = StyleSheet.create({
  resumeBtn: {
    flex: 1,
  },
  resumeFormView: {
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
});
