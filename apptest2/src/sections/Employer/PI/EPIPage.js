import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {logout} from '../../Candidate/chat/component/Websocket';

const EPIPage = ({navigation}) => {
  const onPressSwitchMode = () => {
    navigation.replace('candidatePage');
  };
  const onPressLogout = () => {
    logout();
    navigation.replace('loginPage');
  };
  const onPressCollect = () => {
    navigation.navigate('EPICollectionPage');
  };
  return (
    <View style={styles.page}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={onPressSwitchMode}>
        <View style={[styles.buttonIconContainer]}>
          <FontAwesome5 name="exchange-alt" style={styles.buttonIcon} />
        </View>
        <Text style={styles.buttonText}>切換為應徵者模式</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPressCollect}>
        <View style={[styles.buttonIconContainer]}>
          <AntDesign name="heart" style={styles.buttonIcon} />
        </View>
        <Text style={styles.buttonText}>收藏</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={onPressLogout}>
        <View style={styles.buttonIconContainer}>
          <MaterialCommunityIcons
            name="logout"
            style={[
              styles.buttonIcon,
              {fontSize: 30},
              {transform: [{rotateY: '180deg'}]},
            ]}
          />
        </View>
        <Text style={styles.buttonText}>登出</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EPIPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(246,247,241)',
  },
  userInformationContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  userInformationText: {
    color: 'black',
    fontSize: 20,
  },
  userImage: {
    fontSize: 65,
    marginVertical: 18,
    color: 'rgb(195,153,103)',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'gray',
    padding: 8,
    margin: 10,
    marginHorizontal: 15,
  },
  buttonIconContainer: {
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CFA889',
  },
  buttonIcon: {
    fontSize: 25,
    color: 'white',
  },
  buttonText: {
    fontSize: 20,
    marginLeft: 10,
    // color: 'black',
  },
});
