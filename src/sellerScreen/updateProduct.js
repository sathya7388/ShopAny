import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Dropdown} from 'react-native-material-dropdown-v2';
import Textarea from 'react-native-textarea';
import DeleteImage from 'react-native-vector-icons/Ionicons';
import AddImage from 'react-native-vector-icons/MaterialIcons';
import {Snackbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import {LogBox} from 'react-native';
import * as Data from '../data';

import {OutlinedTextField} from '@softmedialab/react-native-material-textfield';

export default function UpdateProduct (props) {
  const [visible, setVisible] = useState (false);
  const [snackMessage, setMessage] = useState ('');
  const [isModalVisible, setModalVisible] = useState (false);
  const toggleModal = function () {
    setModalVisible (!isModalVisible);
  };
  const [isLoading, setLoading] = useState (false);
  const [categories, setCategoryData] = useState ([{value: 'Select Category'}]);
  const [categoryKeyData, setcategoryKeyData] = useState ([]);
  const [selectedCategory, setSelectedCategory] = useState ('Select Category');
  const [selectedCategoryId, setSelectedCategoryId] = useState ('');
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
  const [imageUrlArray, setImageArray] = useState ([]);

  useEffect (() => {
    const unsubscribe = props.navigation.addListener ('focus', () => {
      LogBox.ignoreAllLogs ();
      LogBox.ignoreLogs (['Animated: `useNativeDriver`']);
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
            var categoryKeyValue = [];
            for (var i = 0; i < responseData.categories.length; i++) {
              var categoryData = {};
              var catKeyObj = {};
              categoryData.value = responseData.categories[i].categoryName;
              categoryArray.push (categoryData);
              catKeyObj.value = responseData.categories[i].categoryName;
              catKeyObj.id = responseData.categories[i]._id;
              categoryKeyValue.push (catKeyObj);
              if (
                props.route.params.prodtDetails != '' &&
                responseData.categories[i]._id ==
                  props.route.params.prodtDetails.categoryId
              ) {
                setSelectedCategory (responseData.categories[i].categoryName);
              }
            }
            setcategoryKeyData (categoryKeyValue);
            setCategoryData (categoryArray);
          }
          if (props.route.params.prodtDetails != '') {
            setbtnSave ('Update');
            var tempArray = [];
            var tempImgArray = Array.from (
              props.route.params.prodtDetails.images
            );
            setImageArray (tempImgArray);
            for (
              var i = 0;
              i < props.route.params.prodtDetails.images.length;
              i++
            ) {
              var tempObj = {};
              tempObj.id = i;
              tempObj.image = props.route.params.prodtDetails.images[i];
              tempArray.push (tempObj);
              tempImgArray.push = props.route.params.prodtDetails.images[i];
            }
            setProductImage (tempArray);
            setName (props.route.params.prodtDetails.name);
            setQty (props.route.params.prodtDetails.quantity.toString ());
            setPrice (props.route.params.prodtDetails.price.toString ());
            setExpDelivery (
              props.route.params.prodtDetails.expectedDeliveryDate.toString ()
            );
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

  const uploadImage = function (file) {
    var formdata = new FormData ();
    formdata.append ('uploadedFile', {
      uri: file.uri,
      name: file.fileName,
      type: file.type,
    });
    var requestOptions = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: formdata,
    };
    fetch ('http://stageed.com/fileUpload.php', requestOptions)
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        if ((responseData.status = 'success')) {
          let tempArray = Array.from (imageUrlArray);
          tempArray.push (responseData.path);
          setImageArray (tempArray);

          var flatListArray = Array.from (productImage);
          var tempObj = {};
          tempObj.id = flatListArray.length + 1;
          tempObj.image = file.uri;
          flatListArray.push (tempObj);
          setProductImage (flatListArray);
        }
      })
      .catch (error => {
        console.error (error);
      })
      .finally (() => {
        //setLoading (false);
      });
  };
  const saveData = function () {
    var url = '';
    var saveObj = {};
    saveObj.name = pName;
    saveObj.description = pDescription;
    saveObj.quantity = pQty;
    saveObj.price = pPrice;
    saveObj.deliveryFee = pDeliveryFee;
    saveObj.discount = pDiscount;
    saveObj.expectedDeliveryDate = pExpDelivery;
    saveObj.images = imageUrlArray;
    saveObj.categoryId = selectedCategoryId;

    if (props.route.params.prodtDetails != '') {
      url =
        'https://shopany-api.herokuapp.com/api/product/' +
        props.route.params.prodtDetails._id +
        '/update';
    } else {
      url = 'https://shopany-api.herokuapp.com/api/product/add';
      saveObj.sellerId = Data.currentUser[0]._id;
      saveObj.rating = (Math.random () * 4 + 1).toFixed (1);
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
        if ((responseData.status = 'success')) {
          if (props.route.params.prodtDetails != '') {
            // update
            setVisible (true);
            setMessage ('Product Updated');
          } else {
            // add
            setProductImage ([]);
            setName ('');
            setQty ('');
            setPrice ('');
            setExpDelivery ('');
            setDeliveryFee ('');
            setDiscount ('');
            setDescription ('');
            setVisible (true);
            setSelectedCategory (null);
            setMessage ('Product Added');
          }
        }
      })
      .catch (error => console.error (error))
      .finally (() => {
        //setLoading (false);
      });
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request (
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn (err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request (
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          }
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn (err);
        alert ('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission ();
    let isStoragePermitted = await requestExternalWritePermission ();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera (options, response => {
        toggleModal ();
        if (response.didCancel) {
          // alert ('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          // alert ('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          // alert ('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          // alert (response.errorMessage);
          return;
        }

        uploadImage (response);
      });
    }
  };

  const chooseFile = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary (options, response => {
      toggleModal ();
      if (response.didCancel) {
        // alert ('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        // alert ('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        // alert ('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        // alert (response.errorMessage);
        return;
      }
      uploadImage (response);
    });
  };
  const selectComboId = function (item) {
    for (var i = 0; i < categoryKeyData.length; i++) {
      if (item == categoryKeyData[i].value) {
        setSelectedCategoryId (categoryKeyData[i].id);
      }
    }
  };
  const deleteImage = function (data) {
    var tempArray = Array.from (productImage);
    var tempUrlArray = Array.from (imageUrlArray);
    for (var i = 0; i < tempArray.length; i++) {
      if (tempArray[i].id == data.id) {
        tempArray.splice (i, 1);
      }
      if (data.image == tempUrlArray[i]) {
        tempUrlArray.splice (i, 1);
      }
    }
    setImageArray (tempUrlArray);
    setDeletedImage (data.id);
    setProductImage (tempArray);
  };

  const addImage = function () {
    return (
      <View style={styles.addImageContainer}>
        <TouchableOpacity style={styles.addBtn}>
          <AddImage
            name="add-a-photo"
            onPress={toggleModal}
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
          <View style={styles.toplineStyle} />
          <View style={styles.container}>
            <Dropdown
              label="Select Category"
              data={categories}
              value={selectedCategory}
              rippleCentered={true}
              dropdownPosition={0.5}
              itemCount={10}
              onChangeText={item => {
                selectComboId (item);
                setSelectedCategory (item);
              }}
              pickerStyle={{
                width: wp (90),
                marginHorizontal: 13,
                borderRadius: 8,
                elevation: 8,
                borderWidth: 0.5,
              }}
            />
            <OutlinedTextField
              label="Product Name"
              value={pName}
              onChangeText={setName}
            />
            <OutlinedTextField
              label="Price"
              keyboardType="phone-pad"
              prefix="$"
              value={pPrice}
              onChangeText={setPrice}
            />
            <OutlinedTextField
              label="Delivery Fee"
              keyboardType="phone-pad"
              prefix="$"
              value={pDeliveryFee}
              onChangeText={setDeliveryFee}
            />
            <OutlinedTextField
              label="Discount"
              keyboardType="phone-pad"
              prefix="$"
              value={pDiscount}
              onChangeText={setDiscount}
            />
            <OutlinedTextField
              label="Quantity"
              keyboardType="phone-pad"
              value={pQty}
              onChangeText={setQty}
            />
            <OutlinedTextField
              label="Expected Delivery"
              value={pExpDelivery}
              keyboardType="phone-pad"
              onChangeText={setExpDelivery}
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
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          onSwipeComplete={toggleModal}
        >
          <View style={styles.modalView}>
            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity
                style={[styles.modalContainer]}
                onPress={captureImage}
              >
                <Text>Take Photo</Text>
              </TouchableOpacity>
              <View style={styles.lineStyle} />
              <TouchableOpacity
                style={[styles.modalContainer]}
                onPress={() => {
                  toggleModal ();
                  chooseFile ();
                }}
              >
                <Text>Chose From Library</Text>
              </TouchableOpacity>
              <View style={styles.lineStyle} />
              <TouchableOpacity
                style={styles.modalContainer}
                onPress={() => {
                  toggleModal ();
                }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Snackbar
          visible={visible}
          duration={2000}
          onDismiss={() => setVisible (false)}
        >
          {snackMessage}
        </Snackbar>

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
    marginTop: 20,
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
  modalView: {
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingVertical: 15,
    height: hp (20),
    width: wp (90),
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp (90),
    height: hp (5),
    marginBottom: 5,
  },
  lineStyle: {
    backgroundColor: '#E0E0E0',
    height: 1,
    marginHorizontal: 10,
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: 20,
    width: wp (90),
    marginVertical: 10,
  },
  toplineStyle: {
    marginTop: 10,
    backgroundColor: '#E0E0E0',
    height: 1,
  },
});
