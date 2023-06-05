import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HEIGHT, WIDTH } from '../assets/constants/Dimensions';
import { Fonts } from '../assets/constants/Fonts';
import { Colors } from '../assets/constants/Colors';
import RatingsItems from '../components/RatingsItems';
import ButtonComponent2 from '../components/Botton2';
import { FAB, TouchableRipple } from 'react-native-paper';
import { BackSvg } from '../assets/svgs/HeaderSvgs';
import Mymodal from '../components/Popup';
import { CartICon, Trashicon } from '../assets/svgs/HomeSvgs';
import ButtonComponent from '../components/Button';
import { color } from 'react-native-reanimated';
import AlertMessage from '../components/AlertMessage';
import { addToCart, urlForImages } from '../helper';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addItem, buyNow, setTotalPrice } from '../redux/actions';

const ProductScreen = ({ navigation, route, index }) => {
  const dispatch = useDispatch()
  const cart = useSelector(x => x.Cart.cart)
  const { data } = route.params;

  console.log('data: ', data)

  // let tempArr = []

  useEffect(() => {
    setProductData(data)
    let index = cart.findIndex(x => x.productId === data._id)
    if (index !== -1) {
      const counter = cart[index].quantity
      setCount(counter)
    }
  }, [])

  const [count, setCount] = useState(1);
  const [productData, setProductData] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 0)
      setCount(count - 1);
  };

  const onPressBuyNow = () => {
    const obj = {
      price: productData.price, quantity: count,
      productId: productData._id, name: productData.name, image: productData.images[0], description: productData.description
    }
    dispatch({ type: buyNow, data: { ...obj } })
    dispatch({ type: setTotalPrice, data: productData.price })
    navigation.navigate("GoogleMapsScreen")
  }

  const updateCart = arr => {
    dispatch({ type: addItem, data: [...arr] })
  }
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              paddingTop: 25,
              padding: 15,
              // paddingHorizontal: 15,
              width: '100%',
              height: '100%',
              // marginTop: 15,
            }}>
            <HeaderComponent navigation={navigation} />
            <View
              style={{
                flex: 1,
                //   backgroundColor: 'green',
              }}>
              <View style={{
                // alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'pink',
                width: '100%',
                height: '100%'
              }}>
                <Image
                  source={{ uri: `${urlForImages}${data?.images[0]}` }}
                  style={{
                    height: '100%',
                    // width: WIDTH <= 323 ? 180 : 276,
                    width: WIDTH <= 323 ? 180 : 276,
                    resizeMode: "cover",
                    backgroundColor: 'pink'
                    // marginRight: index % 5 == 2 ? 0 : 0,
                    // marginLeft: index % 5 == 0 ? 0 : 0,
                  }}
                />
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={true}
                data={data?.images}
                renderItem={({ item, index }) => {
                  // console.log('item: ', item)
                  return (
                    <>
                      <View
                        style={{
                          height: WIDTH <= 375 ? 40 : 76,
                          width: WIDTH <= 323 ? 233 : 76,
                          marginRight: index % 5 == 2 ? 0 : 3,
                          marginLeft: index % 5 == 0 ? 0 : 3,
                        }}>
                        <Image
                          source={`${urlForImages}${item.images}`}
                          resizeMode="contain"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </View>
                    </>
                  );
                }}
              />
            </View>
            <View style={{}}>
              <View style={styles.line} />
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={[styles.CenterText, { color: '#00B4D8' }]}>
                    {data?.name}
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={[
                      // styles.PriceText,
                      {
                        fontSize: 42,
                        color: '#000',
                        fontFamily: Fonts.default,
                        // marginRight: 5,
                      },
                    ]}>
                    120<Text style={{ fontSize: 20 }}>$</Text>
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={[styles.CenterText, { color: '#000', fontSize: 16 }]}>
                  Reviews :
                </Text>
                <View style={{ marginTop: 3 }}>
                  <RatingsItems averageRating={data?.averageRating} />
                </View>
              </View>
              <Text
                style={[styles.CenterText, { color: '#000', fontSize: 16 }]}
                numberOfLines={1}>
                Description :
              </Text>
              <Text
                style={[
                  styles.subTitle,
                  {
                    color: '#000',
                    fontSize: 12,
                    fontWeight: '205',
                    opacity: 0.5,
                    paddingTop: 4,
                  },
                ]}
                numberOfLines={2}>
                {data?.description}
              </Text>
              <Text
                style={[
                  styles.CenterText,
                  {
                    color: '#000',
                    fontSize: 16,
                    paddingVertical: 10,
                    paddingTop: 15,
                  },
                ]}
                numberOfLines={2}>
                Quantity:
              </Text>
            </View>
            <View
              style={{
                // flex: 1,
                paddingVertical: 15,
                alignItems: 'flex-start',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  // // flex: 1,
                  // justifyContent: 'space-between',
                }}>
                <View
                  style={[
                    styles.headerContainer,
                    {
                      // paddingRight: 10,
                      // backgroundColor: 'blue',
                    },
                  ]}>
                  <FAB
                    style={[
                      styles.fab,
                      {
                        backgroundColor: 'red',
                        opacity: 0.5,
                        backgroundColor: '#7E7C7B30',
                        height: WIDTH < 375 ? 55 : 55,
                        width: WIDTH < 375 ? 55 : 55,
                        // color: '#0000',
                      },
                    ]}
                    size="small"
                    icon="minus"
                    color="black"
                    onPress={decrement}
                  />
                </View>
                <View
                  style={[
                    styles.headerContainer,
                    {
                      paddingLeft: 15,
                      // backgroundColor: 'green',
                      justifyContent: 'space-around',
                    },
                  ]}>
                  <FAB
                    style={[
                      styles.fab,
                      {
                        backgroundColor: Colors.primary,
                        height: WIDTH < 375 ? 55 : 55,
                        // width: WIDTH < 375 ? 55 : 55,
                      },
                    ]}
                    size="small"
                    icon="plus"
                    color={'#fff'}
                    onPress={increment}
                  />
                </View>
              </View>

              <View style={{ flex: 1, paddingLeft: 5 }}>
                <ButtonComponent2
                  buttonText={count}
                  buttonColor={'#7E7C7B30'}
                  textColor={'#444546'}
                  // onPress={() => navigation.navigate('Drawer')}
                  width={WIDTH <= 375 ? 198 : 198}
                  height={WIDTH <= 375 ? 55 : 68}
                />
              </View>
            </View>
            <View style={{ paddingBottom: 15 }}>
              <View style={{ flexDirection: 'row' }}>
                <ButtonComponent
                  icon1={true}
                  buttonI={<Trashicon />}
                  borderRadius={14}
                  buttonText="Add to cart"
                  buttonColor={Colors.tertiary}
                  textColor={'#fff'}
                  onPress={() => setModalVisible(true)}
                  height={WIDTH <= 375 ? 55 : 68}
                  width={WIDTH <= 375 ? 160 : 164}
                />
                <View style={{ flex: 1, paddingLeft: 5 }}>
                  <ButtonComponent
                    icon1={true}
                    buttonI={<CartICon />}
                    borderRadius={14}
                    buttonText="Buy Now"
                    buttonColor={Colors.primary}
                    textColor={'#fff'}
                    onPress={() => onPressBuyNow()}
                    height={WIDTH <= 375 ? 55 : 68}
                    width={WIDTH <= 375 ? 160 : 164}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Mymodal
        modalVisible={modalVisible}
        setModalVisible={modalVisible}
        onPress={() => setModalVisible(false)}
        modaltext1="Added To cart"
        button1={'Close'}
        button2=" Cart "
        cartbtn={() => {
          addToCart(cart, count, productData._id, productData.price, productData.name, productData.images[0], productData.description, updateCart)
          setModalVisible(false)
        }}
      />
    </>
  );

};

const HeaderComponent = ({ navigation }) => {
  return (
    <View style={{}}>
      <TouchableRipple
        onPress={() => navigation.goBack()}
        style={{
          width: 50,
          height: 50,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          elevation: 15,
        }}>
        <BackSvg />
      </TouchableRipple>
    </View>
  );
};
export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },

  ProductText: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CenterText: {
    fontSize: 20,
    // height: '45%',
    fontWeight: 'bold',
    fontFamily: Fonts.default,
    color: Colors.tertiary,
    lineHeight: 22,
    // paddingVertical: 5,
    // marginTop: 5,
  },
  PriceText: {
    fontSize: 42,
    // height: '55%',
    fontWeight: 'bold',
    fontFamily: Fonts.default,
    color: Colors.tertiary,
    lineHeight: 22,
  },
  list: {
    height: '50%',
  },
  subTitle: {
    fontFamily: Fonts.default,
    fontSize: 16,
    fontWeight: 200,
    color: Colors.secondary,
    marginTop: 0,
    // marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fab: {
    height: 55,
    width: 55,
    borderRadius: 5,
    backgroundColor: '#fff',
    // opacity: 0.06,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabHeader: {
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

    elevation: 5,
  },
  line: {
    width: '25%',
    alignSelf: 'center',
    borderBottomColor: '#000',
    backgroundColor: '#707070 ',
    opacity: 0.15,
    borderBottomWidth: 2,
    marginVertical: 15,
  },
});
