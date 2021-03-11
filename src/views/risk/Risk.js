
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse, CDataTable,
  CRow,
  CModal,
  CPagination
} from '@coreui/react'
import React, { lazy, useState,useEffect } from 'react'
import riskService from 'src/services/riskService';
import CreateRiskForm from './CreateRisk';
import DeleteRiskModal from './deleteRisk';
import UpdateRiskForm from './updateRisk';
import ImportRiskForm from './ImportRisk'
const Risk = () => {
  const [details, setDetails] = useState([])
  const [data,setData] = useState([])
  useEffect(()=>{
  
    fetchData()
  },[])
  const fetchData = ()=>{
      riskService.getRisks().then((res)=>{
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
    { key: 'riskId', _style: { width: '10%' },label:'ID' },
    { key: 'name', _style: { width: '25%' },label:'Tên Rủi Ro' },
    { key: 'description', _style: { width: '30%' },label:'Mô tả' },
    { key: 'parents', _style: { width: '11%' },label:'Rủi ro Cha' },
    // { key: 'tasks', _style: { width: '11%' },label:'Hoạt động bị ảnh hưởng' },
    {
      key: 'show_details',
      label: '',
      _style: { width: '10%' },
      sorter: false,
      filter: false,
      label:'Chi tiết'
    }
  ]
  return (
    <>
      {/* <CRow> */}
        {/* <CCol> */}
          <CCard>
            <CCardHeader>
              Danh sách rủi ro
            </CCardHeader>
            <CCardBody>
            <CreateRiskForm fetchData = {fetchData}></CreateRiskForm>
            <ImportRiskForm fetchData={fetchData}></ImportRiskForm>
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
                itemsPerPage={20}
                hover
                sorter
                outlined={true}
                clickableRows={true}
                border={true}
                striped={true}
                scopedSlots={{
                  
                  'show_details':
                    (item, index) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="pill"
                            size="sm"
                            // variant="ghost"
                            onClick={() => { toggleDetails(index) }}
                          >
                            {details.includes(index) ? 'Ẩn' : 'Hiện'}
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
                            <p className="text-muted ml-4" color = "#ced2d8">ID: {item.riskId}</p>
                            <p className="text-muted ml-4">Rủi ro cha : {item.parents.length>0?item.parents:'Không có'} </p>
                            
                            <p className="text-muted ml-4" color = "#ced2d8">Hoạt động bị ảnh hưởng: {item.tasks}</p>
                            <p className="text-muted ml-4">Mô tả: </p>
                            <p className = "ml-5">{item.description}</p>
                            
                            <UpdateRiskForm riskUpdate = {item} fetchData = {fetchData}></UpdateRiskForm>
                            <DeleteRiskModal riskDelete = {item} fetchData = {fetchData}></DeleteRiskModal>
                          </CCardBody>
                        </CCollapse>
                      )
                    }
                }}
              />
              
            </CCardBody>
          </CCard>
        {/* </CCol> */}
      {/* </CRow> */}
    
   
    </>
    
  )
}

export default Risk;