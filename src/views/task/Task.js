import axios from 'axios';
import PropTypes from 'prop-types';
import CreateTaskForm from './createTaskForm';
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
import taskService from 'src/services/taskService';
import { connect } from 'react-redux'
import DeleteTaskModal from './deleteTaskModal';
import UpdateTaskForm from './updateTaskForm';
import ImportTask from './importTask';

const Task = () => {
  const [details, setDetails] = useState([])
  const [data,setData] = useState([])
  const [open,setOpen] = useState(false)
  const [openDialog,setOpenDialog] = useState(false) 
  const [deleteItem,setDeleteItem] = useState('')
  useEffect(()=>{
    fetchData()
  },[])

 
  const fetchData = ()=>{
      taskService.getTasks().then((res)=>{
          setData(res.object)
      })
  }
  // const createForm = <CreateTaskForm show= {open} closeDialog = {handleOpen} fetchData = {fetchData}></CreateTaskForm>
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
    { key: 'taskId', _style: { width: '10%' },label:'ID' },
    { key: 'name', _style: { width: '25%' },label:'Tên Hoạt Động' },
    { key: 'description', _style: { width: '30%' },label:'Mô tả' },
    { key: 'actors', _style: { width: '11%' },label:'Nguồn lực' },
    // { key: 'action', _style: { width: '11%' },label:'Nguồn lực' },
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
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Task
            </CCardHeader>
            <CCardBody>
            <CreateTaskForm fetchData = {fetchData}></CreateTaskForm>
            <ImportTask fetchData={fetchData}></ImportTask>
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
                            <p className="text-muted ml-4" color = "#ced2d8">ID: {item.taskId}</p>
                            <p className="text-muted ml-4">Task Cha : {item.parents.length>0?item.parents:'Không có'} </p>
                            <p className="text-muted ml-4">Mô tả: </p>
                            <p className = "ml-5">{item.description}</p>
                          
                             <UpdateTaskForm taskUpdate={item} fetchData = {fetchData}></UpdateTaskForm>
                             <DeleteTaskModal  taskDelete = {item} fetchData = {fetchData}></DeleteTaskModal>
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

export default Task;