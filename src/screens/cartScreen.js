import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CartCard from '../components/cartCard';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

export default function CartScreen () {
  const navigation = useNavigation ();
  return (
    <ScrollView>
      <View style={{flex: 1, flexDirection: 'column',}}>
        <CartCard />
        <CartCard />
        {/* <CartCard /> */}
        {/* <CartCard /> */}
        <View style={cart.priceBreakdown}>
          <Text>Price Detail</Text>
          <View
            style={{
              backgroundColor: '#A9A9A9',
              height: 0.5,
              marginVertical: 3,
            }}
          />
          <View style={cart.priceDetailRow}>
            <Text style={cart.priceBDText}>Price</Text>
            <Text style={cart.priceBDValue}>$1525</Text>
          </View>
          <View style={cart.priceDetailRow}>
            <Text style={cart.priceBDText}>Discount</Text>
            <Text style={cart.priceBDValue}>-$0</Text>
          </View>
          <View style={cart.priceDetailRow}>
            <Text style={cart.priceBDText}>Delivery Charges</Text>
            <Text style={cart.priceBDValue}>Free</Text>
          </View>
          <View
            style={{
              backgroundColor: '#A9A9A9',
              height: 0.5,
              marginVertical: 5,
            }}
          />
          <View style={cart.priceDetailRow}>
            <Text>Total Amount</Text>
            <Text style={cart.priceBDValue}>$1525</Text>
          </View>

        </View>
        <View
          style={{
            backgroundColor: '#000000',
            height: 0.5,
          }}
        />
        <View style={cart.btnorderview}>
          <TouchableOpacity style={cart.btnPlaceOrderContainer}
           onPress={() => navigation.navigate ('CheckoutScreen')}>
            <Text style={cart.txtPlaceOrder}>Continue to Checkout</Text>
          </TouchableOpacity>
        </View>

      </View>

    </ScrollView>
  );
}
const cart = StyleSheet.create ({
  lineStyle: {
    backgroundColor: '#E0E0E0',
    height: 8,
  },
  priceBreakdown: {
    flexDirection: 'column',
    width: wp (100),
    height: hp (18),
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingBottom: 0,
    paddingHorizontal: 10,
  },
  priceDetailRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  priceBDText: {
    flexDirection: 'column',
    fontSize: 12,
    color: '#808080',
  },
  priceBDValue: {
    fontSize: 12,
    color: '#808080',
    // paddingVertical: 10,
    flexDirection: 'column',
    right: 50,
    position: 'absolute',
  },
  btnorderview: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'center',
  },
  btnPlaceOrderContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 2,
    paddingVertical: 4,
    paddingHorizontal: 30,
    width: wp (80),
  },
  txtPlaceOrder: {
    fontSize: 14,
    color: '#fff',
    alignSelf: 'center',
  },
  saveView: {
    alignItems: 'center',
    flexDirection: 'row',
    width: wp (100),
    height: hp (5),
    backgroundColor: '#E0E0E0',
  },
  saveTitle: {
    marginLeft: 10,
  },
});
