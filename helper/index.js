import { CommonActions } from '@react-navigation/native';
import React from 'react';

export const urlForImages = `https://hr-management-development.s3.eu-west-2.amazonaws.com/`
export const addToCart = (cart = [], qty, productId = "", price, name, image, description, updateCart) => {
    if (cart.length !== 0) {
      let index = cart.findIndex(x => x.productId === productId)
      if (index !== -1) {
        cart[index]['quantity'] = qty;
        cart[index]['price'] = qty * price;
        updateCart(cart);
        return;
      }
    }
    cart.push({ price: qty * price, quantity: qty, productId, name, image, description })
    updateCart(cart)
  }

export function hardNavigation(navigation, routeName, data = {}) {
    navigation.dispatch( CommonActions.navigate({
      name: routeName,
      params: { ...data },
    })
    );
  }
export function ValidateEmail(email) {
    var mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    if (!email.match(mailformat)) {
        return false;
    }
    return true
}
export const settingUpAuth = (OBJ) => {
    const { _id, age, email, gender, contactNo, fullName, } = OBJ.data.data.user;
    data = {
        auth: true,
        token: OBJ.data.token,
        id: _id, age, email, gender, contactNo, fullName
    }
    return data
}