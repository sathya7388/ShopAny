import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-paper';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function signUpScreen({navigation}) {
  const [shouldShow, setShouldShow] = useState (false);

  const [data1, setData] = useState ({
    name: '',
    password: '',
    email: '',
    phoneNumber: 0,
    address: '',
    userType: 1,
    favourites: [],
    cart: [],
  });

  function createUser () {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        name: data1.name,
        password: data1.password,
        email: data1.email,
        phoneNumber: data1.phoneNumber,
        address: data1.address,
        userType: 1,
        favourites: [],
        cart: [],
      }),
    };

    fetch ('https://shopany-api.herokuapp.com/api/user/add', requestOptions)
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        if (responseData.status == 'success' && responseData.user.length != 0) {
          navigation.navigate ('Login');
        }
      })
      .catch (error => {});
  }

  return (
    <ScrollView>
      <View />
      <View style={styles.body}>
        <Image
          style={styles.logo}
          source={require ('../assets/images/shopAnyLogo.png')}
        />
        {/* <Text style={styles.text}>Register</Text> */}
        {/* <View style={styles.btnorderview}>
          <TouchableOpacity
            style={styles.btnPlaceOrderContainer}
            onPress={() => {
              setShouldShow (true);
            }}
          >
            <Text style={styles.items}>Seller</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnPlaceOrderContainer}
            onPress={() => {
              setShouldShow (false);
            }}
          >
            <Text style={styles.items}>Buyer</Text>
          </TouchableOpacity>
        </View> */}
        <View styles={{}}>
          <TextInput
            style={styles.input}
            label="UserName"
            onChangeText={text => setData ({...data1, name: text})}
          />
          <TextInput
            style={styles.input}
            label="Email"
            onChangeText={text => setData ({...data1, email: text})}
          />
          <TextInput
            style={styles.input}
            label="Phone"
            onChangeText={text => setData ({...data1, phoneNumber: text})}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            label="Password"
            onChangeText={text => setData ({...data1, password: text})}
          />

          <TextInput
            style={styles.input}
            label="Address"
            onChangeText={text => setData ({...data1, address: text})}
          />
          {shouldShow
            ? <TextInput style={styles.input} label="Company" />
            : null}
        </View>

        <Pressable onPress={createUser} style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>
        <View style={styles.statement}>
          <Pressable
            onPress={() => {
              navigation.navigate ('Login');
            }}
          >
            <Text>
              Already a user?
              <Text style={styles.register}> Log In</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create ({
  body: {
    backgroundColor: '#5AB568',
    flex: 1,
    height: hp (100),
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
    padding: 5,
    width: wp (80),
    marginVertical: 10,
    height: hp (6),
    fontSize: 15,
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

export default signUpScreen;
