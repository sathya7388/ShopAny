import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {SliderBox} from 'react-native-image-slider-box';
import CartCard from '../components/cartCard';
import FilterScreen from './filterScreen';


export default class DetailScreen extends Component {
  
  constructor (props) {
    super (props);
    this.state = {
      images: [
        'https://source.unsplash.com/1024x768/?nature',
        'https://source.unsplash.com/1024x768/?water',
        'https://source.unsplash.com/1024x768/?girl',
        'https://source.unsplash.com/1024x768/?tree',
      ],
    };
  }

  render () {
    return (
      // <View>
        // <FilterScreen />
      // {/* </View> */}
    
    // <CartCard></CartCard>
      <View style={styles.container}>
        <SliderBox
          images={this.state.images}
          onCurrentImagePressed={index =>
            console.warn (`image ${index} pressed`)}
        />
        <ScrollView>
          <View style={styles.productContent}>
            <Text>Product Name</Text>
            <Text>Product Price</Text>
            <Text>Description</Text>
          </View>
        </ScrollView>
        <View style={styles.btnView}>
          <View style={styles.btn}>
            <Button title="Buy" raised={true} onPress={() => this.props.navigation.navigate ('CheckoutScreen')}/>
          </View>
          <View style={styles.btn}>
            <Button title="Add to Cart" raised={true} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  productContent: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  btnView: {
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: wp ('50%'),
  },
});
