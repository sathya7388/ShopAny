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
// import {Searchbar,Avatar} from 'react-native-paper';
import Card from '../components/card';
import {getVendor, contains} from '../utilities/ApiService';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import _ from 'lodash';

export default class HomeScreen extends Component {
  constructor (props) {
    super (props);

    this.state = {
      location: null,
      loading: false,
      data: [],
      error: null,
      query: '',
      fullData: [],
    };
  }

  componentDidMount () {
    this.makeRemoteRequest ();
  }

  makeRemoteRequest = () => {
    this.setState ({loading: true});
    getVendor (20, this.state.query)
      .then (vendors => {
        this.setState ({
          loading: false,
          data: vendors,
          fullData: vendors,
        });
      })
      .catch (error => {
        this.setState ({error, loading: false});
      });
  };

  searchHandler = text => {
    const formattedQuery = text.toLowerCase ();
    const searchData = _.filter (this.state.fullData, user => {
      return contains (user, formattedQuery);
    });
    this.setState ({query: formattedQuery, data: searchData}, () =>
      this.makeRemoteRequest ()
    );
  };
  render () {
    const renderItem = ({item}) => <Card data={item} />;
    return (
      <SafeAreaView>

        <FlatList
          // contentContainerStyle={{flexDirection:'row'}}
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          ListHeaderComponent={this.searchHeader}
        />
      </SafeAreaView>
    );
  }

  searchHeader = () => {
    return (
      <View style={styles.headerContainer}>

        <Text style={styles.appName}>ShopAny</Text>
        <TextInput
          style={styles.searchBar}
          onChangeText={this.searchHandler}
          placeholder="Search"
          clearButtonMode="always"
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate ('FilterScreen')}
        >
          <Image
            source={require ('../assets/images/filter.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => this.props.navigation.navigate ('ProfileScreen')}
        > */}
          <Avatar
            size="small"
            rounded
            title="MT"
            containerStyle={{backgroundColor: 'gray'}}
            onPress={() => this.props.navigation.navigate ('ProfileScreen')}
            // activeOpacity={1.0}
          />
        {/* </TouchableOpacity> */}

      </View>
    );
  };
}
const styles = StyleSheet.create ({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    elevation: 8,
    height: hp (8),
    alignItems: 'center',
  },
  appName: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#008075',
  },
  searchBar: {
    marginHorizontal: 10,
    // marginLeft:10,
    // marginRight:5,
    borderColor: 'gray',
    borderWidth: 0.5,
    width: wp (57),
    height: hp (5),
    borderRadius: 8,
  },
  icon: {
    height: hp(2.5),
    width: wp(6),
    justifyContent: 'flex-end',
    marginRight:5,
    // marginHorizontal: 5,
  },
  // headerCol: {
  //   justifyContent: 'center',
  //   marginLeft: 10,
  // },
  // headerRow: {
  //   flexDirection: 'row',
  // },
  //
  // header: {
  //   height: 40,
  //   elevation: 8,
  //   // paddingHorizontal: 16,
  // },
  // header_inner: {
  //   flex: 1,
  //   height: 50,
  //   overflow: 'hidden',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   position: 'relative',
  // },
  // appName: {
  //   marginLeft: 10,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   color: '#008075',
  // },
  // searchText: {
  //   height: 35,
  //   borderColor: 'gray',
  //   borderWidth: 0.5,
  //   marginVertical: 15,
  //   marginHorizontal: 20,
  //   marginRight: 10,
  //   borderRadius: 8,
  //   width: 250,
  // },
  // icon: {
  //   height: 20,
  //   width: 20,
  //   justifyContent: 'flex-end',
  //   marginHorizontal: 5,
  // },
});
