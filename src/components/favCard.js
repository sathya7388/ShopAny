import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AirbnbRating} from 'react-native-ratings';

export default function FavCard({data, removeFromFav, addToCart}) {
  const removeFav = function () {
    // console.log('card remove')
    removeFromFav (data);
  };
  const addCart = function () {
    addToCart (data);
  };
  return (
    <View style={favStyle.container}>
      <View style={favStyle.prodRow}>
        <View style={favStyle.prodCol}>
          <Image
            source={{uri: data.images[0]}}
            // source={require ('../assets/images/one.jpg')}
            style={favStyle.orderImage}
          />
        </View>
        <View style={favStyle.prodCol}>
          <Text numberOfLines={4} style={favStyle.lblProdName}>
            {data.name}
          </Text>
          <Text style={favStyle.allLblValue}>{'$' + data.price}</Text>
          <AirbnbRating
            count={5}
            isDisabled={true}
            defaultRating={data.rating}
            size={15}
            showRating={false}
            starContainerStyle={favStyle.starRating}
          />
        </View>
      </View>
      <View style={favStyle.lineStyle} />
      <View style={favStyle.btnorderview}>
        <TouchableOpacity
          onPress={addCart}
          style={favStyle.btnPlaceOrderContainer}
        >
          <Text style={favStyle.txtPlaceOrder}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={removeFav}
          style={favStyle.btnPlaceOrderContainer}
        >
          <Text style={favStyle.txtPlaceOrder}>Remove</Text>
        </TouchableOpacity>
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
  starRating: {
    left: 0,
    marginVertical: 10,
    alignSelf: 'flex-start',
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
    justifyContent: 'center',
    borderRadius: 8,
  },
  lblProdName: {
    fontSize: 13,
  },
  allLblValue: {
    marginTop: 5,
    fontSize: 11,
  },
  btnPlaceOrderContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 5,
    paddingVertical: 4,
    marginHorizontal: 20,
    width: wp (30),
  },
  txtPlaceOrder: {
    fontSize: 12,
    color: '#fff',
    alignSelf: 'center',
  },
  lineStyle: {
    backgroundColor: '#E0E0E0',
    height: 1,
    marginHorizontal: 10,
  },
});
