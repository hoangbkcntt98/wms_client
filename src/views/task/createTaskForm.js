import React,{useState,useEffect} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
} from '@coreui/react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import CIcon from '@coreui/icons-react'
// import inventorySerivices from '../../services/inventoryServices'
import taskService from '../../services/taskService'
// import CloseIcon from '@material-ui/icons/Close';

const CreateTaskForm = ({fetchData}) =>{
   const [task,setTask] = useState({
      name:"",
      parents:"",
      description:"",
      actors:"",
      taskId:""
   })
   const [open,setOpen] = useState(false)
   const handleOpen= ()=>{
    setOpen(!open);
  }
   const handleSubmit = async()=>{
     setTask(tranfer(task))
     console.log(task)
     await taskService.createTask(task).then(res => console.log(res)).catch(error => alert(error.response))
     fetchData()
     handleOpen()

   }
   const handleChange = (evt)=>{
    const value = evt.target.value;
    setTask({
      ...task,
      [evt.target.name]:value
    })
   }
   const tranfer = (task) =>{
      
      
       return task;

   }
    const form = 
    (
        
          <CCard>
            <CCardHeader>
              Thêm Task
            </CCardHeader>
            <CCardBody>
              <CForm   className="form-horizontal">
                
                <CFormGroup row>
                    <CCol xs="6" md="6">
                        <CLabel htmlFor="text-input">Task ID</CLabel>
                        <CInput id="text-input" name="taskId" placeholder="Text" onChange = {handleChange} />
                    </CCol>
                    <CCol xs="6" md="6">
                        <CLabel htmlFor="text-input">Tên</CLabel>
                        <CInput id="text-input" name="name" placeholder="Text" onChange = {handleChange}/>
                    </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol xs="6" md="6">
                        <CLabel htmlFor="text-input">Task cha </CLabel>
                        <CInput id="text-input" name="parents" placeholder="Các task cách nhau bởi dấu Space" onChange = {handleChange}/>
                    </CCol>
                    <CCol xs="6" md="6">
                        <CLabel htmlFor="text-input">Nguồn lực</CLabel>
                        <CInput id="text-input" name="actors" placeholder="Text" onChange = {handleChange}/>
                    </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Mô tả :</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea 
                      name="description" 
                      id="textarea-input" 
                      rows="9"
                      placeholder="Content..." 
                      onChange={handleChange}
                    />
                  </CCol>
                </CFormGroup>
                
             
                <CButton onClick={handleSubmit} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton onClick={()=>handleOpen()} size="sm" color="danger" className ="ml-1"><CIcon name="cil-ban" /> Cancel</CButton>
              </CForm>
            </CCardBody>
            <CCardFooter>
              
            </CCardFooter>
          </CCard>
          
        
    );
    return (
        <>
         <CButton name = "isCreate" size="sm" color="success" className="ml-1" onClick={handleOpen}>
               Mới
              </CButton>
        <Dialog
          open={open}
          onClose={handleOpen}
          fullWidth
          maxWidth="sm"
        >
        <DialogContent >
            {form}
        </DialogContent>
        </Dialog>
        </>
    )
}
export default CreateTaskForm;