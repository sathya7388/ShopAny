import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ScreenWidth = Dimensions.get ('window').width;
export default function homeCard (props) {
  const navigation = useNavigation ();
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate ('DetailScreen', {productData: props.data})}
    >
      <View style={cardStyle.card}>
        <Image source={{uri: props.data.images[0]}} style={cardStyle.image} />
        <View style={cardStyle.lineStyle} />
        <View style={cardStyle.vendorRow}>
          <Text style={{fontSize: 13, fontWeight: 'bold'}} numberOfLines={1}>
            {props.data.name}
          </Text>
        </View>
        <View style={cardStyle.vendorRow}>
          <Text style={{fontSize: 10}}>{'$' + props.data.price}</Text>
        </View>
        <View style={cardStyle.ratingStyle}>
          <Text style={cardStyle.ratingValueStyle}>
            {props.data.rating.toFixed (1)}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const cardStyle = StyleSheet.create ({
  card: {
    borderRadius: 8,
    elevation: 5,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginRight: 15,
    marginLeft: 15,
    marginVertical: 10,
    flexDirection: 'column',
    width: (ScreenWidth - 40) / 2 - 10,
  },
  vendorRow: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 2,
    marginBottom: 5,
  },
  ratingStyle: {
    borderWidth: 0,
    borderRadius: 150,
    padding: 5,
    right: 4,
    bottom: 2,
    position: 'absolute',
    backgroundColor: '#e8ebe9',
  },
  ratingValueStyle: {
    fontSize: 8,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 130,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  lineStyle: {
    backgroundColor: '#E0E0E0',
    height: 1,
  },
});
