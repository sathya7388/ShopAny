import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
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

export default function CartScreen (props) {
  const navigation = useNavigation ();
  const [isLoading, setLoading] = useState (false);
  const [transSpinner, setTransSpinner] = useState (false);
  const [visible, setVisible] = useState (false);
  const [snackMessage, setMessage] = useState ('');
  const [cartData, setCartData] = useState ([]);

  const [price, setPrice] = useState ({
    pri: 0,
    dis: 0,
    deFee: 0,
    tot: 0,
  });

  function saveLater (data) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        productId: data.product._id,
        quantity: data.quantity,
        cartType: 1,
      }),
    };

    fetch (
      'https://shopany-api.herokuapp.com/api/user/' +
        Data.currentUser[0]._id +
        '/addCart',
      requestOptions
    )
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        if ((responseData.status = 'sucess')) {
          let tempArray = cartData;
          for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i].product._id == data.product._id) {
              tempArray.splice (i, 1);
            }
          }
          setCartData (tempArray);
          setVisible (true);
          setMessage ('Saved For Later');
        }
      })
      .catch (error => console.error (error))
      .finally (() => {
        // setLoading (false)
      });
  }
  function removeCart (data) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    let rmCartId = data.product._id;
    fetch (
      'https://shopany-api.herokuapp.com/api/user/' +
        Data.currentUser[0]._id +
        '/removeCart/' +
        rmCartId,
      requestOptions
    )
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        if (responseData.status == 'success') {
          let tempArray = cartData;
          for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i].product._id == rmCartId) {
              tempArray.splice (i, 1);
            }
          }
          setCartData (tempArray);
          setVisible (true);
          setMessage ('Removed From Cart');
          priceCalculation ();
        }
      })
      .catch (error => console.error (error))
      .finally (() => setLoading (false));
  }

  useEffect (
    () => {
      const unsubscribe = props.navigation.addListener ('focus', () => {
        setLoading (true);
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
            '/getCart',
          requestOptions
        )
          .then (response => {
            return response.json ();
          })
          .then (responseData => {
            let tempArray = [];
            for (var i = 0; i < responseData.user[0].cart.length; i++) {
              if (responseData.user[0].cart[i].cartType == 0) {
                tempArray.push (responseData.user[0].cart[i]);
              }
            }
            setCartData (tempArray);
          })
          .catch (error => {
            console.error (error);
          })
          .finally (() => setLoading (false));
      });
      return unsubscribe;
    },
    [props.navigation]
  );

  function updateCart (stepperArray) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        productId: stepperArray.product._id,
        quantity: stepperArray.quantity,
        cartType: 0,
      }),
    };

    fetch (
      'https://shopany-api.herokuapp.com/api/user/' +
        Data.currentUser[0]._id +
        '/addCart',
      requestOptions
    )
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        if ((responseData.status = 'sucess')) {
          priceCalculation ();
        }
      })
      .catch (error => console.error (error))
      .finally (() => {
        // setLoading (false)
      });
  }

  useEffect (
    () => {
      priceCalculation ();
    },
    [cartData]
  );

  function decreaseStepper (data) {
    var stepperArray = [];
    for (var i = 0; i < cartData.length; i++) {
      if (cartData[i].product._id == data.product._id) {
        cartData[i].quantity--;
        stepperArray = cartData[i];
      }
    }
    updateCart (stepperArray);
  }

  function increaseStepper (data) {
    var stepperArray = [];
    for (var i = 0; i < cartData.length; i++) {
      if (cartData[i].product._id == data.product._id) {
        cartData[i].quantity++;
        stepperArray = cartData[i];
      }
    }
    updateCart (stepperArray);
  }

  function priceCalculation () {
    let totalprice = 0, productPrice = 0, deliveryFee = 0, discount = 0;
    for (var i = 0; i < cartData.length; i++) {
      productPrice +=
        parseFloat (cartData[i].product.price) *
        parseFloat (cartData[i].quantity);
      deliveryFee +=
        parseFloat (cartData[i].product.deliveryFee) *
        parseFloat (cartData[i].quantity);
      discount +=
        parseFloat (cartData[i].product.discount) *
        parseFloat (cartData[i].quantity);
    }
    if (deliveryFee == 0) {
      totalprice = productPrice - discount;
      deliveryFee = 'Free';
    } else {
      deliveryFee = deliveryFee.toFixed (2);
      totalprice =
        parseFloat (productPrice) +
        parseFloat (deliveryFee) -
        parseFloat (discount);
    }
    setPrice ({
      pri: productPrice,
      dis: discount,
      deFee: deliveryFee,
      tot: totalprice,
    });
  }
  function continueCheckout () {
    var chekoutArray = [];
    for (var i = 0; i < cartData.length; i++) {
      var productObj = cartData[i].product;
      productObj.prodQuantity = cartData[i].quantity;
      chekoutArray.push (productObj);
    }
    navigation.navigate ('CheckoutScreen', {
      productData: chekoutArray,
      screenName: 'cartScreen',
    });
  }
  const renderItem = ({item}) => (
    <CartCard
      data={item}
      onRemoveCart={removeCart}
      onSaveLater={saveLater}
      onStepperDown={decreaseStepper}
      onStepperUp={increaseStepper}
    />
  );
  if (isLoading) {
    return (
      <View style={cart.activity}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (cartData.length > 0) {
    return (
      <View style={{flex: 1}}>

        <SafeAreaView>
          <FlatList
            data={cartData}
            renderItem={renderItem}
            keyExtractor={item => item.product._id}
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
                    <Text style={cart.priceBDValue}>
                      {'$' + price.pri.toFixed (2)}
                    </Text>
                  </View>
                  <View style={cart.priceDetailRow}>
                    <Text style={cart.priceBDText}>Discount</Text>
                    <Text style={cart.priceBDValue}>
                      {'-$' + price.dis.toFixed (2)}
                    </Text>
                  </View>
                  <View style={cart.priceDetailRow}>
                    <Text style={cart.priceBDText}>Delivery Charges</Text>
                    <Text style={cart.priceBDValue}>
                      {price.deFee}
                    </Text>
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
                    <Text style={cart.totalPrice}>
                      {'$' + price.tot.toFixed (2)}
                    </Text>
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
                    style={[
                      cart.btnPlaceOrderContainer,
                      {backgroundColor: '#ef6c00'},
                    ]}
                    onPress={continueCheckout}
                  >
                    <Text style={cart.txtPlaceOrder}>
                      Continue to Checkout
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
          />
        </SafeAreaView>
        <Snackbar
          visible={visible}
          duration={2000}
          onDismiss={() => setVisible (false)}
        >
          {snackMessage}
        </Snackbar>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: hp (4)}}>
          Your cart is empty!
        </Text>
        <Text>Add items in Cart</Text>
        <TouchableOpacity
          style={cart.shopNow}
          onPress={() => navigation.navigate ('HomeScreen')}
        >
          <Text style={cart.txtPlaceOrder}>Shop Now</Text>
        </TouchableOpacity>
        <Snackbar
          visible={visible}
          duration={2000}
          onDismiss={() => setVisible (false)}
        >
          {snackMessage}
        </Snackbar>
      </View>
    );
  }
}
const cart = StyleSheet.create ({
  activity: {
    height: hp (100),
    marginTop: 20,
    alignItems: 'center',
  },
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
  },
  btnPlaceOrderContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 2,
    paddingVertical: 4,
    paddingHorizontal: 30,
    width: wp (80),
  },
  shopNow: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 2,
    marginVertical: 15,
    paddingVertical: 4,
    paddingHorizontal: 30,
    width: wp (40),
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
