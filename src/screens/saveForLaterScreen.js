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

export default function CartScreen () {
  return (
    <ScrollView>
      <CartCard />
      <CartCard />
      <CartCard />
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
