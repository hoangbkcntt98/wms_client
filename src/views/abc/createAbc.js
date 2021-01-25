import React,{useState,useEffect} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch
} from '@coreui/react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import CIcon from '@coreui/icons-react'
import inventorySerivices from '../../services/inventoryServices'
// import CloseIcon from '@material-ui/icons/Close';
import abcServices from './../../services/abcServices';

const CreateAbcForm = ({closeDialog,fetchData}) =>{
    const [abc,setAbc] = useState({name:'',range:0})
    const [open, setOpen] = useState(false)


   const handleSubmit = async()=>{
    tranfer(abc)
    console.log(abc)
    await abcServices.createAbc(abc).then(res=>console.log(res))
     fetchData()

   }
   const handleChange = (evt)=>{
    const value = evt.target.value;
    
    setAbc({
      ...abc,
      [evt.target.name]: value
    });
   }
   const tranfer = (abc) =>{
    abc.range = parseInt(abc.range)
    return abc;

}
    const form = 
    (
        
          <CCard>
            <CCardHeader>
              Create New Product
            </CCardHeader>
            <CCardBody>
              <CForm   className="form-horizontal">
                
                <CFormGroup row>
                    <CCol xs="6" md="6">
                        <CLabel htmlFor="text-input">Name</CLabel>
                        <CInput id="text-input" name="name" placeholder="Text" onChange = {handleChange} />
                    </CCol>
                    <CCol xs="6" md="6">
                        <CLabel htmlFor="text-input">range</CLabel>
                        <CInput type = "number"id="text-input" name="range" placeholder="Text" onChange = {handleChange}/>
                    </CCol>
                </CFormGroup>
                
                <CButton onClick={handleSubmit} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton onClick={()=>closeDialog(1)} size="sm" color="danger" className ="ml-1"><CIcon name="cil-ban" /> Cancel</CButton>
              </CForm>
            </CCardBody>
            <CCardFooter>
              
            </CCardFooter>
          </CCard>
          
        
    );
    return (
        <Dialog
          open={true}
          onClose={closeDialog}
          fullWidth
          maxWidth="sm"
        >
        <DialogContent >
            {form}
        </DialogContent>
        </Dialog>
    )
}
export default CreateAbcForm;