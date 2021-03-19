import React, {useState, useEffect} from 'react';
import {View, FlatList, TouchableOpacity, Text,StyleSheet,ActivityIndicator} from 'react-native';
import OrderCard from '../components/orderComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function PastOrderScreen (props) {
  const [orderData, setOrderData] = useState ([]);
  const [isLoading, setLoading] = useState (false);
  // let orderData = [];
  // let url = 'shopany-api.herokuapp.com/api/user/60518967ed36fa05ec9b4ef1/orders';

  useEffect (
    () => {
      const unsubscribe = props.navigation.addListener ('focus', () => {
        setLoading (true)
        const requestOptions = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };

        fetch (
          'https://shopany-api.herokuapp.com/api/user/60518967ed36fa05ec9b4ef1/orders',
          requestOptions
        )
          .then (response => {
            return response.json ();
          })
          .then (responseData => {
            let tempArray = [];
            for (var i = 0; i < responseData.orders.length; i++) {
              if (responseData.orders[i].status == 4) {
                tempArray.push (responseData.orders[i]);
              }
            }

            setOrderData (tempArray);
            // console.log(tempArray);
          })
          .catch (error => {
            // console.error (error)
          })
          .finally (() => {
            setLoading (false)
          });
      });
      return unsubscribe;
    },
    [props.navigation]
  );

  const renderItem = ({item}) => <OrderCard data={item} />;
  if (isLoading) {
    console.log('past spinner')
    return (
      <View style={order.activity}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (orderData.length > 0) {
    return (
      <View style={{alignItems: 'center'}}>
        <SafeAreaView>
          <FlatList
            data={orderData}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        </SafeAreaView>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: hp (4)}}>
          There are no Past Orders
        </Text>
        {/* <Text>Add items in Cart</Text> */}
        <TouchableOpacity
          style={order.shopNow}
          onPress={() => navigation.navigate ('HomeScreen')}
        >
          <Text style={order.txtPlaceOrder}>Shop Now</Text>
        </TouchableOpacity>
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
});
