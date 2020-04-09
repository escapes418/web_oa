import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Message, Loading } from 'element-ui';
import store from '../store';
import { getToken ,removeToken} from '@/utils/auth';
import router from '@/router'

// 创建axios实例
const service: any = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000 // 请求超时时间
});
// console.log(process.env)
var loading;
// request拦截器
service.interceptors.request.use(
    (config:AxiosRequestConfig) => {
        config.headers['Content-Tab'] = 'Micro'
        if (store.getters.token) {
            config.headers['sessionid'] = getToken() || ''; // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        console.log(process.argv[2])
        if(process.argv.length>0){
            if(config.url=='/auth/login' || config.url == '/auth/logout'){
                config.baseURL = config.baseURL.replace(/api/,"")
            }
        }
        return config;
    },
    (error) => {
        // Do something with request error
        console.log('请求拦截error:', error); // for debug
        Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status == 200) {
            var rtnObj = response.data;
            if (rtnObj.code == 200) {
                return rtnObj;
            }
            if(rtnObj.code == 20){
                Message({
                    message: rtnObj.message,
                    type: 'error',
                    duration: 1 * 1000
                });
                removeToken();
                router.push({
                    path:'login'
                })
                // setTimeout(_=>{
                //     window.location.reload()
                // },1000)
            } 
            else {
                Message({
                    message: rtnObj.message,
                    type: 'error',
                    duration: 5 * 1000
                });
                return Promise.reject('200状态，业务抛错');
            }
        } else {
            return Promise.reject('响应非200状态，应该进入底部响应拦截的err');
        }
    },
    (error) => {
        console.log('响应拦截error:', +error); // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);

function request(params, showLoading = true) {
    return new Promise((resolve, reject) => {
        if (showLoading) {
            loading = Loading.service({
                fullscreen: true,
                customClass: 'loadingStyles',
                text: '加载中...'
            });
        }
        service(params)
            .then((rtn) => {
                // 模拟延迟效果
                setTimeout(() => {
                    showLoading && loading.close();
                }, 300);
                resolve(rtn);
            })
            .catch((err) => {
                setTimeout(() => {
                    showLoading && loading.close();
                }, 300);
                reject(err);
            });
    });
}
export default request;
