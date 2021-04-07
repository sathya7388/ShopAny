import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function UpdateOrderScreen (props) {
  var [selectedStatus, setSelectedStatus] = useState (
    props.route.params.status
  );

  var [showDatePicker, setShowDatePicker] = useState (false);
  var [deliveryDate, setDeliveryDate] = useState (
    props.route.params.deliveryDate
  );

  function formatDate (dateValue) {
    let formattedDate = null;
    if (typeof dateValue === 'string') {
      formattedDate = new Date (
        dateValue.replace (/-/g, '\/')
      ).toLocaleDateString ('en-US');
    } else {
      formattedDate = dateValue.toLocaleDateString ('en-US');
    }
    return formattedDate;
  }

  function updateOrder () {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        status: selectedStatus,
        deliveryDate: deliveryDate,
      }),
    };

    fetch (
      'https://shopany-api.herokuapp.com/api/order/' +
        props.route.params._id +
        '/update',
      requestOptions
    )
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        if (
          responseData.status == 'success' &&
          responseData.order.length != 0
        ) {
          props.navigation.navigate ('OrderManagementScreen');
        } else {
          setVisible (true);
        }
      })
      .catch (error => {
        console.log (error);
      })
      .finally (() => {
        // setLoading(false)
      });
  }

  function onDateChange (event, selectedDate) {    
    setShowDatePicker (false);
    if (selectedDate) {
      setDeliveryDate (formatDate (selectedDate));
    }
  }

  function displayDatePicker () {
    setShowDatePicker (true);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.elements}
        label="Order Id"
        mode="outlined"
        value={props.route.params._id}
        disabled
        // onChangeText={setName}
      />

      <TouchableOpacity onPress={() => displayDatePicker ()}>
        <TextInput
          style={styles.elements}
          label="Delivery Date"
          mode="outlined"
          value={deliveryDate}
          //onChangeText={setName}
        />
      </TouchableOpacity>

      <View style={styles.elements}>
        <DropDownPicker
          items={[
            {
              label: 'Processing',
              value: 1,
            },
            {
              label: 'Ready for Shippment',
              value: 2,
            },
            {
              label: 'Shipped',
              value: 3,
            },
            {
              label: 'Delivered',
              value: 4,
            },
          ]}
          placeholder={'Select Status'}
          defaultValue={selectedStatus}
          containerStyle={{height: wp (13)}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa', elevation: 5}}
          onChangeItem={item => setSelectedStatus (item.value)}
        />
      </View>
      <View style={styles.btnorderview}>
        <TouchableOpacity
          style={[styles.btnContainer, {backgroundColor: '#78909c'}]}
          onPress={() => props.navigation.navigate ('OrderManagementScreen')}
        >
          <Text style={styles.txtPlaceOrder}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => updateOrder ()}
        >
          <Text style={styles.txtPlaceOrder}>Update</Text>
        </TouchableOpacity>
      </View>
      {showDatePicker &&
        <DateTimePicker
          value={new Date (deliveryDate)}
          onChange={(event, selectedDate) => onDateChange (event, selectedDate)}
          mode={'date'}
          display="default"
        />}

    </View>
  );
}
const styles = StyleSheet.create ({
  container: {
    margin: 20,
    height: hp (100),
  },
  elements: {
    margin: 20,
  },
  dropdownElement: {
    margin: 20,
    minHeight: 1000,
  },
  textareaContainer: {
    height: hp (30),
    padding: 5,
    marginVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 0.7,
  },
  textarea: {
    textAlignVertical: 'top',
    height: hp (29),
    fontSize: 14,
    color: '#333',
  },
  activity: {
    height: hp (100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnorderview: {
    bottom: 170,
    width: wp (90),
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 2,
    paddingVertical: 4,
    paddingHorizontal: 30,
    width: wp (40),
  },
  txtPlaceOrder: {
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
  },
});
