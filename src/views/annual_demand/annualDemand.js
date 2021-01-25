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
let inventories  = [];

console.log(inventories);
const AnnualDemand = () => {
  const [details, setDetails] = useState([])
  const [currentPage, setActivePage] = useState(1)
  const [data,setData] = useState([])
  const [error,setError] = useState(null)
  axios.get('http://localhost:8080/api/annual_demand/all').then(res=>{
    if(data.length===0){
     setData(res.data.object) 
    }});
  console.log(data);
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
  data.forEach(d=>{
      d['inventoryName'] = d.inventory.name;
      d['inventoryId'] = d.inventory.id;
      d['inventoryClass'] = d.inventory.inventoryClass;
  })
  const fields = [
    { key: 'inventoryId', _style: { width: '5%' },label:'Inventory Id' },
    { key: 'inventoryName', _style: { width: '35%' },label:'Inventory Name' },
    { key: 'inventoryClass', _style: { width: '5%' },label:'Inventory Class' },
    {key:'annualDemand',_style: { width: '30%' }},
    { key: 'annualUsageValue', _style: { width: '5%' } },
    { key: 'usageValProportion', _style: { width: '10%' } },
    { key: 'cumulativeProportion', _style: { width: '10%' } },  
    
    {
      key: 'show_details',
      label: '',
      _style: { width: '10%' },
      sorter: false,
      filter: false
    }
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
              Inventory
            </CCardHeader>
            <CCardBody>
            <CButton size="sm" color="success" href="http://localhost:3000/#/inventory">
                Show Inventories
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
                            <p className="text-muted">annualDemand: {item.annualDemand}</p>
                            <p className="text-muted">annualUsageValue: {item.annualUsageValue}</p>
                            
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
    </>
  )



}
export default AnnualDemand
