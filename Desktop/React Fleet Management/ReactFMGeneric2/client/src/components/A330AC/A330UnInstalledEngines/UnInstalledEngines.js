import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../EngineData.css'
// import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
// import Button from 'react-bootstrap/Button'
// import ButtonGroup from 'react-bootstrap/ButtonGroup'

const UnInstalledEngines = () => {
  const [engineData, setEngineData] = useState([])
  // const [sortedData, setSortedData] = useState([])
  // const [sortType, setSortType] = useState('none')
  // const [sortDirection, setSortDirection] = useState('asc')
  useEffect(() => {
    axios
      .get('https://fleetmanagement-api.onrender.com/engine-UninstalledT700/')
      .then((response) => {
        setEngineData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className='engine-data-container'>
      <h1>UnInstalled Engine Data</h1>
      <table>
        <thead>
          <tr>
            <th>Eng</th>
            <th>AC</th>
            <th>POS</th>
            <th>AC_Eng_Pos</th>
            <th>TSN</th>
            <th>CSN</th>
            <th>TSO</th>
            <th>CSO</th>
            <th>Status</th>
            <th>Last_SV_Date</th>
            <th>T_at_LSV</th>
            <th>C_at_LSV</th>
            <th>Shop_Visit1_Date</th>
            <th>SV1_TSN</th>
            <th>SV1_CSN</th>
            <th>Shop_Visit2_Date</th>
            <th>SV2_TSN</th>
            <th>SV2_CSN</th>
            <th>Shop_Visit3_Date</th>
            <th>SV3_TSN</th>
            <th>SV3_CSN</th>
          </tr>
        </thead>
        <tbody>
          {engineData.map((data, index) => (
            <tr key={index}>
              <td>{data.Eng}</td>
              <td>{data.AC}</td>
              <td>{data.POS}</td>
              <td>{data.AC_Eng_Pos}</td>
              <td>{data.TSN}</td>
              <td>{data.CSN}</td>
              <td>{data.TSO}</td>
              <td>{data.CSO}</td>
              <td>{data.Status}</td>
              <td>{data.engine_svT700.L_SV_DATE}</td>
              <td>{data.engine_svT700.T_at_LSV}</td>
              <td>{data.engine_svT700.C_at_LSV}</td>
              <td>{data.engine_svT700.SV1_Date}</td>
              <td>{data.engine_svT700.SV1_CSN}</td>
              <td>{data.engine_svT700.SV1_TSN}</td>
              <td>{data.engine_svT700.SV2_Date}</td>
              <td>{data.engine_svT700.SV2_TSN}</td>
              <td>{data.engine_svT700.SV2_CSN}</td>
              <td>{data.engine_svT700.SV3_Date}</td>
              <td>{data.engine_svT700.SV3_TSN}</td>
              <td>{data.engine_svT700.SV3_CSN}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default UnInstalledEngines
