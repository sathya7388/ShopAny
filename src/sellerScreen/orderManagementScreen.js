import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import OrderCard from '../components/orderComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Data from '../data';

export default function OrderManagementScreen (props) {
  const [orderData, setOrderData] = useState ([]);
  const [isLoading, setLoading] = useState (false);
  useEffect (
    () => {
      const unsubscribe = props.navigation.addListener ('focus', () => {
        setLoading (true);
        const requestOptions = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };

        fetch (
          'https://shopany-api.herokuapp.com/api/seller/' +
            Data.currentUser[0]._id +
            '/orders',
          requestOptions
        )
          .then (response => {
            return response.json ();
          })
          .then (responseData => {
            let tempArray = [];
            for (var i = 0; i < responseData.orders.length; i++) {
              tempArray.push (responseData.orders[i]);
            }
            setOrderData (tempArray);
          })
          .catch (error => {
            console.error (error)
          })
          .finally (() => {
            setLoading (false);
          });
      });
      return unsubscribe;
    },
    [props.navigation]
  );

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate ('UpdateOrder', item)}
      >
        <OrderCard data={item} isSeller={true} />
      </TouchableOpacity>
    );
  };

  if (orderData.length > 0) {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={order.headerContainer}>
          <View style={order.headerCol}>
            <Text style={order.appName}>Orders</Text>
          </View>
        </View>
        <SafeAreaView>
          {isLoading
            ? <View style={order.activity}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            : <FlatList
                data={orderData}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={{
                  paddingBottom: 130,
                }}
              />}

        </SafeAreaView>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={order.headerContainer}>
          <View style={order.headerCol}>
            <Text style={order.appName}>Orders</Text>
          </View>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: hp (4),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          No active orders
        </Text>
      </View>
    );
  }
}

const order = StyleSheet.create ({
  activity: {
    height: hp (100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopNow: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 2,
    marginVertical: 15,
    paddingVertical: 4,
    paddingHorizontal: 30,
    width: wp (40),
  },
  txtPlaceOrder: {
    fontSize: 14,
    color: '#fff',
    alignSelf: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    elevation: 8,
    height: hp (7),
    width: wp (100),
  },
  headerCol: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  appName: {
    fontSize: 23,
    color: '#000000',
  },
});
