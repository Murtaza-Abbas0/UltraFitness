import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../assets/constants/Colors';
import Header from '../components/Header';
import {HEIGHT, WIDTH} from '../assets/constants/Dimensions';
import {Fonts} from '../assets/constants/Fonts';
import CartItems from '../components/CartITems';
import Table from '../components/TableData';
import ButtonComponent from '../components/Button';
import Assets from '../assets';
import {Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import CartClass from '../components/helperRN'
import { useDispatch, useSelector } from 'react-redux';
import { addItem, buyNow, buyNowRemove, setTotalPrice } from '../redux/actions';
import { hardNavigation, urlForImages } from '../helper';

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const cart = useSelector(x => x.Cart.cart)
  const instantPurchase = useSelector(x => x.Cart.instantPurchase)
  
  debugger
  console.log(instantPurchase)
  debugger
  const [check, setChecked] = useState(false);
  const [items, setItems] = useState([
    {
      id: 1,
      image: Assets.cards.cardImage1,
      description: 'Home Equipment Push Up Bars',
      count: 2,
      checked: false,
    },
    {
      id: 2,
      image: Assets.cards.cardImage2,
      description: 'Fitness Tracker Watch',
      count: 1,
      checked: true,
    },
  ]);
  const cartQty = (mode, index, count) => {
    let qty = count;
    let arr = [...cart]
    if (mode === "increment") {
      qty++;
    } else if (mode === "decrement") {
      qty--
    }
    if (qty === 0) {
      arr.splice(index, 1);
    } else  {
      arr[index].quantity = qty
      arr[index].total = qty * arr[index].price
    }
    dispatch({ type: addItem, data: [...arr] })
    
  }
  const toggleChecked = id => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? {...item, checked: !item.checked} : item,
      ),
    );
  };
  const removeBuyNowCart = () => {
    debugger
    dispatch({ type: buyNowRemove })
    hardNavigation(navigation, "Home")
  }
  const removeItemCart = id => {
    let _cart = [...cart]
    _cart = _cart.filter(x => x.productId !== id)
    dispatch({ type: addItem, data: [..._cart] })
  };
  const buyNowQty = (mode) => {
    let quantity = instantPurchase['quantity'];
    if (mode === "increment") {
      quantity++;
    } else {
      quantity--;
    }
    if (quantity === 0) {
      dispatch({ type: buyNow, data: {} })
    } else {
      const total = instantPurchase['price'] * quantity;
      dispatch({ type: buyNow, data: { ...instantPurchase, total, quantity } })
    }
  }
  const [count, setCount] = useState(2);
  const CalculateTotal = () => {
    let totalPrice = 0;
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
    return <Text style={styles.text}>{`$${totalPrice}.00`}</Text>
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{paddingHorizontal: 15}}>
          <Header
            navigation={navigation}
            onlybackbutton
            backIcon
            headertex={'Cart'}
          />
        </View>
        <View style={{marginTop: 25, paddingHorizontal: 5}}>
          {Object.keys(instantPurchase).length !== 0 ? 
          <View
                style={{
                  paddingHorizontal: 5,
                  flexDirection: 'row',
                }}>
                {/* <View style={{justifyContent: 'center'}}>
                  <Checkbox
                    value={item.checked}
                    onValueChange={() => toggleChecked(item.id)}
                  />
                </View> */}
                <CartItems
                  key={instantPurchase.productId}
                  card1
                  status={true}
                  checkpress={true}
                  itemimage={`${urlForImages}${instantPurchase.image}`}
                  itemdescription={instantPurchase.name}
                  count={instantPurchase.quantity}
                  increment={() => buyNowQty("increment")}
                  decrement={() => buyNowQty("decrement")}
                />
                <TouchableOpacity
                onPress={() => removeBuyNowCart(instantPurchase.productId)}
                style={{
                  width: 26,
                  height: 26,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'red',
                  borderRadius: 100,
                  position: 'absolute',
                  right: 1,
                }}>
                <Icon name="close" color={'#fff'} size={20} />
              </TouchableOpacity>
              </View>
            : cart.length > 0 ? cart.map((item, index) => (
              <View key={index}>
              <View
                style={{
                  paddingHorizontal: 5,
                  flexDirection: 'row',
                }}>
                {/* <View style={{justifyContent: 'center'}}>
                  <Checkbox
                    value={item.checked}
                    onValueChange={() => toggleChecked(item.id)}
                  />
                </View> */}
                <CartItems
                  key={index}
                  card1
                  status={true}
                  checkpress={true}
                  itemimage={`${urlForImages}${item.image}`}
                  itemdescription={item.name}
                  count={item.quantity}
                  increment={() => cartQty("increment", index, item.quantity)}
                  decrement={() => cartQty("decrement", index, item.quantity)}
                />
              </View>
              <TouchableOpacity
                onPress={() => removeItemCart(item.productId)}
                style={{
                  width: 26,
                  height: 26,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'red',
                  borderRadius: 100,
                  position: 'absolute',
                  right: 1,
                }}>
                <Icon name="close" color={'#fff'} size={20} />
              </TouchableOpacity>
            </View>
            )) : null
            }
        </View>

        <View style={{marginTop: 25}}>
          <View style={styles.line} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 25,
            }}>
            <Text style={styles.text}>Summary</Text>
          </View>
          <View style={{paddingHorizontal: 25, paddingTop: 25}}>
            <Table />
          </View>
          <View style={[styles.line, {width: '80%'}]} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 25,
            }}>
            <Text style={styles.text}>Total Amount:</Text>
            <CalculateTotal />
          </View>

          <View
            style={{
              marginTop: 25,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <ButtonComponent
              borderRadius={14}
              buttonText="Proceed to Checkout"
              buttonColor={Colors.tertiary}
              textColor={Colors.secondary}
              onPress={() => navigation.navigate('GoogleMapsScreen')}
              // onPress={() => navigation.navigate('GoogleMapsScreen')}
              height={WIDTH <= 375 ? 55 : 55}
              width={WIDTH <= 323 ? 260 : 300}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;

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
