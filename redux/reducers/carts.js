import { addItem, buyNow, setTotalPrice } from "../actions"

const initialState = {
    cart: [], //price, quantity, productId
    instantPurchase: {},
    totalPrice: '',
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
            return { ...state, instantPurchase: {...action.data} }
        case setTotalPrice:
            return { ...state, totalPrice: action.data }
        default:
            return state
    }
}