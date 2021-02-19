import React, { lazy, useState,useEffect } from 'react'
import {
    CModalBody,
    CModalFooter,
    CModalHeader,
    CButton,
    CModal  
} from '@coreui/react'
import taskService from '../../../services/taskService'
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
const DeleteTaskModal = ({taskId,fetchData})=>{
    const [modal, setModal] = useState(false);

    const toggle = ()=>{
      setModal(!modal);
    }
    const handleSubmit = async() =>{
    
        await  taskService.deleteTask(taskId).then(res=> console.log(res));
        fetchData()
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
          <CModalHeader closeButton><ReportProblemIcon></ReportProblemIcon>{"Warning!!!"}</CModalHeader>
          <CModalBody>
          {"Bạn chắc chắn muốn xoá Task \'"+taskId+"\'"}
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
export default DeleteTaskModal;