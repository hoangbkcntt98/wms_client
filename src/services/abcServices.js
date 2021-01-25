import inventoryReducer from 'src/redux/reducers/inventoryReducer'
import services from './index'

const abcServices = {
    getAbcs(){
         return services.get('http://localhost:8080/api/abc/all')
    },
    createAbc(abc){
        return services.post('http://localhost:8080/api/abc/create',abc)
    },
    
}
export default abcServices;