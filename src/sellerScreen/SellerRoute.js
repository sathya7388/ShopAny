import 'react-native-gesture-handler';
import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackActions} from '@react-navigation/native';

import CategoryScreen from './categoryManagement';
import ReportScreen from './ReportScreen';
import ProductScreen from './productManagement';
import UpdateProduct from './updateProduct';
import OrderManagementScreen from './orderManagementScreen';
import UpdateOrderScreen from './updateOrderScreen';
import ProfileScreen from '../screens/profileScreen';
import ChartIcon from 'react-native-vector-icons/EvilIcons';

const Stack = createStackNavigator ();
const Tab = createBottomTabNavigator ();

const resetHomeStackOnTabPress = ({navigation}) => ({
  tabPress: e => {
    const state = navigation.dangerouslyGetState ();

    if (state) {
      const nonTargetTabs = state.routes.filter (r => r.key !== e.target);

      nonTargetTabs.forEach (tab => {
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
    <Stack.Navigator>
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
function orderStack () {
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
        name="OrderManagementScreen"
        component={OrderManagementScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="UpdateOrder"
        component={UpdateOrderScreen}
        options={{title: 'Update Order'}}
      />
    </Stack.Navigator>
  );
}

function statsStack(){
  return(
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
        name="ReportScreen"
        component={ReportScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{title: 'Account'}}
      />
    </Stack.Navigator>
  )
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
        name="statsStack"
        component={statsStack}
        listeners={resetHomeStackOnTabPress}
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({focused,size}) => (
            <ChartIcon
              name="chart"
              color={focused ? '#009688': 'black'}
              size={35}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProductScreen"
        component={productStack}
        listeners={resetHomeStackOnTabPress}
        options={{
          tabBarLabel: 'Products',
          tabBarIcon: ({focused, size}) => (
            <Image
              source={
                focused
                  ? require ('../assets/images/product_color.png')
                  : require ('../assets/images/product_black.png')
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
        name="CategoryScreen"
        component={CategoryScreen}
        listeners={resetHomeStackOnTabPress}
        options={{
          tabBarLabel: 'Category',
          tabBarIcon: ({focused, size}) => (
            <Image
              source={
                focused
                  ? require ('../assets/images/category_color.png')
                  : require ('../assets/images/category_black.png')
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
        name="orderStack"
        component={orderStack}
        listeners={resetHomeStackOnTabPress}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({focused, size}) => (
            <Image
              source={
                focused
                  ? require ('../assets/images/order_seller_color.png')
                  : require ('../assets/images/order_seller_black.png')
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
