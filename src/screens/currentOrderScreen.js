import React,{useState,useEffect} from 'react';
import {View, FlatList} from 'react-native';

import OrderCard from '../components/orderComponent';
import {SafeAreaView} from 'react-native-safe-area-context';


export default function CurrentOrderScreen (props) {
  const [orderData, setOrderData] = useState ([]);
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
          'https://shopany-api.herokuapp.com/api/user/60518967ed36fa05ec9b4ef1/orders',
          requestOptions
        )
          .then (response => {
            return response.json ();
          })
          .then (responseData => {
            let tempArray = [];
            for (var i = 0; i < responseData.orders.length; i++) {
              if (responseData.orders[i].status != 4) {
                tempArray.push (responseData.orders[i]);
              }
            }

            setOrderData (tempArray);
            // console.log(tempArray);
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
  // let orderData = [];
  // for(var i=0;i<Data.orderData.length;i++){
  //   if(Data.orderData[i].status !== 4){
  //     orderData.push(Data.orderData[i]);
  //   }
  // }
  const renderItem = ({item}) => <OrderCard data={item} />;
  return (
    <View style={{alignItems: 'center'}}>
      <SafeAreaView>
        <FlatList
          data={orderData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  );
}
