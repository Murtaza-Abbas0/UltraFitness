import { signup, signin, logout } from '../actions';
const initialState = {
    token: '',
    auth: false,
    age: '',
    email: '',
    gender: '',
    contactNo: '',
    fullName: '',
    id: '',
    role: '',
    skills: [],
};
const User = (state = initialState, action) => {
    switch (action.type) {
        case signup:
            return {
                ...state,
                ...action.data,
            };
        case logout:
            return {
                ...state,
                token: '',
                auth: false,
                age: '',
                email: '',
                gender: '',
                contactNo: '',
                fullName: '',
                id: '',
                role: '',
                skills: [],
            };
        default:
            return state;
    }
}
export default User;