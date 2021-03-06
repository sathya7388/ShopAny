import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function OrderCard (props) {
  return (
    <View style={orderStyle.container}>
      <View style={orderStyle.prodRow}>
        <View style={orderStyle.prodCol}>
          <Text numberOfLines={3} style={orderStyle.lblProdName}>Product Name</Text>
          <View style={orderStyle.textRowContainer}>
            <Text style={orderStyle.lblQtyName}>Quantity :</Text>
            <Text style={orderStyle.lblQtyValue}>1</Text>
          </View>
        </View>
        <View style={orderStyle.prodCol}>
          <View style={orderStyle.imageContainer}>
            <Image
              source={require ('../assets/images/one.jpg')}
              style={orderStyle.orderImage}
            />
          </View>
        </View>
      </View>
      <View style={orderStyle.textContainer}>
        <View style={orderStyle.textRowContainer}>
          <Text style={orderStyle.lblQtyName}>Order Total :</Text>
          <Text style={orderStyle.allLblValue}>$700</Text>
        </View>
        <View style={orderStyle.soldContainer}>
          <Text style={orderStyle.lblSellerName}>Sold and Shipped By</Text>
        </View>
        <View style={orderStyle.lineStyle} />
        <View style={orderStyle.textRowContainer}>
          <Text style={orderStyle.lblQtyName}>Order Number :</Text>
          <Text style={orderStyle.allLblValue}>1651321685</Text>
        </View>
        <View style={orderStyle.textRowContainer}>
          <Text style={orderStyle.lblQtyName}>Status</Text>
          <Text style={orderStyle.allLblValue}>Delivered</Text>
        </View>
        <View style={orderStyle.textRowContainer}>
          <Text style={orderStyle.lblQtyName}>Delivered On</Text>
          <Text style={orderStyle.allLblValue}>Dec 7,2020</Text>
        </View>
      </View>
    </View>
  );
}

const orderStyle = StyleSheet.create ({
  container: {
    borderRadius: 5,
    width: wp (90),
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 5,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  prodRow: {
    marginHorizontal: 15,
    marginTop:15,
    flexDirection: 'row',
  },
  prodCol: {
    flex: 1,
    flexDirection: 'column',
},
imageContainer: {
    justifyContent:'flex-end',
  },
  orderImage: {
    marginRight:30,
    width: wp (20),
    height: hp (8),
    alignSelf: 'flex-end',
  },
  textContainer: {
    marginTop: 10,
    marginBottom:20,
    marginHorizontal: 15,
  },
  textRowContainer: {
    flexDirection: 'row',
  },
  lblProdName: {
    marginTop: 10,
    fontSize: 13,
  },
  lblQtyName: {
    fontSize: 10,
    flexDirection: 'column',
  },
  lblQtyValue:{
    fontSize: 10,
    marginLeft:5,
  },
  allLblValue: {
    fontSize: 10,
    flexDirection: 'column',
    position: 'absolute',
    right: 30,
  },
  lblSellerName: {
    fontSize: 10,
    marginLeft: 10,
    flexDirection: 'column',
  },
  soldContainer: {
    marginTop: 5,
    backgroundColor: '#d2f8d2',
    borderRadius: 10,
    justifyContent: 'center',
    height: hp (3),
    width: wp(72),
  },
  lineStyle: {
    marginVertical: 10,
    backgroundColor: '#E0E0E0',
    height: 1,
  },
});
