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
  CInputFile,
  CListGroup,
  CListGroupItem,
  CLabel
} from '@coreui/react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import CIcon from '@coreui/icons-react'

import fileService from 'src/services/fileService';
// import CloseIcon from '@material-ui/icons/Close';

const ImportTask = ({fetchData}) =>{
   const [task,setTask] = useState({
      name:"",
      parents:"",
      description:"",
      actors:"",
      taskId:""
   })
   const [open,setOpen] = useState(false)
   const [files,setFiles] = useState([])
   const [fileName,setFileName] = useState([])
   const handleOpen= ()=>{
        setOpen(!open);
    }

   const handleSubmit = async()=>{
     await fileService.uploadTasks(files[0]).then(res => console.log(res))
     fetchData()

   }
   const handleChange = (evt)=>{
    const value = evt.target.files
    let fileNames = []
  
    // console.log(files)
    value.forEach(element => {
        fileNames.push(<CListGroupItem href="#" >{element.name}</CListGroupItem>)
        console.log(element.name)

    });
    setFileName(fileNames)
    setFiles(value)
    console.log(files)
 
   }
    const form = 
    (
        
          <CCard>
            <CCardHeader>
              Import Task
            </CCardHeader>
            <CCardBody>
              <CForm   className="form-horizontal">
                
                
              <CFormGroup row>
                  <CCol md="1">
                  
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInputFile 
                      id="file-multiple-input" 
                      name="file-multiple-input" 
                      multiple={true}
                      custom ={true}
                      onChange = {handleChange}
                    />
                    <CLabel htmlFor="file-multiple-input" variant="custom-file">
                      Chọn tệp
                    </CLabel>
                  </CCol>
                </CFormGroup>
                
                <CCard>
                    <CCardHeader color="secondary ">
        
                        Các tệp đã chọn :
                    </CCardHeader>
                    <CCardBody>
                    <CListGroup>
                        {fileName}
                    </CListGroup>
                    </CCardBody>
                    </CCard>
             
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
                Import
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
export default ImportTask;