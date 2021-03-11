import React from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LaterCard from '../components/saveForLaterCard';

import * as Data from '../data';

export default function CartScreen () {
  let cartData = Data.savedForLater;
  const renderItem = ({item}) => <LaterCard data={item} />;
  return (
    <SafeAreaView>
      <FlatList
        data={cartData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
