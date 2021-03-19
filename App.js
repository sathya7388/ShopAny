import 'react-native-gesture-handler';

import React from 'react';


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';


import LoginScreen from './src/screens/loginScreen';
import SignUpScreen from './src/screens/signUpScreen';
import RouteScreen from './src/screens/routeScreen';

import * as Data from './src/data';

const Stack = createStackNavigator ();


class App extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      userLoggedIn: false,
    };
  }
  componentDidMount () {
    // if (Data.currentUser.length == 0) {
    //   this.setState ({userLoggedIn: false});
    // } else {
    //   this.setState ({userLoggedIn: true});
    // }
  }
  // updateUserState () {
  //   console.log ('call back');
  //   if (Data.currentUser.length == 0) {
  //     this.setState ({userLoggedIn: false});
  //   } else {
  //     this.setState ({userLoggedIn: true});
  //   }
  // }

  //  {this.state.userLoggedIn == true ? :}

  render () {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RouteScreen"
            component={RouteScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
