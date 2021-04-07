import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
// import {TextInput} from 'react-native-paper';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Snackbar} from 'react-native-paper';
import * as Data from '../data';
import {LogBox} from 'react-native';

function loginScreen({navigation}) {
  LogBox.ignoreAllLogs ();
  const [visible, setVisible] = useState (false);
  const [data1, setData] = useState ({
    email: '',
    password: '',
  });
  function validateLogin () {
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
          Data.currentUser.splice (
            0,
            Data.currentUser.length,
            responseData.user[0]
          );
          if (responseData.user[0].userType == 1) {
            navigation.navigate ('RouteScreen');
          } else {
            navigation.navigate ('SellerScreen');
          }
        } else {
          setVisible (true);
        }
      })
      .catch (error => {
        setVisible (true);
        console.log (error);
      })
      .finally (() => {
        // setLoading(false)
      });
  }

  const onPressHandler = () => {
    navigation.navigate ('SignUp');
  };

  return (
    <View style={styles.container}>
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
          <View style={styles.textContainer}>
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
            >
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
            </View>

          </View>
        </View>
      </View>
      <Snackbar
        visible={visible}
        duration={2000}
        onDismiss={() => setVisible (false)}
      >
        Incorrect Username or Password
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    height: hp (100),
    flex: 1,
  },
  contTop: {
    backgroundColor: '#e1f5fe',
    height: hp (25),
    width: wp (100),
  },
  contBBtm: {
    width: wp (100),
    backgroundColor: '#81c784',
    height: hp (25),
    borderBottomLeftRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contBtm: {
    backgroundColor: '#81c784',
    height: hp (75),
    width: wp (100),
  },
  contTBtm: {
    backgroundColor: '#e1f5fe',
    borderTopRightRadius: 40,
    width: wp (100),
    height: hp (75),
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: '#fff',
    width: wp (90),
    height: hp (50),
    margin: 30,
    borderRadius: 20,
    elevation: 8,
    alignItems: 'center',
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: 20,
    width: wp (80),
    marginVertical: 10,
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
  statement: {
    marginTop: 20,
  },
  register: {
    // color: '#f2faf4',
    fontSize: 22,
    fontWeight: 'bold',
  },
  line: {
    fontSize: 14,
  },
});
export default loginScreen;
