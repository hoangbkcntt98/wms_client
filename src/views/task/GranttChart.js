import React,{useState,useEffect} from 'react'
import Chart from "react-google-charts"
import {
    CCard,
    CCardBody,
    CCardHeader,
  
  } from '@coreui/react'
const GranttChart = ({granttData}) =>{
    const [height,setHeight] = useState();
    useEffect(()=>{
     setHeight(window.screen.height)   
    })
    return (
        <>
        <CCard>
              <CCardHeader>
                Grantt Chart
              </CCardHeader>
              <CCardBody>
              <Chart
        chartArea={{
            backgroundColor: {
                stroke: '#fff',
                strokeWidth: 1
            }
        }}
        width={'100%'}
        height={height}
        chartType="Gantt"
        loader={<div>Loading Chart</div>}
        options={{
            // This must be also set to render the tooltip with html (vs svg)
            tooltip: { isHtml: true, }
        }}
        
        data={[
            [
            { type: 'string', label: 'Task ID' },
            { type: 'string', label: 'Task Name' },
            { type: 'string', label: 'Task Des' },
            { type: 'date', label: 'Start Date' },
            { type: 'date', label: 'End Date' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent ABC' },
            { type: 'string', label: 'Dependencies' },
            { type: "string",role: "tooltip", p: { html: true }}
            ],
            ...granttData
            // [
            //   'Research',
            //   'Find sources',
            //   null,
            //   new Date(2015, 0, 1),
            //   new Date(2015, 0, 5),
            //   null,
            //   100,
            //   null,
            //   // "<h2> Anything can go here </h2>"
            // ], 
        ]}
        rootProps={{ 'data-testid': '3' }}
        />
              </CCardBody>
        </CCard>
        </>
       
    )
}
export default GranttChart