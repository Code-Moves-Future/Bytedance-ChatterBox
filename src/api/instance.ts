import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { COZE_CONFIG } from '../utils/env';

// 创建axios实例
const cozeApi: AxiosInstance = axios.create({
    baseURL: COZE_CONFIG.BASE_URL,
    timeout: COZE_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
cozeApi.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 在请求头中添加 Authorization
        if (COZE_CONFIG.API_KEY) {
            config.headers.Authorization = `Bearer ${COZE_CONFIG.API_KEY}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
cozeApi.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        console.error('API请求错误:', error.message);
        return Promise.reject(error);
    }
);

export default cozeApi; 