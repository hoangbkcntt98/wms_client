import React from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
  
  } from '@coreui/react'
  import {
      CChartPie,
    } from '@coreui/react-chartjs'
const TaskLevelCard = ({high,medium,low}) =>{
    return (
        <CCard>
              <CCardHeader>
                Mức độ hoàn thành
              </CCardHeader>
              <CCardBody>
                <CChartPie
                  datasets={[
                    {
                      label: "Task successfully level",
                      backgroundColor: [
                        '#FF0000',
                        '#FFBF00',
                        '#3ADF00'
                      ],
                      data: [high, medium, low]
                    }
                  ]}
                  labels={['High', 'Medium', 'Low']}
                  options={{
                    tooltips: {
                      enabled: true,
                      callbacks: {
                        title: function(tooltipItem, data) {
                          return data['labels'][tooltipItem[0]['index']];
                        },
                        label: function(tooltipItem, data) {
                          var dataset = data['datasets'][0];
                          var percent =(dataset['data'][tooltipItem['index']] )*10000
                          var percent1 = Math.round(percent)/100
                          return '(' + percent1 + '%)';
                        }
                      },
                      backgroundColor: '#FFF',
                      titleFontSize: 16,
                      titleFontColor: '#0066ff',
                      bodyFontColor: '#000',
                      bodyFontSize: 14,
                      displayColors: false
                    }
                  }}
                />
              </CCardBody>
            </CCard>
    )
}
export default TaskLevelCard