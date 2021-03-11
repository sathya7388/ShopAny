import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function CheckOutCard (props) {
  const [prodPrice, setPrice] = useState (30);
  // console.log('called');
  // console.log(props.data);
  return (
    <View style={cardStyle.container}>
      <View style={cardStyle.cartContainer}>
      <View style={cardStyle.cartCard}>
          <View style={cardStyle.cartContent}>
            <Text style={cardStyle.prodName}>{props.data.name}</Text>
            <Text style={cardStyle.sellerName}>Seller : ABC sellers</Text>
            <Text style={cardStyle.sellerName}>Quantity : 1</Text>
            <Text style={cardStyle.prodPrice}>{'$' + props.data.price}</Text>

          </View>
          {/* <View style={cardStyle.cartAdjust}> */}
          <View style={cardStyle.cartImageView}>
            <Image
              source={{uri: props.data.vendor_banner_image}}
              style={cardStyle.cartImage}
            />
          </View>
          {/* </View> */}
        </View>
        <View style={cardStyle.lineStyle} />
        <View style={cardStyle.delivery}>
          <Text style={cardStyle.sellerName}>Canada Post</Text>
          <Text style={cardStyle.sellerName}>This item will be delivered in 2 days</Text>
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
    // marginVertical: 10,
    marginBottom: 10,
    paddingTop: 5,
  },
  cartContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 8,
    // elevation: 5,
  },
  cartCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
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
    // right: 20,
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'column',
    // position: 'absolute',
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
  delivery:{
    paddingLeft:20,
    paddingVertical:10,
  },
  txtPlaceOrder: {
    fontSize: 14,
    color: '#fff',
    alignSelf: 'center',
  },
});
