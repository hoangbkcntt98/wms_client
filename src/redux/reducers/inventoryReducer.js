import {GET_INVENTORIES,ABC_ANALYSIS} from '../types';
const initialState = {
    loading:true,
    inventories:[],
    // inventory
}
export default function(state = initialState,action){
    switch(action.type){
        case GET_INVENTORIES:
            return {
                ...state,
                inventories: action.payload,
                loading: false
            }
    }
}