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
import Card from '../components/card';
import {getVendor, contains} from '../utilities/ApiService';

import _ from 'lodash';
import { withNavigation } from 'react-navigation';

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
        <View style={styles.header}>
          <View style={styles.header_inner}>
            <Text style={styles.appName}>ShopAny</Text>
            <TextInput
              style={styles.searchText}
              onChangeText={this.searchHandler}
              placeholder="Search Buzz"
              clearButtonMode="always"
            />
            <TouchableOpacity onPress={() => this.props.navigation.navigate ('FilterScreen')}>
              <Image
                source={require ('../assets/images/filter.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate ('CartScreen')}>
              <Image
                source={require ('../assets/images/cart.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          contentContainerStyle={{paddingBottom: 80}}
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={item => item.vendor_id}
          numColumns={2}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create ({
    header: {
      height: 40,
      // paddingHorizontal: 16,
    },
    header_inner: {
      flex: 1,
      height: 50,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
    },
    appName:{
      marginLeft:10,
      fontSize:18,
      fontWeight:'bold',
      color:'#008075'
      
    },
    searchText: {
      height: 35,
      borderColor: 'gray',
      borderWidth: 0.5,
      marginVertical:15,
      marginHorizontal: 20,
      marginRight:10,
      borderRadius: 8,
      width: 250,
    },
    icon: {
      height: 20,
      width: 20,
      justifyContent: 'flex-end',
      marginHorizontal:5
    },
    location: {
      marginHorizontal: 25,
      paddingVertical: 5,
    },
  });
  