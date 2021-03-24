import 'react-native-gesture-handler';

import React from 'react';
import {Image} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import {StackActions} from '@react-navigation/native';

import HomeScreen from './homeScreen';
import DetailScreen from './detailScreen';
import FilterScreen from './filterScreen';
import ProfileScreen from './profileScreen';
import CurrentOrderScreen from './currentOrderScreen';
import PastOrderScreen from './pastOrderScreen';
import CartScreen from './cartScreen';
import SaveForLaterScreen from './saveForLaterScreen';
import FavoriteScreen from './FavoriteScreen';
import CheckoutScreen from './checkoutScreen';



const Stack = createStackNavigator ();
const Tab = createBottomTabNavigator ();
const TopTab = createMaterialTopTabNavigator ();

const resetHomeStackOnTabPress = ({navigation, route}) => ({
  tabPress: e => {
    const state = navigation.dangerouslyGetState ();

    if (state) {
      const nonTargetTabs = state.routes.filter (r => r.key !== e.target);

      nonTargetTabs.forEach (tab => {
        // Find the tab we want to reset and grab the key of the nested stack
          const stackKey = tab?.state?.key;

        if (stackKey) {
          navigation.dispatch ({
            ...StackActions.popToTop (),
            target: stackKey,
          });
        }
      });
    }
  },
});

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

export default function RouteScreen () {
  return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#009688',
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
          listeners={resetHomeStackOnTabPress}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={
                  focused
                    ? require ('../assets/images//home-color.png')
                    : require ('../assets/images/home-black.png')
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
          listeners={resetHomeStackOnTabPress}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={
                  focused
                    ? require ('../assets/images/cart-color.png')
                    : require ('../assets/images/cart-black.png')
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
          listeners={resetHomeStackOnTabPress}
          options={{
            tabBarLabel: 'Favorite',
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={
                  focused
                    ? require ('../assets/images/favorites-color.png')
                    : require ('../assets/images/favorites-black.png')
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
          listeners={resetHomeStackOnTabPress}
          options={{
            tabBarLabel: 'Order',
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={
                  focused
                    ? require ('../assets/images/orders-color.png')
                    : require ('../assets/images/orders-black.png')
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
  );
}
