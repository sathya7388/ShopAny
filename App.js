import 'react-native-gesture-handler';

import React from 'react';
import {Image} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import {StyleSheet} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import HomeScreen from './src/screens/homeScreen';
import DetailScreen from './src/screens/detailScreen';
import FilterScreen from './src/screens/filterScreen';
import ProfileScreen from './src/screens/profileScreen';
import CurrentOrderScreen from './src/screens/currentOrderScreen';
import PastOrderScreen from './src/screens/pastOrderScreen';
import CartScreen from './src/screens/cartScreen';
import SaveForLaterScreen from './src/screens/saveForLaterScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import CheckoutScreen from './src/screens/checkoutScreen';



const Stack = createStackNavigator ();
const Tab = createBottomTabNavigator ();
const TopTab = createMaterialTopTabNavigator ();

function HomeStack () {
  return (
    <Stack.Navigator
      // initialRouteName="Home"
      screenOptions={{
        // headerShown: false
        // headerStyle: {backgroundColor: '#ffffff'},
        // headerTintColor: '#fff',
        // headerTitleStyle: {fontWeight: 'bold'},
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          // title: 'Home Page',
          // headerTitle: props => <Header {...props} />,
        }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{title: 'Product Detail'}}
      />
      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{title: 'Checkout'}}
      />
      <Stack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{title: 'Filters'}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{title: 'Account'}}
      />
    </Stack.Navigator>
  );
}
function cartStack () {
  return (
    <Stack.Navigator
      // initialRouteName="Home"
      screenOptions={{
        // headerShown: false,
        // headerStyle: {backgroundColor: '#ffffff'},
        // headerTintColor: '#fff',
        // headerTitleStyle: {fontWeight: 'bold'},
      }}
    >
      <Stack.Screen
        name="cart"
        component={CartTopTab}
        options={{
          headerShown: false,
          // headerTitle: props => <Header {...props} />,
        }}
      />
      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{title: 'Checkout'}}
      />
    </Stack.Navigator>
  );
}
function OrderTopTab () {
  return (
    <TopTab.Navigator>
      <TopTab.Screen
        name="PastOrderScreen"
        component={PastOrderScreen}
        options={{
          tabBarLabel: 'Past Order',
        }}
      />
      <TopTab.Screen
        name="CurrentOrderScreen"
        component={CurrentOrderScreen}
        options={{
          tabBarLabel: 'Upcoming Order',
        }}
      />
    </TopTab.Navigator>
  );
}
function CartTopTab () {
  return (
    <TopTab.Navigator>
      <TopTab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
        }}
      />
      <TopTab.Screen
        name="SaveForLaterScreen"
        component={SaveForLaterScreen}
        options={{
          tabBarLabel: 'Saved For Later',
        }}
      />
    </TopTab.Navigator>
  );
}
class App extends React.Component {
  render () {
    return (
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#42f44b',
          }}
          screenOptions={{
            headerStyle: {backgroundColor: '#42f44b'},
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold'},
          }}
        >
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({focused, color, size}) => (
                <Image
                  source={
                    focused
                      ? require ('./src/assets/images/home.png')
                      : require ('./src/assets/images/home.png')
                  }
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size,
                  }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="CartScreen"
            component={cartStack}
            options={{
              tabBarLabel: 'Cart',
              tabBarIcon: ({focused, color, size}) => (
                <Image
                  source={
                    focused
                      ? require ('./src/assets/images/cart.png')
                      : require ('./src/assets/images/cart.png')
                  }
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size,
                  }}
                />
              ),
            }}
          />

          <Tab.Screen
            name="FavoriteScreen"
            component={FavoriteScreen}
            options={{
              tabBarLabel: 'Favorite',
              tabBarIcon: ({focused, color, size}) => (
                <Image
                  source={
                    focused
                      ? require ('./src/assets/images/fav.png')
                      : require ('./src/assets/images/fav.png')
                  }
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size,
                  }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="OrderScreen"
            component={OrderTopTab}
            options={{
              tabBarLabel: 'Order',
              tabBarIcon: ({focused, color, size}) => (
                <Image
                  source={
                    focused
                      ? require ('./src/assets/images/order.png')
                      : require ('./src/assets/images/order.png')
                  }
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size,
                  }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create ({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
