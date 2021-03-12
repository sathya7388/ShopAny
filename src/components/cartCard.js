import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Snackbar} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function CartCard ({data, onStepperDown,onRemoveCart,onSaveLater,onStepperUp}) {
  // console.log('called');
  // console.log(props.data);
  const [visible, setVisible] = useState (false);
  const [snackMessage, setMessage] = useState ('');
  const [quantity, setQuantity] = useState (1);
  const [prodPrice, setPrice] = useState (parseInt (data.price));
  const [minusdisabled, setMinusDisabled] = useState (true);
  const [plusdisabled, setPlusDisabled] = useState (false);
  const productPrice = parseInt (data.price);
  // setPrice(productPrice);
  useEffect (
    () => {
      setPrice (productPrice * quantity);
    },
    [quantity]
  );
  const decrementStepper = function () {
    if (quantity == 1) {
      setMinusDisabled (true);
    } else {
      setPlusDisabled (false);
      setMinusDisabled (false);
      setQuantity (quantity - 1);
      onStepperDown(data);
    }
  };
  const incrementStepper = function () {
    if (quantity == 10) {
      setPlusDisabled (true);
    } else {
      setMinusDisabled (false);
      setPlusDisabled (false);
      setQuantity (quantity + 1);
      onStepperUp(data);
    }
  };
  return (
    <View style={cardStyle.container}>
      <View style={cardStyle.cartContainer}>
        <View style={cardStyle.cartCard}>
          <View style={cardStyle.cartContent}>
            <Text style={cardStyle.prodName}>{data.name}</Text>
            <Text style={cardStyle.sellerName}>Seller : ABC sellers</Text>
            <Text style={cardStyle.prodPrice}>{'$' + prodPrice}</Text>
            <Text style={cardStyle.sellerName}>Delivery in 2 days</Text>
          </View>
          <View style={cardStyle.cartAdjust}>
            <View style={cardStyle.cartImageView}>
              <Image
                source={require ('../assets/images/one.jpg')}
                style={cardStyle.cartImage}
              />
            </View>
            <View style={cardStyle.stepper}>
              <TouchableOpacity
                onPress={decrementStepper}
                disabled={minusdisabled}
              >
                <Image
                  source={require ('../assets/images/minus.png')}
                  style={cardStyle.icon}
                />
              </TouchableOpacity>
              <Text style={cardStyle.stepperText}>{quantity}</Text>
              <TouchableOpacity
                onPress={incrementStepper}
                disabled={plusdisabled}
              >
                <Image
                  source={require ('../assets/images/plus.png')}
                  style={cardStyle.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={cardStyle.lineStyle} />
        <View style={cardStyle.btnorderview}>
          <TouchableOpacity
            style={cardStyle.btnPlaceOrderContainer}
            onPress={() => {
              onSaveLater()
            }}
          >
            <Text style={cardStyle.txtPlaceOrder}>Save for Later</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={cardStyle.btnPlaceOrderContainer}
            onPress={() => {
              onRemoveCart()
            }}
          >
            <Text style={cardStyle.txtPlaceOrder}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
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

const cardStyle = StyleSheet.create ({
  container: {
    elevation: 5,
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 10,
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
  cartAdjust: {
    right: 20,
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
  },
  cartImage: {
    width: wp (17),
    height: hp (8),
  },
  stepper: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  stepperText: {
    textAlign: 'center',
    width: 20,
  },
  icon: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
  },
  lineStyle: {
    backgroundColor: '#E0E0E0',
    height: 1,
    marginHorizontal: 10,
  },
  btnorderview: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  btnPlaceOrderContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 2,
    paddingVertical: 4,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    width: wp (40),
  },
  txtPlaceOrder: {
    fontSize: 14,
    color: '#fff',
    alignSelf: 'center',
  },
});
