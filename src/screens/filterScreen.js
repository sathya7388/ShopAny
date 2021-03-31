import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RadioButton, TextInput} from 'react-native-paper';
// import DropDownPicker from 'react-native-dropdown-picker';
import {Dropdown} from 'react-native-material-dropdown-v2';
import {LogBox} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class FilterScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      value: 'noPreference',
      fromPrice: '',
      toPrice: '',
      categoryData: 'Select Category',
      dropDownData: [{value: 'Select Category'}],
      categoryKeyData: [],
      selectedCategoryId: '',
    };
  }
  componentDidMount () {
    LogBox.ignoreLogs (['Animated: `useNativeDriver`']);
    this.setState ({
      value: this.props.route.params.filter.sortBy,
      fromPrice: this.props.route.params.filter.fromPrice,
      toPrice: this.props.route.params.filter.toPrice,
    });
    this.getCategory ();
  }
  getCategory = () => {
    fetch ('https://shopany-api.herokuapp.com/api/categories', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        if (responseData.status == 'success') {
          var categoryArray = [];
          var categoryKeyValue = [];
          for (var i = 0; i < responseData.categories.length; i++) {
            var catKeyObj = {};
            var categoryData = {};
            categoryData.value = responseData.categories[i].categoryName;
            categoryArray.push (categoryData);
            catKeyObj.value = responseData.categories[i].categoryName;
            catKeyObj.id = responseData.categories[i]._id;
            categoryKeyValue.push (catKeyObj);
            if (
              this.props.route.params.filter.category ==
              responseData.categories[i]._id
            ) {
              this.setState ({
                categoryData: responseData.categories[i].categoryName,
              });
            }
          }
          this.setState ({
            dropDownData: categoryArray,
            categoryKeyData: categoryKeyValue,
          });
        }
      })
      .catch (error => console.error (error))
      .finally (() => {
        // setLoading (false);
      });
  };
  selectComboId = item => {
    for (var i = 0; i < this.state.categoryKeyData.length; i++) {
      if (item == this.state.categoryKeyData[i].value) {
        this.setState ({selectedCategoryId: this.state.categoryKeyData[i].id});
      }
    }
  };
  resetData = () => {
    this.setState ({
      value: 'noPreference',
      fromPrice: '',
      toPrice: '',
      categoryData: 'Select Category',
      selectedCategoryId: 'Select Category',
    });
  };

  render () {
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <View style={filterStyle.filterComponents}>
          <Dropdown
            label="Select Category"
            data={this.state.dropDownData}
            value={this.state.categoryData}
            rippleCentered={true}
            dropdownPosition={1}
            onChangeText={item => {
              this.selectComboId (item);
              this.setState ({categoryData: item});
            }}
            pickerStyle={{
              width: wp (90),
              marginHorizontal: 13,
              borderRadius: 8,
              elevation: 8,
            }}
          />
          {/* <DropDownPicker
            items={this.state.dropDownData}
            defaultValue={this.state.categoryData}
            containerStyle={{height: wp (10)}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => this.setState ({categoryData: item.value})}
          /> */}
          <Text style={filterStyle.componentTitle}>Price</Text>
          <TextInput
            placeholder="From"
            keyboardType={'numeric'}
            maxLength={6}
            style={{
              borderColor: 'gray',
              borderWidth: 0.5,
              borderRadius: 4,
              width: wp (90),
              height: hp (5),
            }}
            onChangeText={text => this.setState ({fromPrice: text})}
            value={this.state.fromPrice}
          />
          <TextInput
            placeholder="To"
            keyboardType={'numeric'}
            maxLength={6}
            style={{
              borderColor: 'gray',
              borderWidth: 0.5,
              borderRadius: 4,
              marginTop: 10,
              width: wp (90),
              height: hp (5),
            }}
            onChangeText={text => this.setState ({toPrice: text})}
            value={this.state.toPrice}
          />
          <Text style={filterStyle.componentTitle}>SortBy</Text>
          <View style={{flexDirection: 'row'}}>
            <RadioButton.Group
              onValueChange={newValue => this.setState ({value: newValue})}
              value={this.state.value}
            >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value="low" />
                <Text>Price : Low to High</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value="high" />
                <Text>Price : High to Low</Text>
              </View>
            </RadioButton.Group>
          </View>

        </View>
        <View style={filterStyle.btnorderview}>
          <TouchableOpacity
            style={[
              filterStyle.btnPlaceOrderContainer,
              {backgroundColor: '#78909c'},
            ]}
            onPress={this.resetData}
          >
            <Text style={filterStyle.txtPlaceOrder}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={filterStyle.btnPlaceOrderContainer}
            onPress={() =>
              this.props.navigation.navigate ('HomeScreen', {
                filter: {
                  category: this.state.selectedCategoryId,
                  fromPrice: this.state.fromPrice,
                  toPrice: this.state.toPrice,
                  sortBy: this.state.value,
                },
              })}
          >
            <Text style={filterStyle.txtPlaceOrder}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const filterStyle = StyleSheet.create ({
  filterComponents: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  componentTitle: {
    marginVertical: 20,
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
