import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable, Image} from 'react-native';
import {TextInput} from 'react-native-paper';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Snackbar} from 'react-native-paper';
import * as Data from '../data';

//import HorizontalPicker from 'react-native-horizontal-picker';

function loginScreen({navigation}) {
  const [visible, setVisible] = useState (false);
  const [data1, setData] = useState ({
    email: '',
    password: '',
  });
  function validateLogin () {
    // console.log('sign in pressed**************');
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        password: data1.password,
        email: data1.email,
      }),
    };

    fetch ('https://shopany-api.herokuapp.com/api/user/login', requestOptions)
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        if (responseData.status == 'success' && responseData.user.length != 0) {
          //console.log(responseData)
          Data.currentUser.splice (
            0,
            Data.currentUser.length,
            responseData.user[0]
          );
          // console.log('called')
          if (responseData.user[0].userType == 1) {
            navigation.navigate ('RouteScreen');
          } else {
            navigation.navigate ('SellerScreen');
          }
          // console.log('Navigate to home screen')
        }
      })
      .catch (error => {
        console.log ('fail');
      })
      .finally (() => {
        // setLoading(false)
      });
  }

  const onPressHandler = () => {
    navigation.navigate ('SignUp');
  };

  return (
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={require ('../assets/images/shopAnyLogo.png')}
      />
      {/* <Text style={styles.text}>Login</Text> */}
      <View>
        <TextInput
          style={styles.input}
          label="Email"
          name="email"
          onChangeText={text => setData ({...data1, email: text})}
          value={data1.email}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          label="Password"
          name="password"
          onChangeText={text => setData ({...data1, password: text})}
          value={data1.password}
        />
      </View>
      <Pressable style={styles.button} onPress={validateLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
      <View style={styles.statement}>
        <Pressable onPress={onPressHandler}>
          <Text style={styles.line}>
            New User?
            <Text style={styles.register}> Sign Up</Text>
          </Text>
        </Pressable>
      </View>
      <Snackbar
        visible={visible}
        duration={2000}
        onDismiss={() => setVisible (false)}
      >
        Login Failed
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create ({
  body: {
    backgroundColor: '#5AB568',
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: -40,
    color: 'white',
    fontSize: 30,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    // backgroundColor: '#f2faf4',
    padding: 5,
    width: wp (80),
    marginVertical: 20,
    height: hp (6),
    // marginTop: 10,
    fontSize: 18,
    // marginBottom: 20,
  },
  logo: {
    width: 270,
    height: 170,
  },
  button: {
    borderRadius: 5,
    alignItems: 'center',
    width: 150,
    color: 'white',
    //marginTop:10,
    padding: 5,
    backgroundColor: '#064f19',
  },
  buttonText: {
    color: 'white',
    padding: 5,
    fontSize: 22,
    fontWeight: 'bold',
  },
  statement: {
    marginTop: 20,
  },
  register: {
    color: '#f2faf4',
    fontSize: 18,
    fontWeight: 'bold',
  },
  line: {
    fontSize: 18,
  },
  btnorderview: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  btnPlaceOrderContainer: {
    elevation: 8,
    backgroundColor: '#064f19',
    borderRadius: 2,
    paddingVertical: 4,
    paddingHorizontal: 30,
    color: 'white',
    marginHorizontal: 20,
    width: wp (40),
  },
  items: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
});
export default loginScreen;
