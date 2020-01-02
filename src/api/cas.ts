import axios from 'axios';

export function getRunningLogin() {
    return new Promise((resolve, reject)=>{
        axios({
            url:"./OA/cas/auth",
            method:"get",
        }).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}