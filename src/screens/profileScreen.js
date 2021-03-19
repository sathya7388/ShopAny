import React from 'react';
import {Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as Data from '../data'

function Profile({navigation}) {
  function logOut(){
    // console.log('log out')
    Data.currentUser.splice(Data.currentUser.length)
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarView}>
        <Avatar
          size="xlarge"
          rounded
          title="MT"
          containerStyle={{backgroundColor: 'gray'}}

        />
      </View>
      <View />
      <View style={styles.tableview}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text>Name</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>{Data.currentUser[0].name}</Text>
          </View>
        </View>
        <View style={styles.tlineStyle} />
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text>Email</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>{Data.currentUser[0].email}</Text>
          </View>
        </View>
        <View style={styles.tlineStyle} />
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text>Phone Number</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>{'+1 '+Data.currentUser[0].phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.tlineStyle} />
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text>Address</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>{Data.currentUser[0].address}</Text>
            {/* <Text>Mark Antony</Text>
            <Text>Mark Antony</Text> */}
          </View>
        </View>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity
          style={styles.btnPlaceOrderContainer}
          onPress={logOut}
        >
          <Text style={styles.txtPlaceOrder}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create ({
  container: {
    backgroundColor: '#ffffff',
    height: hp (100),
  },
  avatarView: {
    alignItems: 'center',
    marginTop: 20,
    // justifyContent: 'center',
  },
  lineStyle: {
    backgroundColor: '#E0E0E0',
    height: 0.5,
    marginVertical: 20,
  },
  tlineStyle: {
    backgroundColor: '#E0E0E0',
    height: 0.5,
    // marginVertical: 20,
  },
  btnView: {
    // bottom: 100,
    // position:'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnPlaceOrderContainer: {
    elevation: 8,
    backgroundColor: '#f44336',
    borderRadius: 2,
    paddingVertical: 4,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    width: wp (40),
  },
  txtPlaceOrder: {
    fontSize: 14,
    color: '#fff',
    alignSelf: 'center',
  },
  tableview: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginVertical:40,
    marginHorizontal: 20,
  },
  tableRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  tableCol: {
    flex:1,
    alignItems:'center',
    flexDirection: 'column',
    alignItems:'flex-start'
  },
  text: {
    // fontStyle: 15,
    color: '#818181',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logout: {
    // fontStyle: 15,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 14,
  },
});
export default Profile;
