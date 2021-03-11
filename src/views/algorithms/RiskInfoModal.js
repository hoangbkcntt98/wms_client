import React, { lazy, useState,useEffect } from 'react'
import {
    CModalBody,
    CModalFooter,
    CModalHeader,
    CButton,
    CModal
} from '@coreui/react'
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
const RiskInfoModal = ({risk,openInfo})=>{
    const [modal, setModal] = useState(openInfo);
    const toggle = ()=>{
      setModal(!modal);
    }
    const handleSubmit = () =>{
        console.log(modal)
        toggle()
      }
    return (
      <>
        <CModal
          show={modal}
          onClose={toggle}
          centered = {true}
        >
          <CModalHeader closeButton>{"Warning!!!"}</CModalHeader>
          <CModalBody>
          <ReportProblemIcon fontSize="large" style={{ color:"#f9b115" ,fontSize:40}}></ReportProblemIcon>
         
          {"  Bạn chắc chắn muốn xoá Risk \'"+risk.id+"\'"}
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
export default RiskInfoModal;