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

const CreateForm = ({closeDialog,fetchData}) =>{
    const [product,setProduct] = useState({name:'',sku:'',exp:"",type:1,status:1,quantities:12.0,price:12.0})
    const [open, setOpen] = useState(false)


   const handleSubmit = async()=>{
     setProduct(tranfer(product))
     console.log(product)
     await inventorySerivices.createInventory(product).then(res=>console.log(res)).catch(error=> alert(error.response))
     fetchData()

   }
   const handleChange = (evt)=>{
    const value = evt.target.value;
    
    setProduct({
      ...product,
      [evt.target.name]: value
    });
   }
   const tranfer = (product) =>{
      
       product.quantities = parseFloat(product.quantities)
       product.price = parseFloat(product.price)
       product.exp = new Date(product.exp)
       return product;

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
                        <CLabel htmlFor="text-input">SKU</CLabel>
                        <CInput id="text-input" name="sku" placeholder="Text" onChange = {handleChange}/>
                    </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol xs="6" md="6">
                        <CLabel htmlFor="text-input">Quantities</CLabel>
                        <CInput id="text-input" name="quantities" placeholder="Text" onChange = {handleChange}/>
                    </CCol>
                    <CCol xs="6" md="6">
                        <CLabel htmlFor="text-input">Price</CLabel>
                        <CInput id="text-input" name="price" placeholder="Text" onChange = {handleChange}/>
                    </CCol>
                </CFormGroup>
               
                
                <CFormGroup row >
                  <CCol md="6" size= "lg">
                    <CLabel htmlFor="exp">EXP</CLabel>
                    <CInput type="date" id="date-input" name="exp" placeholder="date"onChange = {handleChange} />
                  </CCol>
                  <CCol xs="6" md="4" size = "lg">
                  <CLabel htmlFor="select">Type</CLabel>
                    <CSelect custom name="type" id="select" onChange = {handleChange}>
                      <option value="0">Please select</option>
                      <option value="1">Dễ Hỏng</option>
                      <option value="2">Dễ Vỡ</option>
                      <option value="3">Dễ Cháy</option>
                    </CSelect>
                  </CCol>
                 
                </CFormGroup>
                
              
                <CFormGroup row>
                  <CCol tag="label" sm="3" className="col-form-label"  >
                    Status :
                  </CCol>
                  <CCol sm="9">
                   
                    <CSwitch
                      className="mr-1 mt-1"
                      color="success"
                      defaultChecked
                      shape="pill"
                      onChange = {handleChange}
                    />
                    
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
export default CreateForm;