import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
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
  const [pDescription, setDescription] = useState ('');

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
            }
            console.log (categoryArray);
            setCategoryData (categoryArray);
          }
          if (props.route.params.prodtDetails != '') {
            setName (props.route.params.prodtDetails.name);
            setQty ((props.route.params.prodtDetails.quantity).toString());
            setPrice ((props.route.params.prodtDetails.price).toString());
            setDeliveryFee ((props.route.params.prodtDetails.deliveryFee).toString());
            setDiscount ((props.route.params.prodtDetails.discount).toString());
            setDescription (props.route.params.prodtDetails.description);
          }
        })
        .catch (error => console.error (error))
        .finally (() => {
          setLoading (false);
        });
    });
    return unsubscribe;
  }, []);
  if (isLoading) {
    return (
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <ScrollView>
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
            // onChangeText={text => setText (text)}
          />
          <TextInput
            label="Price"
            mode="outlined"
            value={pPrice}
            left={<TextInput.Affix text="$" />}
          />
          <TextInput
            label="Delivery Fee"
            mode="outlined"
            value={pDeliveryFee}
            left={<TextInput.Affix text="$" />}
            onChangeText={setDeliveryFee}
          />
          <TextInput
            label="Discount"
            mode="outlined"
            value={pDiscount}
            left={<TextInput.Affix text="$" />}
            onChangeText={setDiscount}
          />
          {/* <Text>Category</Text> */}
          <DropDownPicker
            items={categories}
            placeholder={'Select Category'}
            defaultValue={selectedCategory}
            containerStyle={{height: wp (13),borderWidth: 0.7,borderRadius: 5,}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => setSelectedCategory (item.value)}
          />
          {/* <Text>Description</Text> */}
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
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create ({
  container: {
    margin: 20,
    height: hp (100),
  },
  textareaContainer: {
    height: hp (30),
    padding: 5,
    marginVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 0.7,
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: hp (29),
    fontSize: 14,
    color: '#333',
  },
  activity: {
    height: hp (100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
