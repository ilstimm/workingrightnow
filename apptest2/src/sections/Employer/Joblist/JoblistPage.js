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

const JoblistPage = ({navigation}) => {
  const onPressHandler = () => {
    navigation.navigate('AddJobs', {jobObject: jobObject, mode: 'add'});
  };
  return (
    <View style={styles.body}>
      <View style={styles.textInputView}>
        <Text style={styles.text}>Job</Text>
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
          <JobItem navigation={navigation} />
        </ScrollView>
      </View>
    </View>
  );
};

export default JoblistPage;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  textInputView: {
    flex: 1,
    borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  informations: {
    flex: 5,
    borderWidth: 1,
  },
  opacity: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
  },
});
