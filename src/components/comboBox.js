import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

class ComboBox extends React.Component {
    state = {
        country: '0'
    }
  render () {
    return (
      <DropDownPicker
        items={[
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
        ]}
        defaultValue={this.state.country}
        containerStyle={{height: wp(10)}}
        style={{backgroundColor: '#fafafa',}}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={item =>
          this.setState ({
            country: item.value,
          })}
      />
    );
  }
}

export default ComboBox;
