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

export default function CheckoutScreen (props) {
  const navigation = useNavigation ();
  let productdata = [];
  productdata = props.route.params.productData;
  
  let totalprice = 0, productPrice = 0, deliveryFee = 0, discount = 0;

  for (var i = 0; i < productdata.length; i++) {
    productPrice +=
      parseFloat (productdata[i].price) * parseFloat (productdata[i].prodQuantity);
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
    deliveryFee = '$' + deliveryFee;
  }
  const renderItem = ({item}) => <CheckoutCard data={item} />;
  const [modalVisible, setModalVisible] = useState (false);
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
                Jon Snow
              </Text>
              <Text style={checkoutStyle.addressData}>
                221, Mammoth Hall Dr
              </Text>
              <Text style={checkoutStyle.addressData}>Scarborough, ON</Text>
              <Text style={checkoutStyle.addressData}>M1K 1B6</Text>
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
                  {'$' + productPrice}
                </Text>
              </View>
              <View style={checkoutStyle.priceDetailRow}>
                <Text style={checkoutStyle.priceBDText}>Discount</Text>
                <Text style={checkoutStyle.priceBDValue}>
                  {'-$' + discount}
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
                <Text style={checkoutStyle.totalPrice}>{'$' + totalprice}</Text>
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
                style={checkoutStyle.btnPlaceOrderContainer}
                onPress={() => setModalVisible (!modalVisible)}
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
