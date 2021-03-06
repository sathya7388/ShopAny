import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RadioButton, TextInput} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ComboBox from '../components/comboBox';

export default function FilterScreen () {
  const [value, setValue] = React.useState ('first');
  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
      <View style={filterStyle.filterComponents}>
        <Text style={filterStyle.componentTitle}>Category</Text>
        <ComboBox />
        <Text style={filterStyle.componentTitle}>Price</Text>
        {/* <View style={filterStyle.priceComponents}> */}
        <TextInput
          placeholder="From"
          keyboardType={'numeric'}
          maxLength={6}
          style={{
            borderColor: 'gray',
            borderWidth: 0.5,
            borderRadius: 4,
            width: wp (90),
            height: hp (5),
          }}
          // onChangeText={text => onChangeText (text)}
          // value={}
        />
        <TextInput
          placeholder="To"
          keyboardType={'numeric'}
          maxLength={6}
          style={{
            borderColor: 'gray',
            borderWidth: 0.5,
            borderRadius: 4,
            marginTop: 10,
            width: wp (90),
            height: hp (5),
          }}
          // onChangeText={text => onChangeText (text)}
          // value={}
        />
        {/* </View> */}

        <Text style={filterStyle.componentTitle}>SortBy</Text>
        <View style={{flexDirection: 'row'}}>
          <RadioButton.Group
            onValueChange={newValue => setValue (newValue)}
            value={value}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton value="first" />
              <Text>Price : Low to High</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton value="second" />
              <Text>Price : High to Low</Text>
            </View>
          </RadioButton.Group>
        </View>

      </View>
      <View style={filterStyle.btnorderview}>
        <TouchableOpacity style={filterStyle.btnPlaceOrderContainer}>
          <Text style={filterStyle.txtPlaceOrder}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={filterStyle.btnPlaceOrderContainer}>
          <Text style={filterStyle.txtPlaceOrder}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const filterStyle = StyleSheet.create ({
  filterComponents: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  componentTitle: {
    marginVertical: 20,
  },
  priceComponents: {
    // alignItems:'center',
  },
  btnorderview: {
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 20,
    alignItems: 'center',
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
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
  },
});
