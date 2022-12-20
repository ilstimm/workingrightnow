import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import ResumeItem from './ResumeItem';
import {useContext} from 'react';
import {OrderContext} from './ResumelistNavigator';
import {useSelector} from 'react-redux';
import resumeObject from '../../../components/resumeObject';

const ResumelistPage = ({navigation}) => {
  const onPressHandler = () => {
    navigation.navigate('AddResumes', {
      resumeObject: resumeObject,
      mode: 'add',
    });
  };

  return (
    <View style={styles.body}>
      <View style={styles.textInputView}>
        <Text style={styles.text}>履歷表</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            onPressHandler();
          }}
          style={styles.opacity}>
          <Text style={styles.text}>新增履歷</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.informations}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ResumeItem navigation={navigation} />
        </ScrollView>
      </View>
    </View>
  );
};

export default ResumelistPage;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'rgb(246,247,241)',
  },
  textInputView: {
    backgroundColor: 'rgb(90,148,148)',
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
