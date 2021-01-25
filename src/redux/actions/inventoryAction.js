import {GET_INVENTORIES,ABC_ANALYSIS} from '../types';
import axios from 'axios';
import ApiServices from '../../services/index'
//get all inventories
export const getInventories  = ()=>(dispatch)=>{
    ApiServices.getInventories()
    .then(data => {
        console.log(data)
        dispatch({
            type:GET_INVENTORIES,
            payload: data.object
        })
    })
    .catch((err)=> {
        dispatch({
            type:GET_INVENTORIES,
            payload:err
        })
    })
}