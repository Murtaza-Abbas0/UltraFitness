import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
const GoogleMapsScreen = ({ navigation, route }) => {

  const stripe = useStripe();
  let { orderData } = route?.params
  let tempObject = {}

  const user = useSelector(state => state.User);

  console.log('orderData: ', orderData)

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
      orderData,
      "totalPrice": orderData[0]?.price,
      "fullName": data.fullName,
      "address": data.address,
      "zipCode": data.zipCode,
      "city": data.city,
      "state": data.state,
      "phoneNumber": data.contactNo,
      "email": data.email,
      "gender": data.gender
    }

    console.log('tempObject: ', tempObject)
    return
    navigation.navigate('CheckoutCart')
  }

  const onChangeHandler = (value, name) => {
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createPaymentIntent = async () => {
    console.log('cardDetails: ', cardDetails)
    cardDetailsToSend = {

    }
    // return
    try {
      await stripe
        .createPaymentMethod({
          type: 'card',
          card: {
            number: '5555555555554444', // Replace with actual card number
            exp_month: '02',
            exp_year: '40',
            cvc: '123', // Replace with actual CVC
          },
          billing_details: {
            name: 'Murtaza Rizvi',
          },
          paymentMethodType: 'Card'
        })
        .then(function (result) {
          console.log('result: ', result)
        });

    } catch (error) {
      console.error(error);
    }
  };

  const onPressAddCard = () => {
    navigation.navigate('GetCardsScreen')
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
            <MapView
              style={styles.map}
              region={region}
              onRegionChange={setRegion}>
              <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
            </MapView>
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
            {/* <CardField
              postalCodeEnabled={false}
              placeholder={{
                number: '4242 4242 4242 4242',
              }}
              onCardChange={(cardDetails) => {
                console.log('cardDetails', cardDetails);
                setCardDetails(cardDetails)
              }}
              style={{ width: '100%', height: '20%', backgroundColor: 'pink', marginBottom: '10%' }}
            /> */}
            {/* <TouchableOpacity
              onPress={() => createPaymentIntent()}
              style={{
                backgroundColor: 'pink',
                width: '80%',
                height: '20%',
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center'
              }} >
              <Text>Confirm</Text>
            </TouchableOpacity> */}
            <ButtonComponent
              borderRadius={14}
              buttonText="Add Card"
              buttonzColor={Colors.tertiary}
              textColor={Colors.secondary}
              onPress={() => onPressAddCard()}
              height={WIDTH <= 375 ? 55 : 55}
              width={WIDTH <= 375 ? 125 : 175}
              marginBottom={'10%'}
            />
          </View >
          <ButtonComponent
            borderRadius={14}
            buttonText="Continue"
            buttonColor={Colors.tertiary}
            textColor={Colors.secondary}
            onPress={() => onPressAddCard()}
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
