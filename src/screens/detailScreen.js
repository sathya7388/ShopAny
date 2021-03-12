import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import {Snackbar} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {SliderBox} from 'react-native-image-slider-box';

export default class DetailScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      productData: [this.props.route.params.productData],
      visible: false,
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
      <View style={styles.container}>
        <SliderBox
          images={this.state.images}
          onCurrentImagePressed={index =>
            console.warn (`image ${index} pressed`)}
        />
        <ScrollView>
          <View style={styles.productContent}>
            <Text>{this.state.productData[0].name}</Text>
            <Text>{this.state.productData[0].price}</Text>
            <Text>Description</Text>
          </View>
        </ScrollView>
        <View style={styles.btnView}>
          <View style={styles.btn}>
            <Button
              title="Buy Now"
              raised={true}
              onPress={() =>
                this.props.navigation.navigate ('CheckoutScreen', {
                  productData: this.state.productData,
                })}
            />
          </View>
          <View style={styles.btn}>
            <Button
              title="Add to Cart"
              raised={true}
              onPress={() => this.setState ({visible: true})}
            />
          </View>
        </View>
        <Snackbar
          visible={this.state.visible}
          duration={2000}
          onDismiss={() => this.setState ({visible: false})}
        >
          Added to Cart
        </Snackbar>

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
