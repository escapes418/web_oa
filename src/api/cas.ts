import axios from 'axios';

export function getRunningLogin() {
    return new Promise((resolve, reject)=>{
        axios({
            url:"./OA/session/auth",//正式
            // url:"../OA/session/auth",//测试
            method:"get",
        }).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}