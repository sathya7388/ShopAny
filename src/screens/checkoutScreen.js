import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

export default function CheckoutScreen () {
  const navigation = useNavigation ();
  return (
    <View>
      <View>
        <Text style={{fontWeight:'bold',paddingLeft:10,paddingTop:10,}}>Shipping Address</Text>
      </View>
      <View style={checkoutStyle.addressRow}>
        <Text style={{fontWeight:'bold',paddingBottom:5,}}>Jon Snow</Text>
        <Text style={checkoutStyle.priceBDText}>221, Mammoth Hall Dr</Text>
        <Text style={checkoutStyle.priceBDText}>Scarborough, ON</Text>
        <Text style={checkoutStyle.priceBDText}>M1K 1B6</Text>
      </View>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <View style={checkoutStyle.priceBreakdown}>
          <Text>Price Detail</Text>
          <View
            style={{
              backgroundColor: '#A9A9A9',
              height: 0.5,
              marginVertical: 3,
            }}
          />
          <View style={checkoutStyle.priceDetailRow}>
            <Text style={checkoutStyle.priceBDText}>Price</Text>
            <Text style={checkoutStyle.priceBDValue}>$1525</Text>
          </View>
          <View style={checkoutStyle.priceDetailRow}>
            <Text style={checkoutStyle.priceBDText}>Discount</Text>
            <Text style={checkoutStyle.priceBDValue}>-$0</Text>
          </View>
          <View style={checkoutStyle.priceDetailRow}>
            <Text style={checkoutStyle.priceBDText}>Delivery Charges</Text>
            <Text style={checkoutStyle.priceBDValue}>Free</Text>
          </View>
          <View
            style={{
              backgroundColor: '#A9A9A9',
              height: 0.5,
              marginVertical: 5,
            }}
          />
          <View style={checkoutStyle.priceDetailRow}>
            <Text>Total Amount</Text>
            <Text style={checkoutStyle.priceBDValue}>$1525</Text>
          </View>

        </View>
        <View
          style={{
            backgroundColor: '#000000',
            height: 0.5,
          }}
        />
        <View style={checkoutStyle.btnorderview}>
          <TouchableOpacity style={checkoutStyle.btnPlaceOrderContainer}>
            <Text style={checkoutStyle.txtPlaceOrder}>
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const checkoutStyle = StyleSheet.create ({
  addressRow: {
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 8,
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
    width: wp (100),
  },
  btnPlaceOrderContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 2,
    paddingVertical: 4,
    paddingHorizontal: 30,
    width: wp (60),
  },
  txtPlaceOrder: {
    fontSize: 14,
    color: '#fff',
    alignSelf: 'center',
  },
});
