import React, { lazy, useState,useEffect } from 'react'
import {
    CModalBody,
    CModalFooter,
    CModalHeader,
    CButton,
    CModal
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react';
import { cifAU } from '@coreui/icons';


import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import riskService from 'src/services/riskService';
const DeleteRiskModal = ({riskDelete,fetchData})=>{
    const [modal, setModal] = useState(false);

    const toggle = ()=>{
      setModal(!modal);
    }
    const handleSubmit = async() =>{
        await riskService.deleteRisk(riskDelete.id).then(res=>console.log(res))
        fetchData()
        toggle()
      }
    return (
      <>
        <CButton size="sm" color="danger" className="ml-1" onClick = {toggle}>
                  Delete
      </CButton>
        <CModal
          show={modal}
          onClose={toggle}
          centered = {true}
        >
          <CModalHeader closeButton>{"Warning!!!"}</CModalHeader>
          <CModalBody>
          <ReportProblemIcon fontSize="large" style={{ color:"#f9b115" ,fontSize:40}}></ReportProblemIcon>
         
          {"  Bạn chắc chắn muốn xoá Risk \'"+riskDelete.id+"\'"}
          </CModalBody>
          <CModalFooter>
            <CButton color="warning" onClick = {handleSubmit}>Delete</CButton>{' '}
            <CButton
              color="danger"
              onClick={toggle}
            >Cancel</CButton>
          </CModalFooter>
        </CModal>
      </>
    )
}
export default DeleteRiskModal;