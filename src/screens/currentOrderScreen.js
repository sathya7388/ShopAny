import React from 'react';
import {View, FlatList} from 'react-native';

import OrderCard from '../components/orderComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Data from '../data';

export default function CurrentOrderScreen () {
  let orderData = [];
  for(var i=0;i<Data.orderData.length;i++){
    if(Data.orderData[i].status !== 4){
      orderData.push(Data.orderData[i]);
    }
  }
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
