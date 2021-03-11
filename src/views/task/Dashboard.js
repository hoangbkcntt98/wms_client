import React, {  lazy, useState,useEffect ,useSelector} from 'react'
import {
  CCol,
  CRow,
} from '@coreui/react'
import taskService from 'src/services/taskService';
import Task from './Task'
import RiskWidget from '../algorithms/Widgets'
import TaskLevelCard from './TaskLevelCard'
import TaskBarChart from './TaskBarChart';

import GranttChart from './GranttChart';

const TaskDashboard = () => {
    const [data,setData] = useState([]);
    const [probs, setProbs] = useState({});
    const [idList,setIdList] = useState([]);
    const [high, setHigh]  = useState()
    const [medium, setMedium]  = useState()
    const [low, setLow]  = useState()
    const [granttData , setGranttData] = useState([])
    useEffect(()=>{
       console.log(data.length)
       fetchData();
      },[data.length])
    const fetchData = ()=>{
        taskService.calcPertProb()
        taskService.getTasks().then((res)=>{
          console.log(res.object)
          setData(res.object)
          let probs = data.map(d=>d.pertProb*100)
          let ids = data.map(d=>d.taskId)
          let high = probs.filter((d)=>{return d>=60})
          let medium = probs.filter(d=>(d<60)&(d>=30))
          let low = probs.filter(d=>d<30)
          setLow(low.length/probs.length  )
          setMedium(medium.length/probs.length)
          setHigh(high.length/probs.length)
          setProbs(probs);
          setIdList(ids)
          let myVals = [];
          for(let d in data){
            console.log(d)
          }
          for (let key in data) {
            const { taskId,name,description,taskInformation,parents} = data[key];
            if(taskId == data[0].taskId){
              myVals.push([ taskId,name,description, new Date(),null,taskInformation.duration*24*3600*1000,100,parents.replace(" ",","),"A"]);
            }else{
              myVals.push([ taskId,name,description, null,null,taskInformation.duration*24*3600*1000,100,parents.replace(" ",","),"B"]);
            }
            
         }
         console.log(myVals) 
         setGranttData(myVals)  
        })
      }
    
  return (
    <>
      <RiskWidget high = {high} low = {low} medium={medium} probs = {probs}></RiskWidget>
      <CRow>
         <CCol sm = "6">
          <TaskBarChart 
            data = {data} 
            idList={idList} 
            probs = {probs}
            fetchData = {fetchData}
          ></TaskBarChart>
         </CCol>
         <CCol sm = "6">
          <TaskLevelCard high = {high} medium = {medium} low = {low}></TaskLevelCard>   
        </CCol>

     </CRow>
      <CRow>
        <CCol>
          <GranttChart
            granttData = {granttData}
          >     
          </GranttChart>
        </CCol>
      </CRow>
    </>
  )
}

export default TaskDashboard
