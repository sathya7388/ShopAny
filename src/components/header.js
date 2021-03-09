import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
// import {Searchbar,Avatar} from 'react-native-paper';

export default function homeCard (props) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerCol}>
        <Text style={styles.appName}>ShopAny</Text>
      </View>
      <View style={styles.headerCol}>
        <TextInput
          style={styles.searchBar}
        //   onChangeText={this.searchHandler}
          placeholder="Search"
          clearButtonMode="always"
        />
        {/* <Searchbar
          placeholder="Search"
          onChangeText={this.searchHandler}
          // value={searchQuery}
          style={styles.searchBar}
        /> */}
      </View>
      <View style={styles.headerCol}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate ('FilterScreen')}
          >
            <Image
              source={require ('../assets/images/filter.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          {/* <Avatar.Image
            size={24}
            source={require ('../assets/images/account.png')}
            style={{backgroundColor: 'lightgray'}}
          />
          <Avatar
            style={{backgroundColor: 'black'}}
            size="small"
            rounded
            title="MT"
            onPress={() => this.props.navigation.navigate ('ProfileScreen')}
            activeOpacity={0.8}
          /> */}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create ({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    elevation: 8,
    height: hp (8),
    // width: wp(100),
  },
  headerCol: {
    justifyContent: 'center',
    // alignItems:'center',
    marginLeft: 10,
  },
  headerRow: {
    flexDirection: 'row',
  },
  searchBar: {
    borderColor: 'gray',
    borderWidth: 0.5,
    width: wp (55),
    height: hp (5),
    borderRadius: 8,
  },
  appName: {
    // marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#008075',
  },
});
