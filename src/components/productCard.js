import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Edit from 'react-native-vector-icons/AntDesign';
import Delete from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

export default function ProductCard({data, deleteProduct}) {
  const navigation = useNavigation ();
  const updateCat = function () {
    navigation.navigate ('UpdateProduct', {prodtDetails: data});
  };
  const deleteCat = function () {
    deleteProduct (data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={styles.detailData}>
          <Text style={{fontWeight: 'bold', fontSize: 14}}>{data.name}</Text>
          <View style={styles.dataRow}>
            <Text style={styles.lblValue}>Price : $</Text>
            <Text style={styles.lblValue}>{data.price}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.lblValue}>Qty : </Text>
            <Text style={styles.lblValue}>{data.quantity}</Text>
          </View>
        </View>
        <View style={styles.imageData}>
          <Image source={{uri: data.images[0]}} style={styles.cartImage} />
        </View>

      </View>
      <View style={styles.lineStyle} />
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.btnContainer}>
          <Edit
            name="edit"
            onPress={updateCat}
            backgroundColor="#ddd"
            color="black"
            size={21}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer}>
          <Delete
            name="delete-outline"
            onPress={deleteCat}
            backgroundColor="#ddd"
            color="black"
            size={22}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    borderRadius: 8,
    elevation: 5,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    marginVertical: 10,
    width: wp (90),
    height: hp (20),
    flexDirection: 'column',
  },
  detailsContainer: {
    flexDirection: 'row',
    flex: 2,
    margin: 10,
  },
  detailData: {
    flex: 5,
  },
  dataRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  lblValue: {
    // fontSize: 10.5,
  },
  imageData: {
    flex: 3,
  },
  cartImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  actionContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
  },
  lineStyle: {
    backgroundColor: '#E0E0E0',
    height: 1,
    marginHorizontal: 5,
  },
});
