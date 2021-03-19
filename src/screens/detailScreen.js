import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Snackbar} from 'react-native-paper';
import * as Data from '../data';
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
      stockData: true,
      visible: false,
      quantityData: 1,
      isFavorite: false,
      snackMessage: '',
      snackVisible: false,
      modalVisible: false,
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
      this.setState ({availabilty: 'In Stock', stockData: true});
    } else {
      this.setState ({availabilty: 'Currently Unavailable', stockData: false});
    }
    this.getFavList ();
  }
  checkOutCall = () => {
    var productObj = this.state.productData[0];
    productObj.prodQuantity = parseInt (this.state.quantityData);
    // console.log (productObj);
    var prodData = [productObj];
    this.props.navigation.navigate ('CheckoutScreen', {
      productData: prodData,
      screenName: 'cartScreen',
    });
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
      'https://shopany-api.herokuapp.com/api/user/' +
        Data.currentUser[0]._id +
        '/getFavs',
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
        quantity: this.state.quantityData,
        cartType: 0,
      }),
    };

    fetch (
      'https://shopany-api.herokuapp.com/api/user/' +
        Data.currentUser[0]._id +
        '/addCart',
      requestOptions
    )
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        if ((responseData.status = 'sucess')) {
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
  showDialog = () => {
    this.setState ({modalVisible: !this.state.modalVisible});
  };
  updateFav = () => {
    let url = '';
    if (this.state.isFavorite) {
      //remove
      // this.setState ({isFavorite: false});
      url =
        'https://shopany-api.herokuapp.com/api/user/' +
        Data.currentUser[0]._id +
        '/removeFav/' +
        this.state.productData[0]._id;
    } else {
      //add
      // this.setState ({isFavorite: true});
      url =
        'https://shopany-api.herokuapp.com/api/user/' +
        Data.currentUser[0]._id +
        '/addFav/' +
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState ({modalVisible: !this.state.modalVisible});
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Quantity
              </Text>
              <TextInput
                keyboardType={'numeric'}
                maxLength={2}
                onChangeText={text => {
                  this.setState ({quantityData: text});
                }}
                value={this.state.quantityData.toString ()}
                textAlign={'center'}
                style={{
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  borderRadius: 4,
                  width: wp (30),
                  height: hp (5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  if (this.state.quantityData == 0) {
                    this.setState ({quantityData: 1});
                  }
                  this.setState ({modalVisible: !this.state.modalVisible});
                }}
              >
                <Text style={styles.textStyle}>Ok</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <SliderBox
          images={this.state.productData[0].images}
          disableOnPress={true}
        />
        <ScrollView>
          <View style={styles.lineStyle} />
          <View style={styles.productContent}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.productNameContainer}>
                <Text style={styles.productName} numberOfLines={10}>
                  {this.state.productData[0].name}
                </Text>
              </View>
              <TouchableOpacity onPress={this.updateFav}>
                <Image
                  source={
                    this.state.isFavorite === true
                      ? require ('../assets/images/heartSelected.png')
                      : require ('../assets/images/heart-unselected.png')
                  }
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.productPrice}>
              {'$' + this.state.productData[0].price}
            </Text>
            <Text
              style={[
                styles.productName,
                this.state.stockData ? styles.instock : styles.nostock,
              ]}
            >
              {this.state.availabilty}
            </Text>
            <TouchableOpacity style={styles.quantity} onPress={this.showDialog}>
              <Text>{'Qty : ' + this.state.quantityData}</Text>
            </TouchableOpacity>
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

          </View>
        </ScrollView>

        <View style={styles.btnorderview}>
          <TouchableOpacity
            style={styles.btnPlaceOrderContainer}
            onPress={this.addToCart}
          >
            <Text style={styles.txtPlaceOrder}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnPlaceOrderContainer, {backgroundColor: '#ef6c00'}]}
            onPress={this.checkOutCall}
          >
            <Text style={styles.txtPlaceOrder}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.btnView}>
          <View style={styles.btn}>
            <Button
              title="Add to Cart"
              raised={true}
              onPress={this.addToCart}
            />
          </View>
          <View style={[styles.btn, {backgroundColor: '#ef6c00'}]}>
            <Button title="Buy Now" raised={true} onPress={this.checkOutCall} />
          </View>
        </View> */}

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
    backgroundColor: '#ffffff',
  },
  starRating: {
    left: 0,
    alignSelf: 'flex-start',
  },
  productContent: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  productNameContainer: {
    width: wp (80),
    marginRight: 20,
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
  btnorderview: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  btnPlaceOrderContainer: {
    alignItems:'center',
    justifyContent: 'center',
    marginRight:10,
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    width: wp (40),
    height:hp(5),
  },
  txtPlaceOrder: {
    fontSize: 14,
    color: '#fff',
    alignSelf: 'center',
  },
  quantity: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#CDCDCD',
    borderWidth: 0.3,
    borderRadius: 5,
    paddingVertical: 3,
    width: wp (13),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  icon: {
    height: hp (2.6),
    width: wp (6),
    justifyContent: 'flex-end',
    marginRight: 5,
    marginTop: 5,
  },
  lineStyle: {
    backgroundColor: '#E0E0E0',
    height: 1,
  },
  instock: {
    color: 'green',
  },
  nostock: {
    color: 'red',
  },
});
