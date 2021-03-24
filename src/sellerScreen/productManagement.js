import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FAB} from 'react-native-paper';

export default function ProductManagement () {
  return (
    <View>
      <View style={styles.Container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerCol}>
            <Text style={styles.appName}>Product Management</Text>
          </View>
        </View>
      </View>
      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        onPress={() => console.log ('Pressed')}
      />
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 60,
  },
});
