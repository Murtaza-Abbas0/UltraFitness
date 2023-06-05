import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableWithoutFeedback,
  FlatList
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../assets/constants/Colors';
import { Fonts } from '../assets/constants/Fonts';
import { Checkbox, FAB, TouchableRipple } from 'react-native-paper';
import Assets from '../assets';
import { WIDTH } from '../assets/constants/Dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonComponent from '../components/Button';
import Input from '../components/Input';
import PaymentMethod from '../components/PaymentMethod'
import { CardField, useStripe, } from '@stripe/stripe-react-native';
import { getCards } from '../https';
import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AlertMessage from '../components/AlertMessage';
import GetCardsRenderItem from '../components/GetCardsRenderItem'

const GetCardsScreen = ({ navigation }) => {

  const [cardDetails, setCardDetails] = useState('')

  const stripe = useStripe();

  const [checked, setChecked] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        getCardsFormServer();
      };

      fetchData();

      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

  const getCardsFormServer = () => {

    console.log('test')

    const data = {};
    // const header = {};

    getCards(data, (response) => {
      // console.log('response: ', response?.data?.data);
      setData(response?.data?.data)
      if (response?.data?.status == 'success' && response?.data?.data !== []) {
        AlertMessage.showMessage('Card List Fetched Successfully')
      } else if (response?.data?.status == 'success' && response?.data?.data == []) {
        AlertMessage.showMessage('No Cards Found')
      }
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>

        {/* <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}> */}
        {/* <View style={{ flex: 1, height: 200 }}>
            <View
              style={{
                paddingHorizontal: 15,
                marginTop: 25,

                // backgroundColor: 'green',
              }}> */}
        <HeaderComponent navigation={navigation} />
        {/* </View> */}
        <View style={{ flex: 1 }} >
          <FlatList
            data={data}
            keyExtractor={(item) => String(item?.id)}
            renderItem={({ item }) => <GetCardsRenderItem item={item} />}
          />
          {/* </View> */}
        </View>
        {/* </ScrollView > */}
      </SafeAreaView >
    </>
  );
};

const HeaderComponent = ({
  navigation,
  onpres1,
  onpress,
  // modalVisible,
  // setModalVisible,
}) => {
  const [data, setData] = useState({
    fullName: '',
    contactNo: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={[styles.headerContainer, {}]}>
        <FAB
          style={[
            styles.btn,
            {
              height: WIDTH < 375 ? 40 : 55,
              width: WIDTH < 375 ? 40 : 55,
            },
          ]}
          size="small"
          icon="arrow-left"
          color={Colors.tertiary}
          onPress={() => navigation.goBack()}
        />

        <Text style={styles.headertex}>Cards</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddCardsScreen")}
          style={{ flexDirection: 'row' }}>
          <Image source={require('../assets/images/card-add.png')} />
          <Text style={styles.addtext}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={{}}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(false);
          }}>
          <View style={styles.modalView}>
            <View
              style={{
                marginVertical: 15,
                backgroundColor: '#707070',
                opacity: 0.22,
                width: '30%',
                height: 2,
                alignSelf: 'center',
              }}
            />
            {/* <View
              style={{
                marginTop: 15,
                // backgroundColor: 'yellow',
                width: '90%',
              }}>
              <Input
                placeholder="Full Name"
                text={data.fullName}
                setText={setData}
                formKey="fullName"
                textColor={Colors.tertiary}
                backgroundColor={'#fff'}
              />
            </View>
            <View
              style={{
                paddingTop: 10,
                // backgroundColor: 'yellow',
                width: '90%',
              }}>
              <Input
                placeholder="Card Number"
                text={data.fullName}
                setText={setData}
                formKey="fullName"
                textColor={Colors.tertiary}
                backgroundColor={'#fff'}
              />
            </View>
            <View
              style={{
                paddingTop: 10,
                // backgroundColor: 'yellow',
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Input
                placeholder="Expiry MM/YY"
                text={data.fullName}
                setText={setData}
                formKey="fullName"
                textColor={Colors.tertiary}
                backgroundColor={'#ff'}
              />
              <Input
                placeholder="CVV(3 Digits)"
                text={data.fullName}
                setText={setData}
                formKey="fullName"
                textColor={Colors.tertiary}
              />
            </View>
            <View
              style={{
                paddingTop: 10,
                // backgroundColor: 'yellow',
                width: '90%',
              }}>
              <Input
                placeholder="Card Holder Name"
                text={data.fullName}
                setText={setData}
                formKey="fullName"
                textColor={Colors.tertiary}
                backgroundColor={'#fff'}
              />
            </View> */}

            <View
              style={{
                paddingTop: 15,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <ButtonComponent
                icon1
                borderRadius={14}
                buttonText="Save"
                buttonColor={Colors.tertiary}
                textColor={Colors.secondary}
                onPress={() => setModalVisible(false)}
                // onPress={() => navigation.navigate('GoogleMapsScreen')}
                height={WIDTH <= 375 ? 55 : 55}
                width={WIDTH <= 323 ? 260 : 255}
              />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  text: {
    fontFamily: Fonts.default,
    fontWeight: '600',
    fontSize: 18,
    color: Colors.tertiary,
    letterSpacing: 0.9,
  },
  boldtext: {
    textAlign: 'center',
    padding: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    // backgroundColor: 'red',
  },
  fab: {
    height: 50,
    width: 50,
    borderRadius: 10,
    // marginLeft: 20,
    // marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    shadowColor: Colors.tertiary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },

  btn: {
    height: 50,
    width: 50,
    borderRadius: 10,
    // marginLeft: 20,
    // marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    shadowColor: Colors.tertiary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  headertex: {
    fontSize: 22,
    color: Colors.tertiary,
    fontFamily: Fonts.default,
    fontWeight: '600',
    fontSize: 22,
    color: Colors.tertiary,
    textAlign: 'center',
    // letterSpacing: 0.9,
  },
  addtext: {
    fontSize: 18,
    paddingLeft: 5,
    color: Colors.primary,
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'red',
    position: 'absolute',
  },
  centeredView: {
    backgroundColor: 'red',
  },
  modalView: {
    // backgroundColor: 'red',
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default GetCardsScreen;
