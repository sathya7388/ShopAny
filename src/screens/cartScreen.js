import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import * as Data from '../data';
import CartCard from '../components/cartCard';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Snackbar} from 'react-native-paper';

export default function CartScreen () {
  const navigation = useNavigation ();
  const [visible, setVisible] = useState (false);
  const [snackMessage, setMessage] = useState ('');
  const [ftotalPrice,setTotalPrice] = useState(0);
  const [fdeliveryFee,setDeliveryFee] = useState(0);
  const [fDiscount,setDiscount] = useState(0);
  const [fproductPrice,setproductPrice] = useState(0);
  let cartData = Data.cart;
  let totalprice = 0, productPrice = 0, deliveryFee = 0, discount = 0;
  
  function clickAlert () {
    console.log ('called');
    alert ('I am working');
  }
  function saveLater () {
    setVisible (true);
    setMessage ('Saved For Later');
  }
  function removeCart () {
    setVisible (true);
    setMessage ('Removed From Cart');
  }
  function decreaseStepper(data){
    deliveryFee = deliveryFee + parseInt (data.deliveryFee);
    discount = discount + parseInt (data.discount);
    productPrice = productPrice-parseInt (data.price);
    // totalprice = totalprice-data.price;
    console.log(data);
    console.log(productPrice);
  }
  function increase(data){
    deliveryFee = deliveryFee + parseInt (data.deliveryFee);
    discount = discount + parseInt (data.discount);
    productPrice = productPrice+parseInt (data.price);
    // totalprice = totalprice+data.price;
    console.log(data);
    console.log(productPrice);
  }
  for (var i = 0; i < cartData.length; i++) {
    productPrice = productPrice + parseInt (cartData[i].price);
    deliveryFee = deliveryFee + parseInt (cartData[i].deliveryFee);
    discount = discount + parseInt (cartData[i].discount);
  }
  if (deliveryFee == 0) {
    totalprice = productPrice - discount;
    deliveryFee = 'Free';
  } else {
    totalprice = (productPrice + deliveryFee) - discount;
  }

  // setTotalPrice(totalprice);
  // setDeliveryFee(deliveryFee);
  // setDiscount(discount);
  // setproductPrice(productPrice);
  
  const renderItem = ({item}) => (
    <CartCard
      data={item}
      onRemoveCart={removeCart}
      onSaveLater={saveLater}
      onStepperDown={decreaseStepper}
      onStepperUp={increase}
    />
  );
  return (
    <SafeAreaView>
      <FlatList
        data={cartData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent={
          <View style={{flex: 1, flexDirection: 'column'}}>
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
                <Text style={cart.priceBDValue}>{'$' + productPrice}</Text>
              </View>
              <View style={cart.priceDetailRow}>
                <Text style={cart.priceBDText}>Discount</Text>
                <Text style={cart.priceBDValue}>{'-$' + discount}</Text>
              </View>
              <View style={cart.priceDetailRow}>
                <Text style={cart.priceBDText}>Delivery Charges</Text>
                <Text style={cart.priceBDValue}>{deliveryFee}</Text>
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
                <Text style={cart.priceBDValue}>{'$' + totalprice}</Text>
              </View>

            </View>
            <View
              style={{
                backgroundColor: '#000000',
                height: 0.5,
              }}
            />
            <View style={cart.btnorderview}>
              <TouchableOpacity
                style={cart.btnPlaceOrderContainer}
                onPress={() =>
                  navigation.navigate ('CheckoutScreen', {
                    productData: cartData,
                  })}
              >
                <Text style={cart.txtPlaceOrder}>Continue to Checkout</Text>
              </TouchableOpacity>
            </View>

          </View>
        }
      />
      <Snackbar
              visible={visible}
              duration={2000}
              onDismiss={() => setVisible (false)}
            >
              {snackMessage}
            </Snackbar>
    </SafeAreaView>
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
    marginTop: 0,
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
