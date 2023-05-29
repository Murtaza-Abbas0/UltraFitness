import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.100.185:3006/api/v1',
    headers: {
        "Content-Type": "application/json",
    }
});

export default instance;