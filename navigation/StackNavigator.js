import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Onboarding, Signup, Home, Profile, Shope} from '../screens';
import DrawerNavigator from './DrawerStack';
import ProductScreen from '../screens/ProductScreen';
import SearchScreen from '../screens/SearchScreen';
import InstructorDetails from '../screens/InstructorDetails';
import BookingDetail from '../screens/BookingDetail';
import QRScreen from '../screens/QRScreen';
import PaymentScreen from '../screens/PaymentScreen';
import CartScreen from '../screens/CartScreen';
import GoogleMapsScreen from '../screens/GoogleMapsScreen';
import CheckoutCart from '../screens/CheckoutCart';
import CheckoutOrder from '../screens/CheckoutOrder';
import MyOrders from '../screens/MyOrder';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import OrderTracker from '../screens/TrackOrder';
import SportsScreen from '../screens/sportsScreen';
import GetCardsScreen from '../screens/GetCardsScreen';
import ExcersizeDetail from '../screens/excersizeDetail';
import VideoScreen from '../screens/VideoScreen';
import AssismentScreen from '../screens/AssismentScreen';
import Account from '../screens/Account';
import TermsConditionScreen from '../screens/TermsConditionScreen';
import Notification from '../screens/notification';
import AddCardsScreen from '../screens/AddCardsScreen';
import instance from "../https/config";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const auth = useSelector(state => state.User.auth);
  const user = useSelector(state => state.User);

  console.log(`Bearer ${user?.token}`)
  console.log(`auth ${user?.auth}`)

  useEffect(() => {
    if (auth) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${user?.token}`;
      return;
    }
  },[auth])
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}
      initialRouteName={auth && "Drawer"}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProductSCreen" component={ProductScreen} />
      <Stack.Screen name="Shope" component={Shope} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="InstructorDetails" component={InstructorDetails} />
      <Stack.Screen name="BookingDetail" component={BookingDetail} />
      <Stack.Screen name="QRCode" component={QRScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="GoogleMapsScreen" component={GoogleMapsScreen} />
      <Stack.Screen name="CheckoutCart" component={CheckoutCart} />
      <Stack.Screen name="CheckoutOrder" component={CheckoutOrder} />
      <Stack.Screen name="AddCardsScreen" component={AddCardsScreen} />

      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen name="OrderTracker" component={OrderTracker} />
      <Stack.Screen name="SportsScreen" component={SportsScreen} />
      <Stack.Screen name="GetCardsScreen" component={GetCardsScreen} />
      <Stack.Screen name="ExcersizeDetail" component={ExcersizeDetail} />
      <Stack.Screen name="VideoScreen" component={VideoScreen} />
      <Stack.Screen name="AssismentScreen" component={AssismentScreen} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen
        name="TermsConditionScreen"
        component={TermsConditionScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
