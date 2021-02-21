
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CCollapse, CDataTable,
    CRow,
  } from '@coreui/react'
  import React, { lazy, useState,useEffect } from 'react'
  import riskDisService from 'src/services/riskDisService';

  const RiskDistribution = () => {
    const [details, setDetails] = useState([])
    const [data,setData] = useState([])
    useEffect(()=>{
      fetchData()
    },[])
    const fetchData = ()=>{
        riskDisService.getRiskDis().then((res)=>{
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
      { key: 'parents', _style: { width: '25%' },label:'Rủi ro cha' },
      { key: 'prob', _style: { width: '30%' },label:'Xác suất' },
      
    ]
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                Risk
              </CCardHeader>
              <CCardBody>
              {/* <CreateRiskForm fetchData = {fetchData}></CreateRiskForm>
              <ImportRiskForm fetchData={fetchData}></ImportRiskForm> */}
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
                                ID: {item.riskId}
                              </h4>
                              <p className="text-muted ml-4" >ID: {item.riskId}</p>
                              <p className="text-muted ml-4">Rủi ro cha : {item.parents.length>0?item.parents:'Không có'} </p>
                              {/* <UpdateRiskForm riskUpdate = {item} fetchData = {fetchData}></UpdateRiskForm>
                              <DeleteRiskModal riskDelete = {item} fetchData = {fetchData}></DeleteRiskModal> */}
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
  
  export default RiskDistribution;