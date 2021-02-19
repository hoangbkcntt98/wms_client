import {SHOW_CREATE_FORM} from '../types';

//get all inventories
export const showCreateForm  = ()=>(dispatch)=>{
    dispatch({type: SHOW_CREATE_FORM})
}