import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import ResumeItem from './ResumeItem';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import resumeJobData from '../../../components/data/resumeJobData.json';

export default function EmployerSearchScreen({navigation}) {
  const token = useSelector(state => state.token);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');
  const [nature, setNature] = useState([]);
  const [filter, setFilter] = useState([]);
  const [state, setState] = useState(true);
  const [recommendState, setRecommendState] = useState(false);
  console.log('SearchPage = ' + token.token);

  const onPressHandler = () => {
    setState(state => !state);
    // console.log('n: ' + nature);
  };

  useEffect(() => {
    setFilter(nature);
    setSearch(value);
  }, [state]);

  const recommendButton = () => {
    setRecommendState(recommendState => !recommendState);
  };

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
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center'}}
              activeOpacity={0.5}
              onPress={recommendButton}>
              <Text style={{color: recommendState ? 'orange' : 'gray'}}>
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
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
            // showsVerticalScrollIndicator={false}
            style={styles.resumeFormsListView}>
            <ResumeItem
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
    backgroundColor: '#eeeeee',
  },
  body: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  searchView: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
  },
  blockView: {
    flex: 1,
    backgroundColor: '#bbbbbb',
  },
  searchInput: {
    flex: 8,
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
