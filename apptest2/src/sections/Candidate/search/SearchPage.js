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
import {Pressable} from 'react-native';

export default function SearchPage({navigation}) {
  const token = useSelector(state => state.token);
  const userResumeData = useSelector(state => state.userResumeData);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');
  const [nature, setNature] = useState([]);
  const [filter, setFilter] = useState([]);
  const [recommendState, setRecommendState] = useState(false);
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

  const recommendButton = () => {
    setRecommendState(recommendState => !recommendState);
  };

  useEffect(() => {
    setFilter(nature);
    setSearch(value);
  }, [state]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.body}>
        <ScrollView style={{backgroundColor: '#ffffff'}}>
          <View style={styles.searchView}>
            <TextInput
              style={styles.searchInput}
              placeholder={'輸入關鍵字'}
              onChangeText={value => setValue(value)}
              // onChangeText={search => setSearch(search)}
              onSubmitEditing={onPressHandler}
              value={value}
            />
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center'}}
              activeOpacity={0.5}
              onPress={recommendButton}>
              <Text style={{color: recommendState ? 'orange' : 'white'}}>
                {'推薦'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.blockView}>
            <MultipleSelectList
              setSelected={nature => setNature(nature)}
              data={resumeJobData}
              save="value"
              placeholder={'選擇工作性質'}
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
              recommendState={recommendState}
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
    backgroundColor: '#ffffff',
  },
  body: {
    flex: 1,
  },
  searchView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#rgb(90,148,148)',
  },
  blockView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchInput: {
    flex: 8,
    height: 40,
    wight: '70%',
    fontSize: 15,
    paddingLeft: 8,
    color: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 30,
  },
  selectListBox: {
    flex: 1,
    borderRadius: 2,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    borderWidth: 0,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#ffffff',
  },
  opacity: {
    alignItems: 'center',
    backgroundColor: '#rgb(140,198,198)',
    // borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
});
