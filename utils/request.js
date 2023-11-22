import axios from "axios";
import {getToken} from "./auth.js";

// 创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // withCredentials: true, // 当跨域请求时，发送 cookies
    timeout: 5000, // 请求超时时间
});

// 去掉一层data
service.interceptors.response.use((response) => {
    return response.data;
});

// request拦截器
service.interceptors.request.use(
    (config) => {
        // do something 在发送请求前

        //token存储到 cookies
        const token = getToken();

        if (token) {
            // 让每个请求携带token
            // ['X-Token']为自定义key
            // 请根据实际情况自行修改
            config.headers["token"] = token;
        }
        return config;
    },
    (error) => {
        // do something 当请求错误
        console.log(error); // for debug
        return Promise.reject(error);
    }
);


export default service;