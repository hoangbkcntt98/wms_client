import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import inventoryReducer from './reducers/inventoryReducer';
const initialState= {};
const reducers = combineReducers({
    inventory: inventoryReducer
})
const middleware = [thunk]
const store = createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(...middleware)
    )
)
export default store;
