import {StackActions} from '@react-navigation/native';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';

const CollectionItem = ({navigation, item, token, userId}) => {
  const pushAction = StackActions.push('CJobDetailPage', item);
  const [heart, setHeart] = React.useState(true);
  const change = () => {
    setHeart(heart => !heart);
  };
  useEffect(() => {
    if (!heart) {
      console.log('heart: ' + heart);
      const url =
        'http://tim.ils.tw:80/project/auth/removeJobCollect/' +
        userId.userId +
        '/' +
        item.userID +
        '/' +
        item.createTime;

      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: 'Bearer ' + token.token,
        },
      };
      fetch(url, options);
    }
  }, [change]);

  function toDetailPage(){
    if(item.shelvesStatus){
        navigation.dispatch(pushAction);
    }
    else{
      Alert.alert('錯誤!!', '該需求已關閉', [
        {text: 'Ok!', onPress: () => {console.log('cancel')}}
      ]);
    }
  };

  return (
    <View style={item.shelvesStatus? styles.itemView : styles.itemCloseView}>
      <TouchableOpacity activeOpacity={0.5} onPress={toDetailPage}>
        <View style={styles.text}>
          <Text style={{color: 'black', fontSize: 20}}>{item.title}</Text>
          <Text>{item.user}</Text>
          <Text>{item.region}</Text>
        </View>
        <View style={styles.heartView}>
          <TouchableOpacity onPress={change}>
            <View>
              {heart ? (
                <AntDesign name="heart" style={{color: 'red', fontSize: 20}} />
              ) : (
                <AntDesign
                  name="hearto"
                  style={{color: 'gray', fontSize: 20}}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CPICollectionPage = ({navigation}) => {
  const [returnValue, setReturnValue] = useState('');
  const userId = useSelector(state => state.userId);
  const token = useSelector(state => state.token);
  useEffect(() => {
    const url =
      'http://tim.ils.tw:80/project/auth/getJobCollect/' + userId.userId;
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: 'Bearer ' + token.token,
      },
    };
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        console.log('data: ' + data);
        let a = (
          <SafeAreaView style={{flex: 1}}>
            <View>
              <FlatList
                style={{paddingTop: 15}}
                data={data}
                numColumns={2}
                renderItem={({item}) => (
                  <CollectionItem
                    navigation={navigation}
                    item={item}
                    token={token}
                    userId={userId}
                  />
                )}
                inverted
              />
            </View>
          </SafeAreaView>
        );
        setReturnValue(a);
      });
  }, []);
  return returnValue;
};

const styles = StyleSheet.create({
  itemView: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderRadius: 10,
    backgroundColor: '#rgb(140,198,198)',
    paddingVertical: 13,
    paddingHorizontal: 5,
    margin: 3,
  },
  itemCloseView: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#aaaaaa',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    paddingVertical: 13,
    paddingHorizontal: 5,
    margin: 3,
  },

  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerline: {
    color: 'black',
    width: '100%',
    backgroundColor: '#339144',
    fontSize: 45,
    padding: 10,
    textAlign: 'center',
  },
  text: {
    flex: 8,
  },
  heartView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
});

export default CPICollectionPage;
