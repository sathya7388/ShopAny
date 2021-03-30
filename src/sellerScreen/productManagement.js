import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Snackbar} from 'react-native-paper';
import {FAB} from 'react-native-paper';
import ProductCard from '../components/productCard';
import * as Data from '../data';

export default function Product (props) {
  const [productData, setProductData] = useState ([]);
  const [visible, setVisible] = useState (false);
  const [snackMessage, setMessage] = useState ('');
  const [isLoading, setLoading] = useState (false);
  useEffect (
    () => {
      // setLoading (true);
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
          'https://shopany-api.herokuapp.com/api/seller/' +
            Data.currentUser[0]._id +
            '/products',
          requestOptions
        )
          .then (response => {
            return response.json ();
          })
          .then (responseData => {
            setProductData (responseData.products);
          })
          .catch (error => console.error (error))
          .finally (() => {
            setLoading (false);
          });
      });
      return unsubscribe;
    },
    [props.navigation]
  );
  const deleteProduct = function (data) {
    setLoading (true);
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch (
      'https://shopany-api.herokuapp.com/api/product/delete/' + data._id,
      requestOptions
    )
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        setProductData (responseData.products);
      })
      .catch (error => console.error (error))
      .finally (() => {
        setLoading (false);
      });
  };
  const addProduct = function () {
    props.navigation.navigate ('UpdateProduct', {prodtDetails: ''});
  };
  const renderItem = ({item}) => (
    <ProductCard data={item} deleteProduct={deleteProduct} />
  );

  if (productData.length > 0) {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.headerContainer}>
          <View style={styles.headerCol}>
            <Text style={styles.appName}>Product Management</Text>
          </View>
        </View>
        <SafeAreaView>
          {isLoading
            ? <View style={styles.activity}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            : <FlatList
                data={productData}
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
        <FAB
          style={styles.fab}
          small={false}
          icon="plus"
          onPress={addProduct}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.Container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerCol}>
            <Text style={styles.appName}>Product Management</Text>
          </View>
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

          <Text style={{fontWeight: 'bold', fontSize: hp (4)}}>
            Product is empty!
          </Text>
        </View>
        <Snackbar
          visible={visible}
          duration={2000}
          onDismiss={() => setVisible (false)}
        >
          {snackMessage}
        </Snackbar>
        <FAB
          style={[styles.fab, {bottom: 50}]}
          small={false}
          icon="plus"
          onPress={addProduct}
        />
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  activity: {
    height: hp (100),
    marginTop: 20,
    alignItems: 'center',
  },
});
