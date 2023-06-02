import { Component } from "react";
import { connect } from "react-redux";
import { addItem, buyNow, setTotalPrice } from "../redux/actions";

class CartClass extends Component {
    constructor(props) {
        super(props)
    }

  static addToCart = (qty, productId="", price) => {
     let _cart = this.props.cart;
     if (_cart.length !== 0) {
        let index = _cart.findIndex(x => x.productId === productId)
        if (index !== -1) {
           _cart[index]['quantity'] = qty;
           _cart[index]['price'] = qty * price;
           this.props.updateCart(_cart);
           return;
        } 
     }
    _cart.push({price: qty * price, quantity: qty, productId})
    this.props.updateCart(_cart)
  };
  static calculatorTotal = () => {

  }

  static buyNow = (qty, productId="", price) => {
    this.props.buyNow({price, quantity: qty, productId})
    this.props.totalPrice(price)
  }
  
};

const mapStateToProps = function(state) {
    return {
      cart: state.cart.cart,
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
