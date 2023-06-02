import { logout, spinnerVisible } from "../actions";

const initialState = {
    visible: false,
    text: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case spinnerVisible:
            return {
                ...state,
                visible: !state.visible,
                text: action?.text || ''
            };
        default:
            return state;
    }
}