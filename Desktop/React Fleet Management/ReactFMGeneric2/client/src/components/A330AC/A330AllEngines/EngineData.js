import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../EngineData.css'

const EngineData = () => {
  const [engineData, setEngineData] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/engine-data')
      .then((response) => {
        setEngineData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className='engine-data-container'>
      <h1>Engine Data</h1>
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
            <th>Instal_Date</th>
            <th>TSI</th>
            <th>CSI</th>
            <th>Status</th>
            <th>SV1_Date</th>
            <th>SV1_TSN</th>
            <th>SV1_CSN</th>
            <th>SV2_Date</th>
            <th>SV2_TSN</th>
            <th>SV2_CSN</th>
            <th>SV3_Date</th>
            <th>SV3_TSN</th>
            <th>SV3_CSN</th>
            <th>L_SV_DATE</th>
            <th>T_at_LSV</th>
            <th>C_at_LSV</th>
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
              <td>{data.Instal_Date}</td>
              <td>{data.TSI}</td>
              <td>{data.CSI}</td>
              <td>{data.Status}</td>
              <td>{data.engine_sv.SV1_Date}</td>
              <td>{data.engine_sv.SV1_CSN}</td>
              <td>{data.engine_sv.SV1_TSN}</td>
              <td>{data.engine_sv.SV2_Date}</td>
              <td>{data.engine_sv.SV2_TSN}</td>
              <td>{data.engine_sv.SV2_CSN}</td>
              <td>{data.engine_sv.SV3_Date}</td>
              <td>{data.engine_sv.SV3_TSN}</td>
              <td>{data.engine_sv.SV3_CSN}</td>
              <td>{data.engine_sv.L_SV_DATE}</td>
              <td>{data.engine_sv.T_at_LSV}</td>
              <td>{data.engine_sv.C_at_LSV}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EngineData
