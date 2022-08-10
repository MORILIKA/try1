import axios from "axios"; // 參考axios
// import config from "@/api/config";
import router from '@/router'
import store from '@/store'
const instance = axios.create({
    baseURL: process.env.VUE_APP_APIURL,
    timeout: 60000,
    headers: { 
        'Content-Type': 'application/json',
    }
});
instance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        console.log('instanceErr2',error.response)
        if(error?.response?.data?.msg==='找不到此參與者'){
            window.localStorage.removeItem('jwt')
            router.push({name:'personalInfo'}).catch();
        }
        if(error?.response?.status==401){
            console.log(error.response.msg)
        }
        // if(error?.response?.status==400){
        //     store.dispatch('changeBusy',true)
        // }
        return Promise.reject(error);
    }
);
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        instance
            .get(url, {
                params: params,
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        instance.post(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}


const instanceAuth = axios.create({
    baseURL: process.env.VUE_APP_APIURL,
    timeout: 60000,
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` 
    }
});
instanceAuth.interceptors.response.use(
    function (response) {
        console.log('instanceRes',response)
        return response
    },
    async function (error) {
        console.log('instanceErr',error)
        if(error?.response?.status==409){
            try {
                const { data }= await instance.post(process.env.VUE_APP_APIURL+'/api/v1/users/get-user-token',{
                    lineToken: window.localStorage.getItem('userToken'),
                })
                window.localStorage.setItem('jwt',data.data.token)
                error.config.headers.Authorization=`Bearer ${window.localStorage.getItem('jwt')}`
                return instanceAuth(error.config)
            }
            catch (err) {
                console.log(err)
                return Promise.reject(error);
            }
        }
        if(error?.response?.data?.msg==='找不到此參與者'){
            console.log(error.response.data.msg)
            window.localStorage.removeItem('jwt')
            console.log(router)
            router.push({name:'personalInfo'})
        }
        if(error?.response?.status==401){
            console.log(error.response.msg)
        }
        if(error?.response?.status==400){
            console.log('400')
            store.dispatch('changeBusy',true)
        }
            
        
        if (!window.navigator.onLine) {
            alert("網路出了點問題，請重新連線後重整網頁");
            return;
        }
        return Promise.reject(error);
    }
);

export function getAuth(url, params = {}) {
    return new Promise((resolve, reject) => {
        instanceAuth
            .get(url, {
                params: params,
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export function postAuth(url, data = {}) {
    return new Promise((resolve, reject) => {
        instanceAuth.post(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

const instanceAdmin = axios.create({
    baseURL: process.env.VUE_APP_APIURL,
    timeout: 60000,
    headers: { 
        'Content-Type': 'application/json', 
    }
   
});
instanceAdmin.interceptors.request.use(
    config => {
    const token = window.localStorage.getItem('backJWT')
    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
error => Promise.reject(error)
);
instanceAdmin.interceptors.response.use(
    function (response) {
        return response
    },
    async function (error) {
        if(error?.response?.status==409){
            try {
                router.push({name:'login',query:{reLogin:true}})
                window.localStorage.removeItem('backJWT')
            }
            catch (err) {
                
                return Promise.reject(error);
            }
        }
        
        if (!window.navigator.onLine) {
            alert("網路出了點問題，請重新連線後重整網頁");
            return;
        }
        return Promise.reject(error);
    }
);

export function getAdmin(url, params = {}) {
    return new Promise((resolve, reject) => {
        instanceAdmin
            .get(url, {
                params: params,
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export function postAdmin(url, data = {}) {
    return new Promise((resolve, reject) => {
        instanceAdmin.post(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}



export function putAdmin(url,data = {}) {
    return new Promise((resolve, reject) => {
        instanceAdmin.put(url,data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

