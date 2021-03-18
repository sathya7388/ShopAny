import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Snackbar} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AirbnbRating} from 'react-native-ratings';
import {SliderBox} from 'react-native-image-slider-box';

export default class DetailScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      productData: [this.props.route.params.productData],
      availabilty: '',
      visible: false,
      quantityData: '1',
      isFavorite: false,
      snackMessage: '',
      snackVisible: false,
      dropDownData: [
        {
          label: '1',
          value: '1',
        },
      ],
    };
  }
  componentDidMount () {
    if (this.state.productData[0].quantity > 1) {
      this.setState ({availabilty: 'In Stock'});
    } else {
      this.setState ({availabilty: 'Currently Unavailable'});
    }
    this.getFavList ();
  }
  checkOutCall = () => {
    var productObj = this.state.productData[0];
    productObj.prodQuantity = parseInt (this.state.quantityData);
    console.log (productObj);
    var prodData = [productObj];
    this.props.navigation.navigate ('CheckoutScreen', {productData: prodData});
  };
  getFavList = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch (
      'https://shopany-api.herokuapp.com/api/user/60518967ed36fa05ec9b4ef1/getFavs',
      requestOptions
    )
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        for (var i = 0; i < responseData.products.length; i++) {
          if (responseData.products[i]._id == this.state.productData[0]._id) {
            this.setState ({isFavorite: true});
          } else {
            this.setState ({isFavorite: false});
          }
        }
        // setFavData (responseData.products);
      })
      .catch (error => console.error (error))
      .finally (() => {
        // setLoading (false)
      });
  };
  addToCart = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        productId: this.state.productData[0]._id,
        quantity: 1,
        cartType: 0,
      }),
    };

    fetch (
      'https://shopany-api.herokuapp.com/api/user/60518967ed36fa05ec9b4ef1/addCart',
      requestOptions
    )
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        if(responseData.status = 'sucess'){
          this.setState ({
            snackMessage: 'Added to Cart',
            snackVisible: true,
          });
        }
      })
      .catch (error => console.error (error))
      .finally (() => {
        // setLoading (false)
      });
    
  };
  updateFav = () => {
    let url = '';
    if (this.state.isFavorite) {
      //remove
      // this.setState ({isFavorite: false});
      url =
        'https://shopany-api.herokuapp.com/api/user/60518967ed36fa05ec9b4ef1/removeFav/' +
        this.state.productData[0]._id;
    } else {
      //add
      // this.setState ({isFavorite: true});
      url =
        'https://shopany-api.herokuapp.com/api/user/60518967ed36fa05ec9b4ef1/addFav/' +
        this.state.productData[0]._id;
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch (url, requestOptions)
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        if (responseData.status == 'success') {
          if (this.state.isFavorite) {
            this.setState ({
              isFavorite: false,
              snackMessage: 'Removed From Favorites',
              snackVisible: true,
            });
          } else {
            this.setState ({
              isFavorite: true,
              snackMessage: 'Added To Favorites',
              snackVisible: true,
            });
          }
        } else {
          if (this.state.isFavorite) {
            this.setState ({
              isFavorite: true,
              snackMessage: 'Failed to Remove From Favorites',
              snackVisible: true,
            });
          } else {
            this.setState ({
              isFavorite: false,
              snackMessage: 'Failed to Add Favorite',
              snackVisible: true,
            });
          }
        }
      })
      .catch (error => {
        if (this.state.isFavorite) {
          this.setState ({
            isFavorite: true,
            snackMessage: 'Failed to Remove From Favorites',
            snackVisible: true,
          });
        } else {
          this.setState ({
            isFavorite: false,
            snackMessage: 'Failed to Add Favorite',
            snackVisible: true,
          });
        }
        console.error (error);
      })
      .finally (() => {
        // setLoading (false)
      });
  };
  render () {
    return (
      <View style={styles.container}>
        <SliderBox images={this.state.productData[0].images} />
        <ScrollView>
          <View style={styles.productContent}>
            <Text style={styles.productName}>
              {this.state.productData[0].name}
            </Text>
            <Text style={styles.productPrice}>
              {'$' + this.state.productData[0].price}
            </Text>
            <Text style={styles.productName}>{this.state.availabilty}</Text>
            <Text>Qty : 1</Text>
            {/* <DropDownPicker
              items={this.state.dropDownData}
              defaultValue={this.state.quantityData}
              containerStyle={{height: wp (10)}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => this.setState ({quantityData: item.value})}
            /> */}
            <AirbnbRating
              count={5}
              isDisabled={true}
              defaultRating={this.state.productData[0].rating}
              size={15}
              showRating={false}
              starContainerStyle={styles.starRating}
            />
            <Text style={{fontWeight: 'bold', marginVertical: 10}}>
              Description:
            </Text>
            <View style={styles.descriptionContainer}>
              <Text numberOfLines={100} style={styles.productDescription}>
                {this.state.productData[0].description}
              </Text>
            </View>
            <TouchableOpacity onPress={this.updateFav}>
              <Image
                source={require ('../assets/images/filter.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.btnView}>
          <View style={styles.btn}>
            <Button title="Buy Now" raised={true} onPress={this.checkOutCall} />
          </View>
          <View style={styles.btn}>
            <Button
              title="Add to Cart"
              raised={true}
              onPress={this.addToCart}
            />
          </View>
        </View>

        <Snackbar
          visible={this.state.snackVisible}
          duration={2000}
          onDismiss={() =>
            this.setState ({
              snackVisible: false,
            })}
        >
          {this.state.snackMessage}
        </Snackbar>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  starRating: {
    left: 0,
    alignSelf: 'flex-start',
  },
  productContent: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  productName: {
    fontSize: hp (2),
  },
  productPrice: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  descriptionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  productDescription: {
    fontSize: hp (1.5),
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
