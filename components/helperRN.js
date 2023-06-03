import { Component } from "react";
import { connect, useSelector } from "react-redux";
import { addItem, buyNow, setTotalPrice } from "../redux/actions";
let _cart_
class CartClass extends Component {
  constructor(props) {
    super(props)
    _cart_ = useSelector(state => state.cart.cart)
  }

  static gettingCart() {
    return this.props.cart
  }
  static gettingInstant() {
    return this.props.instantPurchase
  }
  static calculatorTotal = () => {

  }
  

};

const mapStateToProps = function (state) {
  return {
    cart: state.cart.cart,
    instantPurchase: state.cart.instantPurchase,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (data) => dispatch({ type: addItem, data }),
    buyNow: (data) => dispatch({ type: buyNow, data }),
    totalPrice: (price) => dispatch({ type: setTotalPrice, data: price }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartClass)
