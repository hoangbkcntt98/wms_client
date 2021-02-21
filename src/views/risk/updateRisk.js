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
import riskService from 'src/services/riskService';
// import CloseIcon from '@material-ui/icons/Close';

const UpdateRiskForm = ({riskUpdate,fetchData}) =>{
   const [risk,setRisk] = useState({
      id:riskUpdate.id,
      riskId: riskUpdate.riskId,
      name:riskUpdate.name,
      parents:riskUpdate.parents,
      description:riskUpdate.description,
      tasks: riskUpdate.tasks,
   })
   const [open,setOpen] = useState(false)
   const handleOpen= ()=>{
    setOpen(!open);
  }
   const handleSubmit = async()=>{
     setRisk(risk)
     await riskService.updateRisk(risk).then(res => console.log(risk)).catch(error=> alert(error.response))
     fetchData()
     handleOpen()

   }
   const handleChange = (evt)=>{
    const value = evt.target.value;
    setRisk({
        ...risk,
        [evt.target.name]: value
    })
   }
    const form = 
    (
        
          <CCard>
            <CCardHeader>
              Cập nhật Rủi ro
            </CCardHeader>
            <CCardBody>
              <CForm   className="form-horizontal">
                
                <CFormGroup row>
                    <CCol xs="6" md="6">
                        <CLabel htmlFor="text-input">ID</CLabel>
                        <CInput id="text-input" name="riskId" placeholder="Text" onChange = {handleChange} defaultValue={risk.riskId}/>
                    </CCol>
                    <CCol xs="6" md="6">
                        <CLabel htmlFor="text-input">Tên</CLabel>
                        <CInput id="text-input" name="name" placeholder="Text" onChange = {handleChange} defaultValue={risk.name}/>
                    </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol xs="6" md="6">
                        <CLabel htmlFor="text-input">Rủi ro cha </CLabel>
                        <CInput id="text-input" name="parents" placeholder="Các task cách nhau bởi dấu ," onChange = {handleChange} 
                        defaultValue={risk.parents} />
                    </CCol>
                    <CCol xs="6" md="6">
                        <CLabel htmlFor="text-input">Các hoạt động bị ảnh hưởng</CLabel>
                        <CInput id="text-input" name="tasks" placeholder="Text" onChange = {handleChange}
                        defaultValue={risk.tasks}/>
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
                      defaultValue={risk.description}
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
          <CButton size="sm" color="warning" onClick={handleOpen}>
                              Edit
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
export default UpdateRiskForm;