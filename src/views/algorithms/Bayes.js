import React, {  lazy, useState,useEffect ,useSelector} from 'react'
import {
  CCol,
  CRow,
} from '@coreui/react'
import riskService from 'src/services/riskService';
import Risk from '../risk/Risk'
import RiskInfoModal from './RiskInfoModal'
import RiskBarChart from './RiskBarChart'
import RiskWidget from './Widgets'
import RiskLevelCard from './RiskLevelCard';

const BayesDashboard = () => {
    const [data,setData] = useState([]);
    const [probs, setProbs] = useState({});
    const [idList,setIdList] = useState([]);
    const [high, setHigh]  = useState()
    const [medium, setMedium]  = useState()
    const [low, setLow]  = useState()
  
    useEffect(()=>{
       console.log(data.length)
       
        fetchData();
      },[data.length])
    const fetchData = ()=>{
         riskService.getRisks().then((res)=>{
            setData(res.object)
            let probs = data.map(d=>d.prob*100)
            console.log(data)
            let ids = data.map(d=>d.riskId)
            let high = probs.filter((d)=>{return d>=60})
            let medium = probs.filter(d=>(d<60)&(d>=30))
            let low = probs.filter(d=>d<30)
            setLow(low.length/probs.length  )
            setMedium(medium.length/probs.length)
            setHigh(high.length/probs.length)
            setProbs(probs);
            setIdList(ids)
        })
      }
 
     
  return (
    <>
      
      <RiskWidget high = {high} low = {low} medium={medium} probs = {probs}></RiskWidget>
      <CRow>
         <CCol sm = "6">
          <RiskBarChart 
            data = {data} 
            idList={idList} 
            probs = {probs}
            fetchData = {fetchData}
          ></RiskBarChart>
         </CCol>
         <CCol sm = "6">
          <RiskLevelCard high = {high} medium = {medium} low = {low}></RiskLevelCard>   
        </CCol>

     </CRow>
      <CRow>
        <CCol>   <Risk></Risk></CCol>
        {/* <div class = "col-sm-12" style = {{height:30+'em',overflow:'auto'}}>
       
        </div> */}
        
      </CRow>
    

      
    </>
  )
}

export default BayesDashboard
