import services from './index'

const fileService = {
    uploadTasks(file){
        const formData = new FormData();
        formData.append("file", file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return services.post('http://localhost:8080/file/upload/task',formData,config)
    },
    uploadRisks(file){
        const formData = new FormData();
        formData.append("file",file)
        const config = {
            headers:{
                'content-type': 'multipart/form-data'
            }
        }
        return services.post('http://localhost:8080/file/upload/risk',formData,config)
    },
    uploadRiskDis(file){
        const formData = new FormData();
        formData.append("file",file)
        const config = {
            headers:{
                'content-type': 'multipart/form-data'
            }
        }
        return services.post('http://localhost:8080/file/upload/riskDis',formData,config)
    }
    
}
export default fileService;