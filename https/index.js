import instance from "./config";
import { url } from "./constants_url";
const httpPostRequest = async (url, data, header, cb) => {
    try {
        const response = await instance.post(url, JSON.stringify(data), header)
        cb(response)
    } catch(error) {
        console.log(error)
        console.log(error?.messenge || 'something went wrong')
    }
}
export const LoginAuth = (data={}, header={}, cb)  => httpPostRequest(url.login, data, header, cb)

export const CreateAccount = (data={}, header={}, cb) => httpPostRequest(url.signup, data, header, cb)

export const Logout = (data={}, header={}, cb) => httpPostRequest(url.logout, data, header, cb)