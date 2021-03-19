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
  ActivityIndicator,
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
      filterCategory: '0',
      fromPrice: '',
      toPrice: '',
      sortBy: '',
    };
  }
  componentDidMount () {
    const unsubscribe = this.props.navigation.addListener ('focus', () => {
      this.makeRemoteRequest ();
    });
    return unsubscribe;
  }
  componentWillUnmount () {
    this._isMounted = false;
  }

  filter = products => {
    let filterByCatResp = this.filterByCategory (products);
    let filterByPriceResp = this.filterByPrice (filterByCatResp);
    let sortedArray = filterByPriceResp;
    if (this.props.route.params.filter.sortBy == 'low') {
      sortedArray = this.sortByLowestFirst (filterByPriceResp);
    } else if (this.props.route.params.filter.sortBy == 'high') {
      sortedArray = this.sortByHighestFirst (filterByPriceResp);
    }
    return sortedArray;
  };

  filterByCategory = products => {
    let tempData = Array.from (products);
    let filterData = [];

    if (this.props.route.params.filter.category == 0) {
      return tempData;
    }

    for (let i = 0; i < products.length; i++) {
      if (this.props.route.params.filter.category == tempData[i].categoryId) {
        filterData.push (tempData[i]);
      }
    }
    return filterData;
  };

  filterByPrice = products => {
    let tempData = Array.from (products);
    let filterData = [];

    if (
      this.props.route.params.filter.fromPrice == '' &&
      this.props.route.params.filter.toPrice == ''
    ) {
      return tempData;
    }

    for (let i = 0; i < products.length; i++) {
      if (
        parseFloat (tempData[i].price) >=
          parseFloat (this.props.route.params.filter.fromPrice) &&
        parseFloat (tempData[i].price) <=
          parseFloat (this.props.route.params.filter.toPrice)
      ) {
        filterData.push (tempData[i]);
      }
    }
    return filterData;
  };

  sortByLowestFirst = products => {
    let allProducts = Array.from (products);
    let sortedArray = [];
    while (allProducts.length > 0) {
      let index = this.findLowest (allProducts);
      sortedArray.push (allProducts[index]);
      allProducts.splice (index, 1);
    }
    return sortedArray;
  };

  sortByHighestFirst = products => {
    let sortedArray = this.sortByLowestFirst (products);
    let descSortedArray = sortedArray.reverse ();
    return descSortedArray;
  };

  findLowest = products => {
    let cheapestProduct = products[0];
    let cheapestProductIndex = 0;
    for (let i = 1; i < products.length; i++) {
      if (cheapestProduct.price > products[i].price) {
        cheapestProduct = products[i];
        cheapestProductIndex = i;
      }
    }
    return cheapestProductIndex;
  };

  makeRemoteRequest = () => {
    this._isMounted = true;
    this.setState ({loading: true});
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
          if (this.props.route.params) {
            let filterResp = this.filter (data.products);
            this.setState ({
              filterCategory: this.props.route.params.filter.category,
              fromPrice: this.props.route.params.filter.fromPrice,
              toPrice: this.props.route.params.filter.toPrice,
              sortBy: this.props.route.params.filter.sortBy,
              data: Array.from (filterResp),
              backup: data.products,
            });
          } else {
            this.setState ({data: data.products, backup: data.products});
          }
        }
      })
      .catch (err => {
        console.log ('fetch error' + err);
      }).finally (() => {
        this.setState ({loading: false});
      });
  };

  searchHandler = text => {
    const formattedQuery = text.toLowerCase ();
    const filterData = this.state.backup;
    let filterResult = filterData.filter (item => {
      if (item.name.toLowerCase ().match (formattedQuery)) {
        return item;
      }
    });
    this.setState ({data: filterResult});
  };
  render () {
    const renderItem = ({item}) => <Card data={item} />;
    if (this.state.loading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.safeView}>
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
          onPress={() =>
            this.props.navigation.navigate ('FilterScreen', {
              filter: {
                category: this.state.filterCategory,
                fromPrice: this.state.fromPrice,
                toPrice: this.state.toPrice,
                sortBy: this.state.sortBy,
              },
            })}
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
  activity: {
    height: hp (100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeView:{
    backgroundColor: '#ffffff',
    height: hp (100),
  },
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
