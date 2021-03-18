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
import Card from '../components/card';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import _ from 'lodash';

export default class HomeScreen extends Component {
  _isMounted = false;

  constructor (props) {
    super (props);

    this.state = {
      error: null,
      loading: false,
      query: '',
      data: [],
      backup: [],
    };
  }
  componentDidMount () {
    this.makeRemoteRequest ();
  }
  componentWillUnmount () {
    this._isMounted = false;
  }
  // this.props.navigation.state.params.filterOperation(){

  // }
  filterOperation () {
    // console.log ('filter called');
  }
  filterData = (value, fromPrice, toProce, category) => {
    // console.log ('filter called');
  };
  makeRemoteRequest = () => {
    this._isMounted = true;
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        fromPrice: 0,
        toPrice: 3000,
        category: '',
      }),
    };

    fetch ('https://shopany-api.herokuapp.com/api/products', requestOptions)
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        return responseData;
      })
      .then (data => {
        if (this._isMounted) {
          this.setState ({data: data.products});
          this.setState ({backup: data.products});
        }
      })
      .catch (err => {
        console.log ('fetch error' + err);
      });
  };

  searchHandler = text => {
    const formattedQuery = text.toLowerCase ();
    const filterData = this.state.backup;
    let filterResult = filterData.filter (item => {
      // console.log (item);
      if (item.name.toLowerCase ().match (formattedQuery)) {
        return item;
      }
    });
    this.setState ({data: filterResult});
  };
  render () {
    const renderItem = ({item}) => <Card data={item} />;
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
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
        <Avatar
          size="small"
          rounded
          title="MT"
          containerStyle={{backgroundColor: 'gray'}}
          onPress={() => this.props.navigation.navigate ('ProfileScreen')}
        />
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
    borderColor: 'gray',
    borderWidth: 0.5,
    width: wp (57),
    height: hp (5),
    borderRadius: 8,
  },
  icon: {
    height: hp (2.5),
    width: wp (6),
    justifyContent: 'flex-end',
    marginRight: 5,
  },
});
