import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import SelectList from 'react-native-dropdown-select-list';
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
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');
  const [nature, setNature] = useState('');
  console.log('SearchPage = ' + token.token);
  console.log('nature: ' + nature);

  const searchApi = () => {
    // setSearch(value);
    console.log('search: ' + search);
  };

  useEffect(() => {
    setSearch(value);
  }, [searchApi]);

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
              onSubmitEditing={searchApi}
              value={value}
            />
          </View>
          <View style={styles.blockView}>
            {/* <SelectList
              setSelected={setNature}
              data={resumeJobData}
              placeholder={'選擇工作性質'}
              defaultOption={{key: '0', value: '及時工作'}}
              boxStyles={styles.selectListBox}
              dropdownStyles={styles.selectListDropdown}
            /> */}
            <SelectDropdown
              data={resumeJobData.map(item => item.value)}
              onSelect={nature => setNature(nature)}
            />
          </View>
        </ScrollView>
        <View style={styles.scrollView}>
          <View
            // showsVerticalScrollIndicator={false}
            style={styles.resumeFormsListView}>
            <CJobItem navigation={navigation} searchText={search} />
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
    flex: 1.5,
    backgroundColor: '#ffffff',
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
    borderRadius: 2,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 1.5,
    borderColor: 'gray',
    // marginTop: 10,
    // marginBottom: 1,
    padding: '3%',
    paddingLeft: 8,
  },
  selectListDropdown: {
    borderRadius: 0,
    // marginVertical: 10,
  },
});
