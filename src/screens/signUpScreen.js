import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function signUpScreen({navigation}) {
  const [userType, setUser] = useState (1);
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
  useEffect (() => {
    setUser (1);
    setShouldShow (false);
  }, []);
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
        userType: userType,
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
    <ScrollView style={styles.safeView}>
      <StatusBar animated={true} backgroundColor="#00897b" hidden={false} />
      <View style={styles.contTop}>
        <View style={styles.contBBtm}>
          <Image
            style={styles.logo}
            source={require ('../assets/images/shopAnyLogo.png')}
          />
        </View>
      </View>
      <View style={styles.contBtm}>
        <View style={styles.contTBtm}>
          <View
            style={[
              styles.textContainer,
              userType == 1
                ? styles.txtContainerBuyer
                : styles.txtContainerSeller,
            ]}
          >
            <View style={styles.tabView}>
              <TouchableOpacity
                style={[styles.btnPlaceOrderContainer]}
                onPress={() => {
                  setUser (1);
                  setShouldShow (false);
                }}
              >
                <Text
                  style={[
                    styles.items,
                    userType == 1 ? styles.tabSelect : styles.tabNotSelect,
                  ]}
                >
                  Customer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnPlaceOrderContainer]}
                onPress={() => {
                  setUser (2);
                  setShouldShow (true);
                }}
              >
                <Text
                  style={[
                    styles.items,
                    userType == 2 ? styles.tabSelect : styles.tabNotSelect,
                  ]}
                >
                  Seller
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="UserName"
              onChangeText={text => setData ({...data1, name: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={text => setData ({...data1, email: text})}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={text => setData ({...data1, password: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              keyboardType="numeric"
              onChangeText={text => setData ({...data1, phoneNumber: text})}
            />
            {shouldShow
              ? <TextInput style={styles.input} placeholder="Company" />
              : null}
            <TextInput
              style={styles.input}
              placeholder="Address"
              onChangeText={text => setData ({...data1, address: text})}
            />
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
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create ({
  contTop: {
    backgroundColor: '#e1f5fe',
    height: hp (15),
    width: wp (100),
  },
  contBBtm: {
    width: wp (100),
    backgroundColor: '#81c784',
    height: hp (15),
    borderBottomLeftRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contBtm: {
    backgroundColor: '#81c784',
    height: hp (85),
    width: wp (100),
  },
  contTBtm: {
    backgroundColor: '#e1f5fe',
    borderTopRightRadius: 40,
    width: wp (100),
    height: hp (85),
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: '#fff',
    width: wp (90),
    height: hp (70),
    margin: 30,
    borderRadius: 20,
    elevation: 8,
    alignItems: 'center',
  },
  txtContainerSeller: {
    height: hp (70),
  },
  txtContainerBuyer: {
    height: hp (63),
  },
  tabView: {
    flexDirection: 'row',
  },
  btnPlaceOrderContainer: {
    flex: 1,
    borderRadius: 2,
    paddingVertical: 4,
    height: hp (6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  items: {
    fontSize: 18,
    // color: 'white',
    alignSelf: 'center',
  },
  tabSelect: {
    fontWeight: 'bold',
    color: '#1a237e',
    textDecorationLine: 'underline',
  },
  tabNotSelect: {
    color: '#bdbdbd',
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: 20,
    width: wp (80),
    marginVertical: 10,
  },
  statement: {
    marginTop: 15,
  },
  register: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 270,
    height: 170,
  },
  button: {
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: wp (50),
    padding: 5,
    backgroundColor: '#81c784',
  },
  buttonText: {
    color: 'white',
    padding: 5,
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default signUpScreen;
