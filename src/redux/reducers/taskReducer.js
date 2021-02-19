import {SHOW_CREATE_FORM} from '../types';
const initialState = {
    loading:false,
    inventories:[],
    // inventory
}
export default function(state = initialState,action){
    switch(action.type){
        case SHOW_CREATE_FORM:
            
            return {
                ...state,
                loading:true
            };
        default:
            return state;
    }
}