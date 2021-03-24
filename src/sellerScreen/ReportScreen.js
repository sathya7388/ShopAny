import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function ReportScreen () {
  return (
    <View style={styles.Container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerCol}>
          <Text style={styles.appName}>Statistics</Text>
        </View>
      </View>
    </View>
  );
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
});
