import instance from "./config";
import { url } from "./constants_url";
const httpPostRequest = async (url, data, header, cb) => {
    console.log('URL: ', url )
    try {
        const response = await instance.post(url, JSON.stringify(data), header)
        cb(response)
    } catch(error) {
        console.log(error)
        console.log(error?.messenge || 'something went wrong')
    }
}

const httpGetRequest = async (url, header, cb) => {
    console.log('URL: ', url);
    try {
      const response = await instance.get(url, header);
      cb(response);
      // console.log(response?.data)
    } catch (error) {
      console.log(error);
      console.log(error?.message || 'Something went wrong');
    }
  };
  

export const LoginAuth = (data={}, header={}, cb)  => httpPostRequest(url.login, data, header, cb)

export const CreateAccount = (data={}, header={}, cb) => httpPostRequest(url.signup, data, header, cb)

export const Logout = (data={}, header={}, cb) => httpPostRequest(url.logout, data, header, cb)

export const attachCard = (data={}, header={}, cb) => httpPostRequest(url.attachCard, data, header, cb)

export const getMyOrders = (data = {}, header = {}, cb) => {
    const url = `/users/my-orders`;
  
    httpGetRequest(url, header, cb);
  };

export const getCards = (data = {} ,header = {}, cb) => {
    const url = `users/payment-method-list`;
  
    httpGetRequest(url, data,header, cb);
  };
  
export const getAllProducts = (data = {}, header = {}, cb) => {
    const url = `/products`;
  
    httpGetRequest(url, header, cb);
  };
  