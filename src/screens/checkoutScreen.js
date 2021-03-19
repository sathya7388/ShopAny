import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckoutCard from '../components/checkoutCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import * as Data from '../data';

export default function CheckoutScreen (props) {
  const navigation = useNavigation ();
  const [modalVisible, setModalVisible] = useState (false);
  let productdata = [];
  productdata = props.route.params.productData;
  // console.log (props.route.params.screenName);
  let totalprice = 0, productPrice = 0, deliveryFee = 0, discount = 0;

  for (var i = 0; i < productdata.length; i++) {
    productPrice +=
      parseFloat (productdata[i].price) *
      parseFloat (productdata[i].prodQuantity);
    deliveryFee +=
      parseFloat (productdata[i].deliveryFee) *
      parseFloat (productdata[i].prodQuantity);
    discount +=
      parseFloat (productdata[i].discount) *
      parseFloat (productdata[i].prodQuantity);
  }
  if (deliveryFee == 0) {
    totalprice = productPrice - discount;
    deliveryFee = 'Free';
  } else {
    totalprice = productPrice + deliveryFee - discount;
    deliveryFee = '$' + deliveryFee.toFixed (2);
  }
  function formatDate (dateValue) {
    let formattedDate = null;
    if (typeof dateValue == 'string') {
      formattedDate = new Date (
        dateValue.replace (/-/g, '\/')
      ).toLocaleDateString ('en-US');
    } else {
      formattedDate = dateValue.toLocaleDateString ('en-US');
    }
    return formattedDate;
  }
  function placeOrder () {
    var orderArray = [];
    for (var i = 0; i < productdata.length; i++) {
      var productMap = {};
      productMap.user = Data.currentUser[0]._id;
      productMap.status = 1;
      productMap.quantity = productdata[i].prodQuantity;
      productMap.product = productdata[i]._id;
      productMap.sellerId = productdata[i].sellerId;
      productMap.placedDate = formatDate (new Date ());
      var date = new Date (); // Get current Date
      date.setDate (date.getDate () + productdata[i].expectedDeliveryDate);
      productMap.deliveryDate = formatDate (new Date (date));
      orderArray.push (productMap);
    }
    // console.log (orderArray);
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify (orderArray),
    };
    fetch ('https://shopany-api.herokuapp.com/api/order/add', requestOptions)
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        if (responseData.status == 'success') {
          setModalVisible (!modalVisible);
          if (props.route.params.screenName == 'cartScreen') {
            for (var i = 0; i < productdata.length; i++) {
              removeFromCart (productdata[i]._id);
            }
          }
        }
      })
      .catch (error => console.error (error))
      .finally (() => {
        // setLoading (false)
      });
  }
  function removeFromCart (id) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch (
      'https://shopany-api.herokuapp.com/api/user/' +
        Data.currentUser[0]._id +
        '/removeCart/' +
        id,
      requestOptions
    )
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        return responseData;
      })
      .catch (error => console.error (error))
      .finally (() => {
        // setLoading (false)
      });
  }
  const renderItem = ({item}) => <CheckoutCard data={item} />;
  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible (!modalVisible);
        }}
      >
        <View style={checkoutStyle.centeredView}>
          <View style={checkoutStyle.modalView}>
            <Text style={checkoutStyle.modalText}>
              Your Order has been placed
            </Text>
            <Pressable
              style={[checkoutStyle.button, checkoutStyle.buttonClose]}
              onPress={() => {
                setModalVisible (!modalVisible);
                navigation.navigate ('HomeScreen');
              }}
            >
              <Text style={checkoutStyle.textStyle}>Continue Shopping</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <FlatList
        data={productdata}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListHeaderComponent={
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                paddingLeft: 10,
                paddingVertical: 10,
              }}
            >
              Shipping Address
            </Text>
            <View style={checkoutStyle.addressRow}>
              <Text style={{fontWeight: 'bold', paddingBottom: 5}}>
                {Data.currentUser[0].name}
              </Text>
              <Text style={checkoutStyle.addressData}>
                {Data.currentUser[0].address}
              </Text>
              {/* <Text style={checkoutStyle.addressData}>
                221, Mammoth Hall Dr
              </Text>
              <Text style={checkoutStyle.addressData}>Scarborough, ON</Text>
              <Text style={checkoutStyle.addressData}>M1K 1B6</Text> */}
            </View>
            <Text
              style={{
                fontWeight: 'bold',
                paddingLeft: 10,
                paddingVertical: 10,
              }}
            >
              Product Details
            </Text>
          </View>
        }
        ListFooterComponent={
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
                <Text style={checkoutStyle.priceBDValue}>
                  {'$' + productPrice.toFixed (2)}
                </Text>
              </View>
              <View style={checkoutStyle.priceDetailRow}>
                <Text style={checkoutStyle.priceBDText}>Discount</Text>
                <Text style={checkoutStyle.priceBDValue}>
                  {'-$' + discount.toFixed (2)}
                </Text>
              </View>
              <View style={checkoutStyle.priceDetailRow}>
                <Text style={checkoutStyle.priceBDText}>
                  Delivery Charges
                </Text>
                <Text style={checkoutStyle.priceBDValue}>
                  {deliveryFee}
                </Text>
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
                <Text style={checkoutStyle.totalPrice}>
                  {'$' + totalprice.toFixed (2)}
                </Text>
              </View>

            </View>
            <View
              style={{
                backgroundColor: '#000000',
                height: 0.5,
              }}
            />
            <View style={checkoutStyle.btnorderview}>
              <TouchableOpacity
                style={[checkoutStyle.btnPlaceOrderContainer,{backgroundColor:'#ef6c00'}]}
                onPress={placeOrder}
              >
                <Text style={checkoutStyle.txtPlaceOrder}>
                  Place Order
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const checkoutStyle = StyleSheet.create ({
  addressRow: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 8,
  },
  addressData: {
    fontSize: 10,
    color: '#808080',
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
  totalPrice: {
    flexDirection: 'column',
    right: 50,
    position: 'absolute',
  },
  priceBDValue: {
    fontSize: 12,
    color: '#808080',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
