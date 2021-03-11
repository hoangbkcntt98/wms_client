import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import inventoryReducer from './reducers/inventoryReducer';
import taskReducer from './reducers/taskReducer';
const initialState= {};
const reducers = combineReducers({
    inventory: inventoryReducer,
    task: taskReducer
})
const middleware = [thunk]
const appStore = createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
export default appStore;
