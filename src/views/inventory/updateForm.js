import React,{useState,useEffect,Fragment} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CSwitch
} from '@coreui/react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import CIcon from '@coreui/icons-react'
import inventorySerivices from '../../services/inventoryServices'
import { classNames } from 'classnames';

const UpdateForm = ({isOpen,openDialog,closeDialog,fetchData,productUpdate}) =>{
    const [product,setProduct] = useState(productUpdate)
    const [open,setOpen] = useState(true)

    const handleSubmit = async()=>{
      console.log(product)
      setProduct(tranfer(product))
      var data = {
        id:product.id,
        data:product}
      console.log(data)
      await inventorySerivices.updateInventory(data)
      .then((res)=>{
          console.log(res.object)
          closeDialog(2)
      })
     .catch(
         error => console.log(error)
     )
    // //  await inventorySerivices.createInventory(product).then(res=>console.log(res)).catch(error=> alert(error.response))
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
     console.log(product.exp)
       product.quantities = parseFloat(product.quantities)
       product.price = parseFloat(product.price)
       product.exp = new Date(product.exp)
       return product;

   }
   const convertToDate = (date) =>{
     
    console.log(date)
    let newDate = '';
     if(date!=undefined){
      newDate = date[0]+"-"+date[1]+"-"+date[2];
     }
     console.log(newDate)
     return newDate;
   }
    const form = 
    (
        
          <CCard>
            <CCardHeader>
              Update Product
            </CCardHeader>
            <CCardBody>
              <CForm   className="form-horizontal">
                
                <CFormGroup row>
                    <CCol xs="6" md="6">
                        <CLabel htmlFor="text-input">Name</CLabel>
                        <CInput id="text-input" name="name" placeholder="Text" onChange = {handleChange} value = {product.name}/>
                    </CCol>
                    <CCol xs="6" md="6">
                        <CLabel htmlFor="text-input">SKU</CLabel>
                        <CInput id="text-input" name="sku" placeholder="Text" onChange = {handleChange} value = {product.sku}/>
                    </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol xs="6" md="6">
                        <CLabel htmlFor="text-input">Quantities</CLabel>
                        <CInput id="text-input" name="quantities" placeholder="Text" onChange = {handleChange} value = {product.quantities}/>
                    </CCol>
                    <CCol xs="6" md="6">
                        <CLabel htmlFor="text-input">Price</CLabel>
                        <CInput id="text-input" name="price" placeholder="Text" onChange = {handleChange} value = {product.price}/>
                    </CCol>
                </CFormGroup>
               
                
                <CFormGroup row >
                  <CCol md="6" size= "lg">
                    <CLabel htmlFor="exp">EXP</CLabel>
                    <CInput type="date" id="date-input" name="exp" placeholder="date" onChange = {handleChange} />
                    {/* defaultValue={convertToDate(product.exp)} */}
                    {/* <CInput type="hidden" id="date-input" name="exp-temp" placeholder="date" onChange = {handleChange} /> */}
                  </CCol>
                  <CCol xs="6" md="4" size = "lg">
                  <CLabel htmlFor="select">Type</CLabel>
                    <CSelect custom name="type" id="select" onChange = {handleChange} defaultValue = {product.type}>
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
                      defaultChecked = {product.status ==1?true:false}
                      shape="pill"
                      onChange = {handleChange}
                    />
                    
                  </CCol>
                </CFormGroup>
                <CButton onClick={handleSubmit} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton onClick = {() => closeDialog(2) } size="sm" color="danger" className ="ml-1"><CIcon name="cil-ban" /> Cancel</CButton>
              </CForm>
            </CCardBody>
            <CCardFooter>
              
            </CCardFooter>
          </CCard>
          
        
    );
    return (
        <Fragment>
           
        <Dialog
          open={isOpen}
          onClose={closeDialog}
          fullWidth
          maxWidth="sm"
        >
        <DialogContent >
            {form}
        </DialogContent>
        </Dialog>
        </Fragment>
       
        
    )
}
export default UpdateForm;