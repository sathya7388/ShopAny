import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Textarea from 'react-native-textarea';
import DeleteImage from 'react-native-vector-icons/Ionicons';
import AddImage from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Data from '../data';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function UpdateProduct (props) {
  const [isLoading, setLoading] = useState (false);
  const [categories, setCategoryData] = useState ([
    {
      label: '',
      value: '0',
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState (null);
  const [pName, setName] = useState ('');
  const [pQty, setQty] = useState ('');
  const [pPrice, setPrice] = useState ('');
  const [pDeliveryFee, setDeliveryFee] = useState ('');
  const [pDiscount, setDiscount] = useState ('');
  const [pExpDelivery, setExpDelivery] = useState ('');
  const [pDescription, setDescription] = useState ('');
  const [deletedImage, setDeletedImage] = useState ('');
  const [productImage, setProductImage] = useState ([]);
  const [btnSave, setbtnSave] = useState ('');

  useEffect (() => {
    const unsubscribe = props.navigation.addListener ('focus', () => {
      setLoading (true);
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      fetch ('https://shopany-api.herokuapp.com/api/categories', requestOptions)
        .then (response => {
          return response.json ();
        })
        .then (responseData => {
          if (responseData.status == 'success') {
            var categoryArray = [];
            for (var i = 0; i < responseData.categories.length; i++) {
              var categoryData = {};
              categoryData.value = responseData.categories[i]._id;
              categoryData.label = responseData.categories[i].categoryName;
              categoryArray.push (categoryData);
              if (
                props.route.params.prodtDetails != '' &&
                responseData.categories[i]._id ==
                  props.route.params.prodtDetails.categoryId
              ) {
                setSelectedCategory (
                  props.route.params.prodtDetails.categoryId
                );
              }
            }
            setCategoryData (categoryArray);
          }
          if (props.route.params.prodtDetails != '') {
            setbtnSave ('Update');
            var tempArray = [];
            for (
              var i = 0;
              i < props.route.params.prodtDetails.images.length;
              i++
            ) {
              var tempObj = {};
              tempObj.id = i;
              tempObj.image = props.route.params.prodtDetails.images[i];
              tempArray.push (tempObj);
            }
            setProductImage (tempArray);
            setName (props.route.params.prodtDetails.name);
            setQty (props.route.params.prodtDetails.quantity.toString ());
            setPrice (props.route.params.prodtDetails.price.toString ());
            setExpDelivery(props.route.params.prodtDetails.expectedDeliveryDate.toString ());
            setDeliveryFee (
              props.route.params.prodtDetails.deliveryFee.toString ()
            );
            setDiscount (props.route.params.prodtDetails.discount.toString ());
            setDescription (props.route.params.prodtDetails.description);
          } else {
            setbtnSave ('Save');
          }
        })
        .catch (error => console.error (error))
        .finally (() => {
          setLoading (false);
        });
    });
    return unsubscribe;
  }, []);
  const saveData = function () {
    var url = '';
    var tempArray = [];
    for (var i = 0; i < productImage.length; i++) {
      tempArray.push (productImage[i].image);
    }
    var saveObj = {};
    saveObj.name = pName;
    saveObj.description = pDescription;
    saveObj.quantity = pQty;
    saveObj.price = pPrice;
    saveObj.deliveryFee = pDeliveryFee;
    saveObj.discount = pDiscount;
    saveObj.expectedDeliveryDate = pExpDelivery;
    saveObj.images = tempArray;
    saveObj.categoryId = selectedCategory;

    if (props.route.params.prodtDetails != '') {
      url =
        'https://shopany-api.herokuapp.com/api/product/' +
        props.route.params.prodtDetails._id +
        '/update';
    } else {
      url = 'https://shopany-api.herokuapp.com/api/product/add';
      saveObj.sellerId = Data.currentUser[0]._id;
      saveObj.rating = ((Math.random() * 4) + 1).toFixed(1);
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify (saveObj),
    };
    fetch (url, requestOptions)
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        console.log (responseData);
        if ((responseData.status = 'success')) {
          if (props.route.params.prodtDetails != '') {
            // do nothing
            // show snack bar
          } else {
            //clear all data
            // show snack bar
          }
        }
      })
      .catch (error => console.error (error))
      .finally (() => {
        //setLoading (false);
      });
  };
  const addImageData = function () {
    console.log ('add called');
  };

  const deleteImage = function (data) {
    var tempArray = productImage;
    for (var i = 0; i < tempArray.length; i++) {
      if (tempArray[i].id == data.id) {
        tempArray.splice (i, 1);
      }
    }
    setDeletedImage (data.id);
    setProductImage (tempArray);
  };

  const addImage = function () {
    return (
      <View style={styles.addImageContainer}>
        <TouchableOpacity style={styles.addBtn}>
          <AddImage
            name="add-a-photo"
            onPress={addImageData}
            backgroundColor="#ddd"
            color="black"
            size={50}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderItem = ({item}) => (
    <View style={styles.imageData}>
      <Image source={{uri: item.image}} style={styles.cartImage} />
      <TouchableOpacity style={styles.btnContainer}>
        <DeleteImage
          name="close-circle-sharp"
          onPress={() => {
            deleteImage (item);
          }}
          backgroundColor="#ddd"
          color="black"
          size={22}
        />
      </TouchableOpacity>
    </View>
  );
  if (isLoading) {
    return (
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <View>
        <ScrollView style={styles.wholeCont}>
          <SafeAreaView style={styles.imageContainer}>
            <FlatList
              data={productImage}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal={true}
              extraData={deletedImage}
              ListHeaderComponent={addImage}
            />
          </SafeAreaView>
          <View style={styles.container}>

            <TextInput
              label="Product Name"
              mode="outlined"
              value={pName}
              onChangeText={setName}
            />
            <TextInput
              label="Quantity"
              mode="outlined"
              value={pQty}
              onChangeText={setQty}
              keyboardType="numeric"
            />
            <TextInput
              label="Price"
              mode="outlined"
              value={pPrice}
              left={<TextInput.Affix text="$" />}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            <TextInput
              label="Delivery Fee"
              mode="outlined"
              value={pDeliveryFee}
              left={<TextInput.Affix text="$" />}
              onChangeText={setDeliveryFee}
              keyboardType="numeric"
            />
            <TextInput
              label="Discount"
              mode="outlined"
              value={pDiscount}
              left={<TextInput.Affix text="$" />}
              onChangeText={setDiscount}
              keyboardType="numeric"
            />
            <TextInput
              label="Expected Delivery"
              mode="outlined"
              value={pExpDelivery}
              onChangeText={setExpDelivery}
              keyboardType="numeric"
            />
            <DropDownPicker
              items={categories}
              placeholder={'Select Category'}
              defaultValue={selectedCategory}
              containerStyle={{
                height: wp (13),
                borderWidth: 0.7,
                borderRadius: 5,
                zIndex: 10,
              }}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{
                backgroundColor: '#ddd',
                zIndex: 10,
              }}
              onChangeItem={item => setSelectedCategory (item.value)}
            />
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              onChangeText={setDescription}
              defaultValue={pDescription}
              maxLength={800}
              placeholder={'Description'}
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
            />

          </View>
          <View style={styles.btnorderview}>
            <TouchableOpacity
              style={[
                styles.btnPlaceOrderContainer,
                {backgroundColor: '#78909c'},
              ]}
              onPress={() => {
                props.navigation.navigate ('ProductScreen');
              }}
            >
              <Text style={styles.txtPlaceOrder}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnPlaceOrderContainer}
              onPress={saveData}
            >
              <Text style={styles.txtPlaceOrder}>{btnSave}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    );
  }
}
const styles = StyleSheet.create ({
  wholeCont: {
    backgroundColor: '#fff',
  },
  container: {
    margin: 20,
    marginTop: 5,
    height: hp (100),
  },
  textareaContainer: {
    height: hp (30),
    padding: 5,
    marginVertical: 15,
    backgroundColor: '#ddd',
    borderRadius: 8,
    borderWidth: 0.7,
  },
  textarea: {
    textAlignVertical: 'top',
    height: hp (29),
    fontSize: 14,
    color: '#333',
  },
  activity: {
    height: hp (100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  imageData: {
    borderWidth: 0.5,
    borderRadius: 5,
    width: wp (25),
    height: hp (15),
    marginHorizontal: 5,
  },
  cartImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  btnContainer: {
    right: 0,
    position: 'absolute',
    elevation: 9,
  },
  addImageContainer: {
    borderWidth: 0.5,
    borderRadius: 5,
    width: wp (25),
    height: hp (15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtn: {
    elevation: 9,
  },
  btnorderview: {
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 20,
    alignItems: 'center',
  },
  btnPlaceOrderContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 2,
    paddingVertical: 4,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    width: wp (40),
  },
  txtPlaceOrder: {
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
  },
});
