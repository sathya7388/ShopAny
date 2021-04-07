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
  StatusBar,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Card from '../components/card';
import * as Data from '../data';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
      filterCategory: 'Select Category',
      fromPrice: '',
      toPrice: '',
      sortBy: '',
      avatarTitle: '',
    };
  }
  componentDidMount () {
    const unsubscribe = this.props.navigation.addListener ('focus', () => {
      this.makeRemoteRequest ();
      var title = Data.currentUser[0].name.charAt (0).toUpperCase ();
      this.setState ({avatarTitle: title});
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

    if (this.props.route.params.filter.category == 'Select Category') {
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
        toPrice: 3000000,
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
      })
      .finally (() => {
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
    return (
      <SafeAreaView style={styles.safeView}>
        <StatusBar animated={true} backgroundColor="#81c784" hidden={false} />
        <View style={styles.headerContainer}>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              alignItems: 'center',
            }}
          >
            <Text style={styles.appName}>ShopAny</Text>
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
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
                title={this.state.avatarTitle}
                containerStyle={{backgroundColor: 'gray'}}
                onPress={() => this.props.navigation.navigate ('ProfileScreen')}
              />
            </View>
          </View>
          <View>
            <TextInput
              style={styles.searchBar}
              onChangeText={this.searchHandler}
              placeholder="Search"
              clearButtonMode="always"
            />
          </View>

        </View>
        {this.state.loading
          ? <View style={styles.activity}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          : <FlatList
              data={this.state.data}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              numColumns={2}
              contentContainerStyle={{
                paddingBottom: 20,
              }}
            />}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create ({
  activity: {
    height: hp (100),
    marginTop: 20,
    alignItems: 'center',
  },
  safeView: {
    backgroundColor: '#ffffff',
    height: hp (95),
    paddingBottom: hp (2),
  },
  headerContainer: {
    flexDirection: 'column',
    backgroundColor: '#81c784',
    elevation: 8,
    height: hp (15),
    padding: 10,
    // alignItems: 'center',
  },
  appName: {
    flex: 4,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchBar: {
    paddingBottom: 8,
    marginHorizontal: 10,
    // marginBottom:5,
    borderColor: 'gray',
    borderWidth: 0.5,
    width: wp (90),
    height: hp (5),
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingLeft: 20,
  },
  icon: {
    height: hp (3),
    width: wp (7),
    justifyContent: 'flex-end',
    marginRight: 5,
  },
});
