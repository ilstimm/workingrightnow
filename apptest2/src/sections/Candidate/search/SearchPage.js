import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  TextInput,
} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import CJobItem from './CJobItem';

export default function SearchPage({navigation}) {
  const token = useSelector(state => state.token);
  console.log('SearchPage = ' + token.token);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.body}>
        <View style={styles.searchView}>
          <View>
            <Text>1</Text>
          </View>
        </View>
        <View style={styles.blockView}>
          <Text>2</Text>
        </View>
        <View style={styles.scrollView}>
          <View
            // showsVerticalScrollIndicator={false}
            style={styles.resumeFormsListView}>
            <CJobItem navigation={navigation} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 15,
    backgroundColor: '#eeeeee',
  },
  body: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  searchView: {
    flex: 2,
    backgroundColor: '#ffffff',
  },
  blockView: {
    flex: 1.5,
    backgroundColor: '#ffffff',
  },
});
