import React, {  lazy, useState,useEffect ,useSelector} from 'react'
import PropTypes from 'prop-types'
import { getColor } from '@coreui/utils'
import { CChartBar } from '@coreui/react-chartjs'
import riskService from 'src/services/riskService';
const ChartBarSimple = props => {
  const [data,setData] = useState([]);
    const [probs, setProbs] = useState({});
    const [idList,setIdList] = useState([]);
  const {
    backgroundColor,
    pointHoverBackgroundColor,
    dataPoints,
    label,
    pointed,
    ...attributes
  } = props
  useEffect(()=>{
    fetchData();
  },[])
const fetchData = ()=>{
     riskService.getRisks().then((res)=>{
        setData(res.object)
        let arr = data.map(d=>d.prob*100)
        let ids = data.map(d=>d.riskId)
        setProbs(arr);
        setIdList(ids)
    })
  }
  const defaultDatasets = (()=>{
    riskService.getRisks().then((res)=>{
    setData(res.object)
    let arr = data.map(d=>d.prob*100)
    let ids = data.map(d=>d.riskId)
    setProbs(arr);
    setIdList(ids)
    })
    return [
      {
        data: probs,
        backgroundColor: getColor(backgroundColor),
        pointHoverBackgroundColor: getColor(pointHoverBackgroundColor),
        label: idList,
        barPercentage: 0.5,
        categoryPercentage: 1
      }
    ]
  })()

  const defaultOptions = (()=>{
    return {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    }
  })()

  // render
  return (
    <CChartBar
      {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={label}
    />
  )
}

ChartBarSimple.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  //
  backgroundColor: PropTypes.string,
  pointHoverBackgroundColor: PropTypes.string,
  dataPoints: PropTypes.array,
  label: PropTypes.string,
  pointed: PropTypes.bool
};

ChartBarSimple.defaultProps = {
  backgroundColor: 'rgba(0,0,0,.2)',
  dataPoints: [10, 22, 34, 46, 58, 70, 46, 23, 45, 78, 34, 12],
  label: 'Sales'
};

export default ChartBarSimple
