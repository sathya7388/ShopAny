import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AirbnbRating} from 'react-native-ratings';

export default function FavCard () {
  return (
    <View style={favStyle.container}>
      <View style={favStyle.prodRow}>
        <View style={favStyle.prodCol}>
          <Image
            source={require ('../assets/images/one.jpg')}
            style={favStyle.orderImage}
          />
        </View>
        <View style={favStyle.prodCol}>
          <Text numberOfLines={4} style={favStyle.lblProdName}>
            Product Name
          </Text>
          <Text style={favStyle.allLblValue}>$700</Text>
          <View style={favStyle.btnorderview}>
            <TouchableOpacity style={favStyle.btnPlaceOrderContainer}>
              <Text style={favStyle.txtPlaceOrder}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={favStyle.btnPlaceOrderContainer}>
              <Text style={favStyle.txtPlaceOrder}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const favStyle = StyleSheet.create ({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    width: wp (90),
    elevation: 5,
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  prodRow: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
  },
  prodCol: {
    flexDirection: 'column',
  },
  orderImage: {
    marginLeft: 10,
    marginRight: 20,
    width: wp (30),
    height: hp (10),
    alignSelf: 'flex-end',
  },
  btnorderview: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  lblProdName: {
    // marginTop: 10,
    fontSize: 13,
  },
  allLblValue: {
    fontSize: 11,
  },
  btnPlaceOrderContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 4,
    marginHorizontal: 2,
    width: wp (20),
  },
  txtPlaceOrder: {
    fontSize: 12,
    color: '#fff',
    alignSelf: 'center',
  },
});
