import 'react-native-gesture-handler';

import React from 'react';
import {Image} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {
  createMaterialBottomTabNavigator,
} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import {StackActions} from '@react-navigation/native';

import CategoryScreen from './categoryManagement';
import ReportScreen from './ReportScreen';
import ProductScreen from './productManagement';
import UpdateProduct from './updateProduct';
import PastOrderScreen from './pastOrder';
import CurrentOrderScreen from './currentOrder';

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

function productStack () {
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
        name="ProductScreen"
        component={ProductScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpdateProduct"
        component={UpdateProduct}
        options={{title: 'Product Detail'}}
      />
    </Stack.Navigator>
  );
}
function OrderTopTab () {
  return (
    <TopTab.Navigator>
      <TopTab.Screen
        name="Pending Order"
        component={CurrentOrderScreen}
        options={{
          tabBarLabel: 'Pending Order',
        }}
      />
      <TopTab.Screen
        name="Past Order"
        component={PastOrderScreen}
        options={{
          tabBarLabel: 'Past Order',
        }}
      />
    </TopTab.Navigator>
  );
}

export default function SellerRoute () {
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
        name="ReportScreen"
        component={ReportScreen}
        listeners={resetHomeStackOnTabPress}
        options={{
          tabBarLabel: 'Stats',
        }}
      />
      <Tab.Screen
        name="ProductScreen"
        component={productStack}
        listeners={resetHomeStackOnTabPress}
        options={{
          tabBarLabel: 'Products',
        }}
      />
      <Tab.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        listeners={resetHomeStackOnTabPress}
        options={{
          tabBarLabel: 'Category',
        }}
      />
      <Tab.Screen
        name="OrderTopTab"
        component={OrderTopTab}
        listeners={resetHomeStackOnTabPress}
        options={{
          tabBarLabel: 'Order',
        }}
      />
    </Tab.Navigator>
  );
}
