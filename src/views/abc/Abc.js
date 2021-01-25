import axios from 'axios';
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
import abcServices from 'src/services/abcServices';
import CreateAbcForm from 'src/views/abc/createAbc'


const Abc = () => {
  const [details, setDetails] = useState([])
  const [data,setData] = useState([])
  const [error,setError] = useState(null)
  const [open,setOpen] = useState(false)
  useEffect(()=>{
    fetchData()
  },[])
  const handleOpen=()=>{
      setOpen(true);
  }
  const handleClose = () =>{
      setOpen(false)
  }
  const fetchData = ()=>{
      abcServices.getAbcs().then((res)=>{
          setData(res.object)
      })
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
    { key: 'id', _style: { width: '5%' },label:'Id' },
    { key: 'name', _style: { width: '35%' },label:'name' },
    { key: 'range', _style: { width: '5%' },label:'range' },
    {
      key: 'show_details',
      label: '',
      _style: { width: '10%' },
      sorter: false,
      filter: false
    }
  ]

  const createForm = open?<CreateAbcForm closeDialog = {handleClose} fetchData = {fetchData}></CreateAbcForm>:null
  const abcAnalysis = ()=>{
    axios.get('http://localhost:8080/api/inventory/abcAnalysis').then(res=>setData(res.data.object)).catch(e=>setError(e));
    if(error!=null) alert(error);
  }
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Abc
            </CCardHeader>
            <CCardBody>
            <CButton name = "isCreate" size="sm" color="primary" className="ml-1" onClick = {()=> handleOpen()}>
                Create New Abc
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
                            <p className="text-muted">name: {item.name}</p>
                            <p className="text-muted">id: {item.id}</p>
                            
                            <CButton size="sm" color="info">
                              Edit
                              </CButton>
                            <CButton size="sm" color="danger" className="ml-1">
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
export default Abc
