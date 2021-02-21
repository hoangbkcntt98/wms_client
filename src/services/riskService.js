import services from './index'

const riskService = {
    getRisks(){
         return services.get('http://localhost:8080/risk/all')
    },
    createRisk(risk){
        return services.post('http://localhost:8080/risk/create',risk)
    },
    deleteRisk(id){
        return services.delete('http://localhost:8080/risk/delete/'+id)
    },
    updateRisk(risk){
        return services.post('http://localhost:8080/risk/update',risk)
    }
    
}
export default riskService;