import React, {useState} from 'react'
import moment from 'moment';
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCol,
    CRow,    
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModal
  } from '@coreui/react'

  import InfoIcon from '@material-ui/icons/Info';
import {
    CChartBar,
  } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import taskService from 'src/services/taskService'

const TaskBarChart = ({data,idList,probs,fetchData}) =>{
  const [task,setTask] = useState({})
  const [modal, setModal] = useState(false);
  const toggle = ()=>{
    setModal(!modal);
  }
  const updateProb = ()=>{
    // taskService.calcPertProb()
    fetchData()
  }
  const roundProb=(prob)=>{
    return Math.round(prob*10000)/100
  }
    const findTask=(id)=>{
        console.log(id)
        let item = data.filter(d=>d.taskId ==id)
        return item[0]
      }
    const cutStr = (str)=>{
        if(str.length>=10){
            return str.substring(0,10)+'...'

        }
        return str
    }
    return (
      <>
        <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="7">
                  <h4 id="traffic" className="card-title mb-0">Xác suất hoàn thành công việc</h4>
                  <div className="small text-muted">Updated at : {moment(new Date()).format('DD/MM/YYYY HH:mm:ss').toString()}</div>
                </CCol>
                <CCol sm="5" className="d-none d-md-block">
                  <CButton color="primary" className="float-right" onClick = {updateProb}>
                    <CIcon name="cil-cloud-download"/>{'Update'}
                  </CButton>
                  
                </CCol>
              </CRow>
              <br></br>
              <br></br>
                    <CChartBar
                        datasets={
                        [
                            {
                            barPercentage: 0.6,
                            backgroundColor:"blue",
                            data : probs
                            },
                        ]
                      }  
                      labels={idList}
                      options={{
                         
                          onClick: function(event, activeElements) {
                            let chart = activeElements[0]._chart
                            let activePoints = chart.getElementsAtEventForMode(event, 'point', chart.options);
                            let firstPoint = activePoints[0];
                            let label = chart.data.labels[firstPoint._index];
                            let item = findTask(label)
                            setTask(item)
                            setModal(!modal)
                            // let value = chart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];

                            // alert(label + ": " + value);
                            // console.log('click')
                            // console.log(element)
                            // if(element.length > 0)
                            // {
                            //   console.log('click')
                            //   var ind = element[0]._index;
                            //   alert(ind)
                            // //   var item = findTask(ind+1)
                            // //   console.log(item[0])
                            // //   // alert(item[0].name)
                            // //   setTask(item[0])
                            // //   setModal(!modal)                              
                            // }
                          },
                          title: {
                            display: false,
                            text: 'Xác xuất xảy ra',
                          
                        },
                          legend: {
                            display: false
                          },
                            tooltips: {
                                enabled: true,
                                callbacks: {
                                  title: function(tooltipItem, data) {
                                    var index = data['labels'][tooltipItem[0]['index']];
                                    console.log('index')
                                    console.log(index)
                                    var item = findTask(index)
                                    console.log(item)
                                    return item.name;
                                  },
                                  label: function(tooltipItem, data) {
                                    var index = tooltipItem['index']
                                    var label = "";
                                    var dataset = data['datasets'][0];
                                    var percent =Math.round((dataset['data'][index]*100) )/100
                                    label= '(' +percent  + '%)'
                                    return label;
                                  }}
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero:true
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Xác suất (%)'
                                    },
                                    afterTickToLabelConversion : function(q){
                                        for(var tick in q.ticks){
                                            q.ticks[tick] += ' %';
                                        }
                                    }
                                }],
                                xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Tên hoạt động'
                                    },
                                    afterTickToLabelConversion : function(q){
                                        for(var tick in q.ticks){
                                            var item = findTask(q.ticks[tick])
                                            q.ticks[tick] = cutStr(item.name);
                                        }
                                    }
                                }]
                            },
                        }}
                    />
            </CCardBody>
          </CCard>
      <CModal
          show={modal}
          // onClose={toggle}
          centered = {true}
          size="md"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <CModalHeader closeButton>
            <CCol sm="2" className="m-0 p-0">
              <InfoIcon fontSize="large" style={{ fontSize:25}}></InfoIcon>
            </CCol>
           <CCol sm ="10"  ><h4  id="modal-title">Thông tin hoạt động</h4></CCol>
           </CModalHeader>
          <CModalBody>
         
          <p id="modal-description">
            <span style={{fontStyle:"italic",fontWeight:"bold"}}>Tên:</span> {task.name}
          </p>
          <p id="modal-description">
            <span style={{fontStyle:"italic",fontWeight:"bold"}}>Cha:</span> {task.parents}
          </p>
          <p id="modal-description">
            <span style={{fontStyle:"italic",fontWeight:"bold"}}>Mô tả:</span> {task.description}
          </p>
          <p id="modal-description">
            <span style={{fontStyle:"italic",fontWeight:"bold"}}>Xác suất:</span> {roundProb(task.pertProb)+' %'}
          </p>
          </CModalBody>
          <CModalFooter>
           
            <CButton
              color="danger"
              onClick={toggle}
            >Close</CButton>
          </CModalFooter>
        </CModal>
      </>
    )
}
export default TaskBarChart