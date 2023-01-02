import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import SelectList from 'react-native-dropdown-select-list';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  TextInput,
} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import CJobItem from './CJobItem';
import resumeJobData from '../../../components/data/resumeJobData.json';
import SelectDropdown from 'react-native-select-dropdown';

export default function SearchPage({navigation}) {
  const token = useSelector(state => state.token);
  const userResumeData = useSelector(state => state.userResumeData);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');
  const [nature, setNature] = useState([]);
  const [filter, setFilter] = useState([]);
  const [state, setState] = useState(true);
  // console.log('SearchPage = ' + token.token);
  // console.log(
  //   'userResumeData: ' + JSON.stringify(userResumeData.userResumeData),
  // );

  const searchApi = () => {
    // setSearch(value);
    // console.log('search: ' + search);
  };

  const onPressHandler = () => {
    setState(state => !state);
    // console.log('n: ' + nature);
  };

  useEffect(() => {
    setFilter(nature);
    setSearch(value);
  }, [state]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.body}>
        <ScrollView>
          <View style={styles.searchView}>
            <TextInput
              style={styles.searchInput}
              placeholder={'輸入關鍵字'}
              onChangeText={value => setValue(value)}
              // onChangeText={search => setSearch(search)}
              onSubmitEditing={onPressHandler}
              value={value}
            />
          </View>
          <View style={styles.blockView}>
            <MultipleSelectList
              setSelected={nature => setNature(nature)}
              data={resumeJobData}
              save="value"
              placeholder={'選擇工作性質'}
              defaultOption={{key: '0', value: '及時工作'}}
              boxStyles={styles.selectListBox}
              dropdownStyles={styles.selectListDropdown}
              search={false}
            />
          </View>
          <View style={styles.blockView}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                onPressHandler();
              }}
              style={styles.opacity}>
              <Text style={styles.text}>篩選</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.scrollView}>
          <View
            // showsVerticalScrollIndicator={false}
            style={styles.resumeFormsListView}>
            <CJobItem
              navigation={navigation}
              searchText={search}
              filter={filter}
            />
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
    backgroundColor: '#eeeeee',
  },
  blockView: {
    flex: 1,
    backgroundColor: '#bbbbbb',
  },
  searchInput: {
    height: 40,
    wight: '70%',
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 8,
    color: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    margin: 15,
    borderRadius: 10,
  },
  selectListBox: {
    flex: 1,
    borderRadius: 2,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    borderWidth: 0,
    // borderBottomWidth: 1.5,
    // borderColor: 'gray',
    // marginTop: 10,
    // marginBottom: 1,
    // padding: '3%',
    // paddingLeft: 8,
  },
  selectListDropdown: {
    borderRadius: 0,
    borderWidth: 0,
  },
  opacity: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
});
