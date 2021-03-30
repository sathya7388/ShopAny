import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Data from '../data';

export default function CheckOutCard (props) {
  let prodPrice = props.data.price * props.data.prodQuantity;
  let sellerId = props.data.sellerId;
  let sellerNameValue = '';
  for (var i = 0; i < Data.sellerName.length; i++) {
    if (Data.sellerName[i].id == sellerId) {
      sellerNameValue = Data.sellerName[i].name;
    }
  }
  return (
    <View style={cardStyle.container}>
      <View style={cardStyle.cartContainer}>
        <View style={cardStyle.cartCard}>
          <View style={cardStyle.cartContent}>
            <Text style={cardStyle.prodName}>{props.data.name}</Text>
            <Text style={cardStyle.sellerName}>
              {'Seller : ' + sellerNameValue}
            </Text>
            <Text style={cardStyle.sellerName}>
              {'Quantity :' + props.data.prodQuantity}
            </Text>
            <Text style={cardStyle.prodPrice}>
              {'$' + prodPrice.toFixed (2)}
            </Text>

          </View>
          <View style={cardStyle.cartImageView}>
            <Image
              source={{uri: props.data.images[0]}}
              style={cardStyle.cartImage}
            />
          </View>
        </View>
        <View style={cardStyle.lineStyle} />
        <View style={cardStyle.delivery}>
          <Text style={cardStyle.sellerName}>Canada Post</Text>
          <Text style={cardStyle.sellerName}>
            {'This item will be delivered in ' +
              props.data.expectedDeliveryDate +
              ' days'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const cardStyle = StyleSheet.create ({
  container: {
    elevation: 5,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 10,
    paddingTop: 5,
  },
  cartContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  cartCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
  },
  cardColumn: {
    flexDirection: 'column',
  },
  cartContent: {
    width: wp ('50%'),
    flexDirection: 'column',
  },
  prodName: {
    fontSize: 15,
    marginBottom: 5,
  },
  sellerName: {
    fontSize: 10,
    color: '#808080',
  },
  prodPrice: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartImageView: {
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
  cartImage: {
    width: wp (30),
    height: hp (11),
  },

  lineStyle: {
    backgroundColor: '#E0E0E0',
    height: 1,
    marginHorizontal: 10,
  },
  delivery: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
  txtPlaceOrder: {
    fontSize: 14,
    color: '#fff',
    alignSelf: 'center',
  },
});
