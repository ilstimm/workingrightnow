import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import JobItem from './JobItem';
import jobObject from '../../../components/data/resumeJobData.json';
import {useDispatch} from 'react-redux';

const JoblistPage = ({navigation}) => {
  const dispatch = useDispatch();
  const onPressHandler = () => {
    navigation.navigate('AddJobs', {jobObject: jobObject, mode: 'add'});
  };
  return (
    <View style={styles.body}>
      <View style={styles.textInputView}>
        <Text style={styles.text}>工作需求表</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            onPressHandler();
          }}
          style={styles.opacity}>
          <Text style={styles.text}>新增需求</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.informations}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <JobItem navigation={navigation} dispatch={dispatch} />
        </ScrollView>
      </View>
    </View>
  );
};

export default JoblistPage;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'rgb(246,247,241)',
  },
  textInputView: {
    backgroundColor: 'rgb(238,169,112)',
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    margin: 10,
  },
  informations: {
    padding: 2,
    flex: 5,
  },
  opacity: {
    alignItems: 'center',
  },
});
