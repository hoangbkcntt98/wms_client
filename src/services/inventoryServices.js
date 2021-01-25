import inventoryReducer from 'src/redux/reducers/inventoryReducer'
import services from './index'

const inventorySerivices = {
    getInventories(){
         return services.get('http://localhost:8080/api/inventory/all')
    },
    createInventory(inventory){
        return services.post('http://localhost:8080/api/inventory/create',inventory)
    },
    deleteInventory(id){
        return services.delete('http://localhost:8080/api/inventory/delete/'+id)
    },
    updateInventory(resource){
        return services.post('http://localhost:8080/api/inventory/update',resource)
    }
}
export default inventorySerivices;