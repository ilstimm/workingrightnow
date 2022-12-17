import * as React from 'react';
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import informations from './informations.json';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CollectionItem = ({item}) => {
  const [heart, setHeart] = React.useState(true);
  const change = () => setHeart(heart => !heart);

  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View style={styles.item}>
        <View style={styles.text}>
          <Text style={{color: 'black', fontSize: 28}}>{item.title}</Text>
          <Text>{item.user}</Text>
          <Text>{item.region}</Text>
        </View>
        <View style={styles.heart}>
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
      </View>
    </TouchableOpacity>
  );
};
const CPICollectionPage = ({navigation}) => {
  headerComponent = () => {
    return <Text style={styles.headerline}>收藏</Text>;
  };

  separator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={headerComponent}
        ListHeaderComponentStyle={styles.header}
        data={informations}
        renderItem={({item}) => <CollectionItem item={item} />}
        ItemSeparatorComponent={separator}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginLeft: 3,
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 13,
    elevation: 1,
  },

  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },

  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerline: {
    color: 'black',
    width: '100%',
    backgroundColor: 'orange',
    fontSize: 50,
    textAlign: 'center',
  },
  text: {
    flex: 8,
  },
  heart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 2,
    // backgroundColor:'black'
  },
});

export default CPICollectionPage;
