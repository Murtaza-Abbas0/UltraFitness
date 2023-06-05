import { addItem, buyNow, buyNowRemove, setTotalPrice } from "../actions"

const initialState = {
    cart: [], //price, quantity, productId
    instantPurchase: {},
    totalPrice: 0,
    address: '',
    zipCode: '',
    city: '',
    state: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case addItem:
            return { ...state, cart: [...action.data] }
        case buyNow:
            return { ...state, instantPurchase: { ...action.data } }
        case buyNowRemove:
            return { ...state, instantPurchase: {} }
        case setTotalPrice:
            // debugger
            return { ...state, totalPrice: action.data }
        default:
            return state
    }
}