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
    navigation.navigate('AddResumes', resumeObject);
  };

  return (
    <View style={styles.body}>
      <View style={styles.textInputView}>
        <Text style={styles.text}>Resume</Text>
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
