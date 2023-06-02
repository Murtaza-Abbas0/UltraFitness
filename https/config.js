import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.100.116:3002/api/v1',
    headers: {
        "Content-Type": "application/json",
    }
});

export default instance;