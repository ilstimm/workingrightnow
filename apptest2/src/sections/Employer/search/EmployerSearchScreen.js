import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import ResumeItem from './ResumeItem';

export default function EmployerSearchScreen({navigation}) {
  const token = useSelector(state => state.token);
  const [refreshing, setRefreshing] = useState(false);
  const [selectAll, setSelectAll] = useState(true);
  console.log('SearchPage = ' + token.token);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.body}>
        <View style={styles.searchView}>
          <Text>1</Text>
        </View>
        <View style={styles.blockView}>
          <Text>2</Text>
        </View>
        <View style={styles.scrollView}>
          <View
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
            // showsVerticalScrollIndicator={false}
            style={styles.resumeFormsListView}>
            <ResumeItem navigation={navigation} selectAll={selectAll} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 15,
    backgroundColor: '#f9f9f9',
  },
  body: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  searchView: {
    flex: 2,
    backgroundColor: '#fff',
  },
  blockView: {
    flex: 1.5,
    backgroundColor: '#fff',
  },
});
