import services from './index'

const taskService = {
    getTasks(){
         return services.get('http://localhost:8080/task/all')
    },
    createTask(task){
        return services.post('http://localhost:8080/task/create',task)
    },
    deleteTask(id){
        return services.delete('http://localhost:8080/task/delete/'+id)
    },
    updateTask(task){
        return services.post('http://localhost:8080/task/update',task)
    }
    
}
export default taskService;