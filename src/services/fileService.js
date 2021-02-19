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
        return services.post('http://localhost:8080/api/file/upload/task',formData,config)
    }
    
}
export default fileService;