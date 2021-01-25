import axios from 'axios';
import { Link } from '@material-ui/core';
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse, CDataTable,
  CRow,
  CPagination
} from '@coreui/react'
import React, { lazy, useState,useEffect } from 'react'
import inventorySerivices from '../../services/inventoryServices'
import CreateForm from './createForm';
import UpdateForm from './updateForm';
const Inventory = () => {
  const [details, setDetails] = useState([])
  const [data,setData] = useState([])
  const [error,setError] = useState(null)
  const [open,setOpen] = useState({isUpdate:false,isCreate:false})
  const [update,setUpdate] = useState(-1)
  useEffect( ()=>{
     fetchData();
  },[])
  const fetchData = () =>{
    
    inventorySerivices.getInventories()
    .then((data)=>{
      setData(data.object)
    })
  }
  const handleOpen = (flg,item)=>{
    if(flg == 1){
      setOpen({
        ...open,
        isCreate: true
      })
    }else{
      console.log(open)
      setOpen({
        ...open,
        isUpdate:true
      })
      setUpdate(item.id)
      console.log(item)
    }
   }
  const handleClose = (flg) =>{
    if(flg == 1){
      setOpen({
        ...open,
        isCreate: false
      })
    }else{
      setOpen({
        ...open,
        isUpdate:false
      })
      
    }
   }
  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    console.log(newDetails)
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }
  const fields = [
    { key: 'id', _style: { width: '10%' } },
    {key:'name',_style: { width: '40%' }},
    { key: 'price', _style: { width: '10%' } },
    { key: 'inventoryClass', _style: { width: '10%' } },
    // { key: 'status',_style:{width: '10%'}},
    {
      key: 'show_details',
      label: '',
      _style: { width: '10%' },
      sorter: false,
      filter: false
    },
    
  ]

  const getBadge = (status) => {
    switch (status) {
      case 1: return 'success'
     
      case 2: return 'danger'
      default: return 'primary'
    }
  }
  const getType = (type) =>{
    switch(type){
      case 1: return 'Dễ hỏng'
      case 2: return 'Dễ vỡ'
      case 3: return 'Dễ cháy'
    }
  }
  const toDate = (date) =>{
    if(date!=null)
    return date[0]+'/'+date[1]+'/'+date[2]
    return 'NaN'
  }
  const onDelete = async (id) =>{
    // alert("delete")
    // alert(id)
    await inventorySerivices.deleteInventory(id).then(res=>console.log(res))
    fetchData()

  }
  const abcAnalysis = ()=>{
    axios.get('http://localhost:8080/api/inventory/abcAnalysis').then(res=>{
      setData(res.data.object)
      console.log(data)
    }).catch(e=>setError(e));
    if(error!=null) alert(error);
  }
  const createForm = open.isCreate?<CreateForm closeDialog = {handleClose} fetchData = {fetchData}></CreateForm>:null
  const updateForm = (item) => {
    console.log(item)
  } 
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Inventory
            </CCardHeader>
            <CCardBody>
              <CButton size="sm" color="success" href="http://localhost:3000/#/annual/all">
                Show Annual Demand
              </CButton>
              <CButton name = "isCreate" size="sm" color="primary" className="ml-1" onClick = {()=> handleOpen(1)}>
                Create New Product
              </CButton>
              <CButton size="sm" color="primary" className="ml-1" onClick = {()=> abcAnalysis()}>
                ABC Analysis
              </CButton>
              <br></br> 
              <br></br> 
              <CDataTable
                items={data}
                fields={fields}
                columnFilter
                tableFilter
                footer
                itemsPerPageSelect
                pagination={{'align': 'center'}}
                itemsPerPage={5}
                hover
                sorter
                scopedSlots={{
                  'status':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    ),
                  'tools':
                    (item, index) => {
                      return (
                        <td className="py-2">
                           <CButton size="sm" color="info" onClick= {()=>handleOpen(2,item)}>
                            Edit
                        </CButton>
                          {item.id==update?<UpdateForm 
                            isOpen = {open.isUpdate} 
                            openDialog = {handleOpen} 
                            closeDialog = {handleClose}
                            fetchData = {fetchData}
                            productUpdate = {item}
                          ></UpdateForm>:null}
                    
                        </td>
                      )
                    },
                    'show_details':
                    (item, index) => {
                     
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => { toggleDetails(index) }}
                          >
                            
                            {details.includes(index) ? 'Hide' : 'Show'}
                          </CButton>
                    
                        </td>
                      )
                    },
                  'details':
                    (item, index) => {
                      return (
                        <CCollapse show={details.includes(index)}>
                          <CCardBody>
                            <h4>
                              {item.name}
                            </h4>
                            <p className="text-muted">price: {item.price}</p>
                            <p className="text-muted">status: {item.status}</p>
                             <p className="text-muted">exp: {toDate(item.exp)}</p>
                            <p className="text-muted">type: {getType(item.type)}</p>
                            
                    
                            <CButton size="sm" color="info" onClick= {()=>handleOpen(2,item)}>
                            Edit
                        </CButton>
                          {item.id==update?<UpdateForm 
                            isOpen = {open.isUpdate} 
                            openDialog = {handleOpen} 
                            closeDialog = {handleClose}
                            fetchData = {fetchData}
                            productUpdate = {item}
                          ></UpdateForm>:null}
                    
                            <CButton size="sm" color="danger" className="ml-1" onClick ={()=>onDelete(item.id)}>
                              Delete
                              </CButton>
                             
                          </CCardBody>
                        </CCollapse>
                      )
                    }
                }}
              />
              
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {createForm}
    </>
  )



}
export default Inventory
