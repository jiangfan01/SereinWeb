import axios from "axios";

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

export default service;