import services from './index'

const riskDisService = {
    getRiskDis(){
         return services.get('http://localhost:8080/riskDis/all')
    },
    createRiskDis(risk){
        return services.post('http://localhost:8080/riskDis/create',risk)
    },
    deleteRiskDis(id){
        return services.delete('http://localhost:8080/riskDis/delete/'+id)
    },
    updateRiskDis(risk){
        return services.post('http://localhost:8080/riskDis/update',risk)
    }
    
}
export default riskDisService;