import  axios  from  'axios';
const services = {
    get (url) {
        return new Promise((resolve,reject) =>{
            axios.get(url)
            .then((res)=> resolve(res.data))
            .catch((error)=> reject(error))
        })
    },
    post (url,params){
        return new Promise((resolve,reject) =>{
            axios.post(url,params)
            .then((res)=> resolve(res.data))
            .catch((error)=> reject(error))
        })
    },
    put (url,params){
        return new Promise((resolve,reject) =>{
            axios.post(url,params)
            .then((res)=> resolve(res.data))
            .catch((error)=> reject(error))
        })
    },
    delete(url,params){
        return new Promise((resolve,reject) =>{
            axios.delete(url,params)
            .then((res)=> resolve(res.data))
            .catch((error)=> reject(error))
        })
    }
}
// export const get = (url) =>{
//     return new Promise((resolve,reject) =>{
//         axios.get(url)
//         .then((res)=> resolve(res.data))
//         .catch((error)=> reject(error))
//     })
// }
// export const getInventories  =  ()  =>  {
//     return new Promise((resolve,reject)=>{
//         axios.get('http://localhost:8080/api/inventory/all')
//         .then((res) => resolve(res.data))
//         .catch(error=> reject(error))
//     })
// }
export default services;