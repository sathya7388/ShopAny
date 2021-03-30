import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FavCard from '../components/favCard';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Snackbar} from 'react-native-paper';
import * as Data from '../data';

export default function FavoriteScreen (props) {
  const navigation = useNavigation ();
  const [favData, setFavData] = useState ([]);
  const [visible, setVisible] = useState (false);
  const [snackMessage, setMessage] = useState ('');
  const [isLoading, setLoading] = useState (false);
  useEffect (
    () => {
      setLoading (true);
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
            '/getFavs',
          requestOptions
        )
          .then (response => {
            return response.json ();
          })
          .then (responseData => {
            setFavData (responseData.products);
          })
          .catch (error => console.error (error))
          .finally (() => {
            setLoading (false);
          });
      });
      setLoading (false);
      return unsubscribe;
    },
    [props.navigation]
  );

  function removeFav (data) {
    console.log (data);
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    let rmFavId = data._id;
    fetch (
      'https://shopany-api.herokuapp.com/api/user/' +
        Data.currentUser[0]._id +
        '/removeFav/' +
        rmFavId,
      requestOptions
    )
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        if (responseData.status == 'success') {
          setVisible (true);
          setMessage ('Removed From Favorites');
          var tempData = favData;
          for (var i = 0; i < tempData.length; i++) {
            if (tempData[i]._id == rmFavId) {
              tempData.splice (i, 1);
            }
          }
          setFavData (tempData);
        } else {
          setVisible (true);
          setMessage ('Failed to Remove From Favorites');
        }
      })
      .catch (error => {
        setVisible (true);
        setMessage ('Failed to Remove From Favorites');
        console.error (error);
      })
      .finally (() => {
        // setLoading (false)
      });
  }
  function addCart (data) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        productId: data._id,
        quantity: 1,
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
          setVisible (true);
          setMessage ('Added to Cart');
          var tempData = favData;
          for (var i = 0; i < tempData.length; i++) {
            if (tempData[i]._id == data._id) {
              tempData.splice (i, 1);
            }
          }
          setFavData (tempData);
        }
      })
      .catch (error => console.error (error))
      .finally (() => {
        // setLoading (false)
      });
  }
  const renderItem = ({item}) => (
    <FavCard data={item} removeFromFav={removeFav} addToCart={addCart} />
  );

  if (favData.length > 0) {
    return (
      <View style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <View style={styles.headerCol}>
            <Text style={styles.appName}>Favorites</Text>
          </View>
        </View>
        <SafeAreaView>
          {isLoading
            ? <View style={styles.activity}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            : <FlatList
                data={favData}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />}
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
      <View style={styles.Container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerCol}>
            <Text style={styles.appName}>Favorites</Text>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: hp (4)}}>
            Favorites is empty!
          </Text>
          <Text>Add items to Favorites</Text>
          <TouchableOpacity
            style={styles.shopNow}
            onPress={() => navigation.navigate ('HomeScreen')}
          >
            <Text style={styles.txtPlaceOrder}>Shop Now</Text>
          </TouchableOpacity>
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
}
const styles = StyleSheet.create ({
  Container: {
    flexDirection: 'column',
    height: hp (100),
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    elevation: 8,
    height: hp (7),
    width: wp (100),
  },
  headerCol: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  appName: {
    fontSize: 23,
    color: '#000000',
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
  activity: {
    height: hp (100),
    marginTop: 20,
    alignItems: 'center',
  },
});
