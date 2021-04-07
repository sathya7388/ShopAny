import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Data from '../data';

export default function OrderCard (props) {
  var deliveryDate = new Date (props.data.deliveryDate);
  var deliveryStatus;
  var deliveryText;
  var statusColor;
  if (props.data.status == 1) {
    deliveryText = 'Expected Delivery';
    deliveryStatus = 'Processing';
    statusColor = '#f57f17';
  } else if (props.data.status == 2) {
    deliveryText = 'Expected Delivery';
    deliveryStatus = 'Ready For Shipment';
    statusColor = '#e91e63';
  } else if (props.data.status == 3) {
    deliveryText = 'Expected Delivery';
    deliveryStatus = 'Shipped';
    statusColor = '#2196f3';
  } else {
    deliveryText = 'Delivered On';
    deliveryStatus = 'Delivered';
    statusColor = '#1b5e20';
  }
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var dateValue =
    months[deliveryDate.getMonth ()] +
    ' ' +
    deliveryDate.getDate () +
    ',' +
    deliveryDate.getFullYear ();
  return (
    <View style={orderStyle.container}>
      <View style={orderStyle.prodRow}>
        <View style={orderStyle.prodCol}>
          <Text numberOfLines={3} style={orderStyle.lblProdName}>
            {props.data.product.name}
          </Text>
          <View style={orderStyle.textRowContainer}>
            <Text style={orderStyle.lblQtyName}>Quantity :</Text>
            <Text style={orderStyle.lblQtyValue}>{props.data.quantity}</Text>
          </View>
        </View>
        <View style={orderStyle.prodCol}>
          <View style={orderStyle.imageContainer}>
            <Image
              source={{uri: props.data.product.images[0]}}
              style={orderStyle.orderImage}
            />
          </View>
        </View>
      </View>
      <View style={orderStyle.textContainer}>
        <View style={orderStyle.textRowContainer}>
          <Text style={orderStyle.lblQtyName}>Order Total :</Text>
          <Text style={orderStyle.allLblValue}>
            {'$' + props.data.product.price * props.data.quantity}
          </Text>
        </View>
        <View style={orderStyle.soldContainer}>
          {props.isSeller
            ? <Text style={orderStyle.lblSellerName}>
                Ordered by
                <Text style={{fontWeight: 'bold'}}>
                  {' ' + props.data.user.name}
                </Text>
              </Text>
            : <Text style={orderStyle.lblSellerName}>
                Sold and Shipped By

                <Text style={{fontWeight: 'bold'}}>
                  {' ' + props.data.sellerId.name}
                </Text>
              </Text>}
        </View>
        <View style={orderStyle.lineStyle} />
        <View style={orderStyle.textRowContainer}>
          <Text style={orderStyle.lblQtyName}>Order Number :</Text>
          <Text style={orderStyle.allLblValue}>{props.data._id}</Text>
        </View>
        <View style={orderStyle.textRowContainer}>
          <Text style={orderStyle.lblQtyName}>Status</Text>
          <Text style={[orderStyle.allLblValue, {color: statusColor}]}>
            {deliveryStatus}
          </Text>
        </View>
        <View style={orderStyle.textRowContainer}>
          <Text style={orderStyle.lblQtyName}>{deliveryText}</Text>
          <Text style={orderStyle.allLblValue}>{dateValue}</Text>
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
    marginTop: 15,
    flexDirection: 'row',
  },
  prodCol: {
    flex: 1,
    flexDirection: 'column',
  },
  imageContainer: {
    justifyContent: 'flex-end',
  },
  orderImage: {
    marginRight: 30,
    width: wp (20),
    height: hp (8),
    alignSelf: 'flex-end',
  },
  textContainer: {
    marginTop: 10,
    marginBottom: 20,
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
  lblQtyValue: {
    fontSize: 10,
    marginLeft: 5,
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
    width: wp (75),
  },
  lineStyle: {
    marginVertical: 10,
    backgroundColor: '#E0E0E0',
    height: 1,
  },
});
