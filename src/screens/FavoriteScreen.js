import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FavCard from '../components/favCard';

export default function FavoriteScreen () {
  return (
    <View style={{flexDirection: 'column', alignItems: 'center'}}>
      <View style={styles.headerContainer}>
        <View style={styles.headerCol}>
          <Text style={styles.appName}>Favorites</Text>
        </View>
      </View>
      <FavCard />
      <FavCard />
      <FavCard />
      <FavCard />
      <FavCard />
    </View>
  );
}
const styles = StyleSheet.create ({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    elevation: 8,
    height: hp (7),
    width: wp(100),
  },
  headerCol: {
    justifyContent: 'center',
    // alignItems:'center',
    marginLeft: 20,
  },
  appName: {
    // marginLeft: 10,
    fontSize: 23,
    // fontWeight: 'bold',
    color: '#000000',
  },
});
