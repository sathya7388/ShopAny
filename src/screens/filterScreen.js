import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RadioButton, TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default class FilterScreen extends Component {

  constructor (props) {
    super (props);
    this.state = {
      value: 'first',
      fromPrice: '',
      toPrice: '',
      categoryData: '0',
      dropDownData: [
        {
          label: 'All Categories',
          value: '0',
        },
        {
          label: 'Mobile & Computers',
          value: '1',
        },
        {
          label: 'Video Games',
          value: '2',
        },
        {
          label: 'Appliances',
          value: '3',
        },
        {
          label: 'Sports and Fitness',
          value: '4',
        },
        {
          label: 'Books',
          value: '5',
        },
      ],
    };
  }

  resetData = () => {
    this.setState({
      value: 'first',
      fromPrice: '',
      toPrice: '',
      categoryData: '0',
    })
  };
  
  render () {
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <View style={filterStyle.filterComponents}>
          <Text style={filterStyle.componentTitle}>Category</Text>
          <DropDownPicker
            items={this.state.dropDownData}
            defaultValue={this.state.categoryData}
            containerStyle={{height: wp (10)}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => this.setState({ categoryData: item.value })}
          />
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
            onChangeText={text => this.setState({ fromPrice: text })}
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
            onChangeText={text => this.setState({ toPrice: text })}
            value={this.state.toPrice}
          />
          <Text style={filterStyle.componentTitle}>SortBy</Text>
          <View style={{flexDirection: 'row'}}>
            <RadioButton.Group
              onValueChange={newValue => this.setState({ value: newValue })}
              value={this.state.value}
            >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value="first" />
                <Text>Price : Low to High</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value="second" />
                <Text>Price : High to Low</Text>
              </View>
            </RadioButton.Group>
          </View>

        </View>
        <View style={filterStyle.btnorderview}>
          <TouchableOpacity
            style={filterStyle.btnPlaceOrderContainer}
            onPress={this.resetData}
          >
            <Text style={filterStyle.txtPlaceOrder}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={filterStyle.btnPlaceOrderContainer}
            onPress={() => this.props.navigation.navigate ('HomeScreen')}
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
