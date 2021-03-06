import React from 'react';
import {View,} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import OrderCard from '../components/orderComponent';

export default function CurrentOrderScreen () {
  return (
    <ScrollView>
      <View style={{alignItems: 'center'}}>
        <OrderCard />
        <OrderCard />
      </View>
    </ScrollView>
  );
}
