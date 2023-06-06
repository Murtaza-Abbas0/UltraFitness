import { ScrollView, StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../assets/constants/Colors';
import Header from '../components/Header';
import { HEIGHT, WIDTH } from '../assets/constants/Dimensions';
import { Fonts } from '../assets/constants/Fonts';
import ButtonComponent from '../components/Button';
import Input from '../components/Input';
import MapView, { Marker } from 'react-native-maps';
import Radiobutton from '../components/Radiobutton';
import { useSelector } from 'react-redux';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { useEffect } from 'react';
import PaymentMethod from '../components/PaymentMethod';
import AlertMessage from "../components/AlertMessage";
import Geolocation from '@react-native-community/geolocation';

const GoogleMapsScreen = ({ navigation, route }) => {

  let { id, cardNumber } = route?.params

  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    // Get the user's current location

    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setInitialRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        error => {
          console.error(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };
    requestLocationPermission()
  }, []);

  console.log(cardNumber);
  const cart = useSelector(x => x.Cart.cart)
  const instantPurchase = useSelector(x => x.Cart.instantPurchase)

  console.log('cart: ', cart)

  let totalPrice = 0

  const CalculateTotal = () => {
    if (cart.length !== 0 || Object.keys(instantPurchase).length !== 0) {
      if (Object.keys(instantPurchase).length !== 0) {
        totalPrice = instantPurchase.total;
      } else if (cart.length !== 0) {
        const listOfTotal = cart.map((val, index) => val.total)
        totalPrice = listOfTotal.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        )
      }
    }
    return totalPrice;
  }

  let tempObject = {}

  const user = useSelector(state => state.User);

  // console.log('orderData: ', orderData)

  const [checked, setChecked] = useState();
  const [data, setData] = useState({
    fullName: user?.fullName,
    contactNo: user?.contactNo,
    gender: user?.gender,
    email: user?.email,
    password: '',
    confirmPassword: '',
    address: '',
    zipCode: '',
    city: '',
    state: ''
  });


  const [region, setRegion] = useState({
    latitude: 77.78825,
    longitude: 122.324,
    latitudeDelta: 2.0922,
    longitudeDelta: 8.0421,
  });
  const [cardDetails, setCardDetails] = useState()

  const getOrderObject = () => {
    tempObject = {
      cart,
      "totalPrice": CalculateTotal(),
      "fullName": data.fullName,
      "address": data.address,
      "zipCode": data.zipCode,
      "city": data.city,
      "state": data.state,
      "phoneNumber": data.contactNo,
      "email": data.email,
      "gender": data.gender,
      "pmId": id
    }

    console.log('tempObject: ', tempObject)
    // return
    navigation.navigate('CheckoutCart', { tempObject: tempObject, id: id, cardNumber: cardNumber })
  }

  const onChangeHandler = (value, name) => {
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };


  const onPressAddCard = () => {
    navigation.navigate('GetCardsScreen')
  }

  const onPressContinue = () => {
    AlertMessage.showMessage('Working on it!')
  }

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(info => console.log(info));
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 25 }}>
          <Header
            navigation={navigation}
            onlybackbutton
            backIcon
            headertex={'Details'}
          />
          {/* Cards start */}
          <View style={styles.Mapcontainer}>
            {initialRegion &&
              <MapView
                style={styles.map}
                initialRegion={initialRegion}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: initialRegion.latitude,
                    longitude: initialRegion.longitude,
                  }}
                />
              </MapView>
            }
          </View>
          <View style={{ marginTop: 25 }} />
          <Input
            placeholder="Full Name"
            text={data.fullName}
            setText={setData}
            formKey="fullName"
            textColor={Colors.tertiary}
            backgroundColor={'#ffffff'}
            onChangeHandler={onChangeHandler}
          />
          <View style={{ marginTop: 25 }} />
          <Input
            placeholder="Address"
            text={data.address}
            setText={setData}
            formKey="address"
            textColor={Colors.tertiary}
            backgroundColor={'#ffffff'}
            onChangeHandler={onChangeHandler}
          />
          <View style={{ marginTop: 25 }} />
          <Input
            placeholder="Zip code "
            text={data.zipCode}
            setText={setData}
            formKey="zipCode"
            textColor={Colors.tertiary}
            backgroundColor={'#ffffff'}
            onChangeHandler={onChangeHandler}
          />
          <View style={{ marginTop: 25 }}>
            <Input
              placeholder="City"
              text={data.city}
              setText={setData}
              formKey="city"
              textColor={Colors.tertiary}
              backgroundColor={'#ffffff'}
              onChangeHandler={onChangeHandler}
            />
          </View>
          <View style={{ marginTop: 25 }}>
            <Input
              placeholder="state"
              text={data.state}
              setText={setData}
              formKey="state"
              textColor={Colors.tertiary}
              backgroundColor={'#ffffff'}
              onChangeHandler={onChangeHandler}
            />
          </View>
          <View style={{ marginTop: 25 }} />
          <Input
            placeholder="phone number "
            text={data.contactNo}
            setText={setData}
            formKey="contactNo"
            textColor={Colors.tertiary}
            backgroundColor={'#ffffff'}
            onChangeHandler={onChangeHandler}
          />
          <View style={{ marginTop: 25 }} />
          <View
            style={
              {
                // flexDirection: 'row',
                // alignItems: 'center',
                // justifyContent: 'space-between',
              }
            }>
            <Input
              menu2
              gender={true}
              text={data.gender}
              setText={setData}
              formKey="gender"
              textColor={Colors.primary}
              Valueinput={'State'}
              backgroundColor={'#ffffff'}
              onChangeHandler={onChangeHandler}
            />
          </View>
          <View style={{ marginTop: 25 }} />
          <Input
            placeholder="Email"
            text={data.email}
            setText={setData}
            formKey="Email"
            textColor={Colors.tertiary}
            backgroundColor={'#ffffff'}
            onChangeHandler={onChangeHandler}
          />
        </View>
        <View
          style={{
            marginTop: 25,
            // flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 25,
          }}>

          <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }} >

            <ButtonComponent
              borderRadius={14}
              buttonText="Select Card"
              buttonColor={Colors.tertiary}
              textColor={Colors.secondary}
              onPress={() => onPressAddCard()}
              height={WIDTH <= 375 ? 55 : 55}
              width={WIDTH <= 375 ? 125 : 175}
              marginBottom={'10%'}
              alignSelf={'center'}
            />
          </View >
          <ButtonComponent
            borderRadius={14}
            buttonText="Continue"
            buttonColor={Colors.tertiary}
            textColor={Colors.secondary}
            onPress={() => getOrderObject()}
            height={WIDTH <= 375 ? 55 : 55}
            width={WIDTH <= 375 ? 125 : 175}
            marginBottom={'20%'}
            alignSelf={'center'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  text: {
    fontFamily: Fonts.default,
    fontSize: 18,
    color: Colors.tertiary,
    letterSpacing: 0.9,
  },
  boldtext: {
    textAlign: 'center',
    padding: 5,
  },
  Mapcontainer: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    // justifyContent: 'flex-end',
    alignItems: 'center',

    marginTop: 20,
    padding: 10,
  },
  map: {
    width: WIDTH <= 335 ? 345 : 320,
    height: WIDTH <= 335 ? 345 : 300,
  },
});

export default GoogleMapsScreen;
