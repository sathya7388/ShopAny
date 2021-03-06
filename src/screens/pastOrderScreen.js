import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import OrderCard from '../components/orderComponent';

export default function PastOrderScreen () {
  return (
    <ScrollView>
      <View style={{alignItems: 'center'}}>
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </View>
    </ScrollView>
  );
}
