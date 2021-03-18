import React, {useState, useEffect} from 'react';
import {FlatList, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LaterCard from '../components/saveForLaterCard';
import {Snackbar} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

export default function CartScreen (props) {
  const navigation = useNavigation ();
  const [cartData, setCartData] = useState ([]);
  const [visible, setVisible] = useState (false);
  const [snackMessage, setMessage] = useState ('');

  useEffect (
    () => {
      const unsubscribe = props.navigation.addListener ('focus', () => {
        const requestOptions = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };

        fetch (
          'https://shopany-api.herokuapp.com/api/user/60518967ed36fa05ec9b4ef1/getCart',
          requestOptions
        )
          .then (response => {
            return response.json ();
          })
          .then (responseData => {
            let tempArray = [];
            for (var i = 0; i < responseData.user[0].cart.length; i++) {
              if (responseData.user[0].cart[i].cartType == 1) {
                tempArray.push (responseData.user[0].cart[i]);
              }
            }
            console.log('api call success');
            setCartData (tempArray);
          })
          .catch (error => {
            // console.error (error)
          })
          .finally (() => {
            // setLoading (false)
          });
      });
      return unsubscribe;
    },
    [props.navigation]
  );
  function moveCart (data) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        productId: data.product._id,
        quantity: data.quantity,
        cartType: 0,
      }),
    };

    fetch (
      'https://shopany-api.herokuapp.com/api/user/60518967ed36fa05ec9b4ef1/addCart',
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
          setMessage ('Moved to Cart');
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
      'https://shopany-api.herokuapp.com/api/user/60518967ed36fa05ec9b4ef1/removeCart/' +
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
          setMessage ('Removed From Saved For Later');
        }
      })
      .catch (error => console.error (error))
      .finally (() => {
        // setLoading (false)
      });
  }
  const renderItem = ({item}) => (
    <LaterCard data={item} onRemoveCart={removeCart} onMoveCart={moveCart} />
  );
  if (cartData.length > 0) {
    console.log('render call more 0');
    return (
      <View style={{flex: 1}}>
        <SafeAreaView>
          <FlatList
            data={cartData}
            renderItem={renderItem}
            keyExtractor={item => item.product._id}
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
    console.log('render call no data');
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: hp (4)}}>
          Saved List is empty!
        </Text>
        <Text>Add items in List</Text>
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
});
