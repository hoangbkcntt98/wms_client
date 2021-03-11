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
import riskService from 'src/services/riskService'

const RiskBarChart = ({data,idList,probs,fetchData}) =>{
  const [risk,setRisk] = useState({})
  const [modal, setModal] = useState(false);
  const toggle = ()=>{
    setModal(!modal);
  }
  const updateProb = ()=>{
    riskService.calcProb()
    fetchData()
  }
  const roundProb=(prob)=>{
    return Math.round(prob*10000)/100
  }
    const findRisk=(id)=>{
        return data.filter(d=>d.id ==id)
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
                  <h4 id="traffic" className="card-title mb-0">Xác suất xảy ra rủi ro</h4>
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
                          // barThickness: 6,
                          // maxBarThickness: 8,
                          // minBarLength: 2,
                          backgroundColor:"blue",
                          data : probs
                        },
                      
                      ]
                      }  
                      labels={idList}
                      options={{
                         
                          onClick: function(evt, element) {
                            console.log(element)
                            if(element.length > 0)
                            {
                              console.log('click')
                              var ind = element[0]._index;
                              var item = findRisk(ind+1)
                              console.log(item[0])
                              // alert(item[0].name)
                              setRisk(item[0])
                              setModal(!modal)
                             
                              // console.log(openInfo)
                              // console.log(modal)
                            //   console.log(openInfo)
                              // if(confirm('Do you want to remove this point?')){
                              //   data.datasets[0].data.splice(ind, 1);
                              //   data.labels.splice(ind, 1);
                              //   myLineChart.update(data);
                              //   }
                              
                              }
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
                                    var item = findRisk(index)
                                    return item[0].name;
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
                                        labelString: 'Probability (%)'
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
                                        labelString: 'Risk Name'
                                    },
                                    afterTickToLabelConversion : function(q){
                                        for(var tick in q.ticks){
                                            var item = findRisk(q.ticks[tick])
                                            q.ticks[tick] = cutStr(item[0].name);
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
          size="sm"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <CModalHeader closeButton>

            <CCol sm="2" className="m-0 p-0">
              <InfoIcon fontSize="large" style={{ fontSize:25}}></InfoIcon>
            </CCol>
          
           <CCol sm ="10"  ><h4  id="modal-title">Thông tin rủi ro</h4></CCol>

          
           </CModalHeader>
          <CModalBody>
         
          <p id="modal-description">
            <span style={{fontStyle:"italic",fontWeight:"bold"}}>Tên:</span> {risk.name}
          </p>
          <p id="modal-description">
            <span style={{fontStyle:"italic",fontWeight:"bold"}}>Cha:</span> {risk.parents}
          </p>
          <p id="modal-description">
            <span style={{fontStyle:"italic",fontWeight:"bold"}}>Mô tả:</span> {risk.description}
          </p>
          <p id="modal-description">
            <span style={{fontStyle:"italic",fontWeight:"bold"}}>Xác suất:</span> {roundProb(risk.prob)+' %'}
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
export default RiskBarChart