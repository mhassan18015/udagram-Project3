import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import './AcStatus.css'
const AcStatus = ({ onAcEngPosCount }) => {
  const [acStatusData, setAcStatusData] = useState([])
  const [sortOrder, setSortOrder] = useState({ key: 'AcEngPos', asc: true })
  const [lastInputData, setLastInputData] = useState(
    JSON.parse(localStorage.getItem('lastInputData')) || {}
  )

  useEffect(() => {
    axios
      .get('https://fleetmanagement-api.onrender.com/AcStatus')
      .then((response) => {
        // console.log(response.data) // Check the structure and values of response data
        setAcStatusData(response.data)
      })
      .catch((error) => {
        // console.log(error)
      })
  }, [])

  useEffect(() => {
    // Set lastInputData to a minimum value of 11000 for CSN < 11000
    const updatedData = { ...lastInputData }
    acStatusData.forEach((item) => {
      if (item.CSN < 11000) {
        updatedData[item.AcEngPos] = 11000
      } else if (updatedData[item.AcEngPos] === undefined) {
        // Initialize expected core life if not already present
        updatedData[item.AcEngPos] = parseInt(item.ExpectedCoreLife)
      }
    })

    // Only update lastInputData if it's not already initialized
    if (Object.keys(lastInputData).length === 0) {
      setLastInputData(updatedData)
    }

    // Save the updated lastInputData to local storage
    localStorage.setItem('lastInputData', JSON.stringify(updatedData))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acStatusData])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('lastInputData'))

    if (!storedData || Object.keys(storedData).length === 0) {
      // Initialize lastInputData with a default value of 11000 for CSN < 11000
      const updatedData = {}
      acStatusData.forEach((item) => {
        if (item.CSN < 11000) {
          updatedData[item.AcEngPos] = 11000
        }
      })
      setLastInputData(updatedData)
    } else {
      // Convert stored values to numbers before setting lastInputData
      const parsedData = {}
      Object.keys(storedData).forEach((key) => {
        parsedData[key] = parseFloat(storedData[key])
      })
      setLastInputData(parsedData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log('acStatusData:', acStatusData) // Check the acStatusData array
    const acEngPosCount = Array.from(
      new Set(acStatusData.map((item) => item.AcEngPos))
    ).length
    console.log('acEngPosCount:', acEngPosCount) // Check the calculated count
    onAcEngPosCount(acEngPosCount)
  }, [acStatusData, onAcEngPosCount])
  const handleSort = (key) => {
    let sortedData = [...acStatusData]
    let asc = sortOrder.key === key ? !sortOrder.asc : true

    sortedData.sort((a, b) => {
      if (key === 'MinimumValue') {
        // Calculate the MinimumValue for each item in the sortedData
        const aMinimumValue = calculatedValues(a).MinimumValue
        const bMinimumValue = calculatedValues(b).MinimumValue

        // Check for "Invalid Date" values and move them to the end
        if (
          aMinimumValue === 'Invalid Date' &&
          bMinimumValue !== 'Invalid Date'
        ) {
          return 1
        } else if (
          aMinimumValue !== 'Invalid Date' &&
          bMinimumValue === 'Invalid Date'
        ) {
          return -1
        } else if (
          aMinimumValue === 'Invalid Date' &&
          bMinimumValue === 'Invalid Date'
        ) {
          return 0
        } else {
          // Compare valid dates
          return (
            (new Date(aMinimumValue).getTime() -
              new Date(bMinimumValue).getTime()) *
            (asc ? 1 : -1)
          )
        }
      } else if (key === 'EGTM') {
        // Special sorting for EGTM field (treat it as a number)
        const aEGTM = parseInt(a.EGTMs[0]?.EGTM || 0)
        const bEGTM = parseInt(b.EGTMs[0]?.EGTM || 0)
        return (aEGTM - bEGTM) * (asc ? -1 : 1) // Invert the sorting for descending order
      } else {
        // For other keys, handle sorting based on numeric or string values
        if (typeof a[key] === 'number' && typeof b[key] === 'number') {
          return (a[key] - b[key]) * (asc ? 1 : -1)
        } else {
          // Convert the string values to lowercase before sorting to make it case-insensitive
          const lowerCaseA = String(a[key]).toLowerCase()
          const lowerCaseB = String(b[key]).toLowerCase()
          return lowerCaseA.localeCompare(lowerCaseB) * (asc ? 1 : -1)
        }
      }
    })

    setSortOrder({ key, asc })
    setAcStatusData(sortedData)
  }

  // Array of sort keys in the desired order of priority
  const sortKeys = [
    'AcEngPos',
    'Status',
    'Eng',
    'AC',
    'Inst_Date',

    'CSN',

    'CSO',

    'EGTM',

    'MinimumValue',
  ]

  // let CSOcalculated
  const calculatedValues = (item) => {
    const lastInputValueExpectedCoreLife = lastInputData[item.AcEngPos] || ''
    // const CSOcalculated = item?.CSO - item.engine_sv?.C_at_LSV
    const DataDate = item.General?.DataDate
    const Date_Of_Validity = DataDate ? new Date(DataDate) : null // Creating Date object if DataDate is defined, else assigning null
    console.log(DataDate, Date_Of_Validity)
    const Average_CyclePerDay = item.rotableutilization?.AverCycPerDay
    const numberOfDaysToAdd =
      (lastInputValueExpectedCoreLife -
        (item?.CSN - item.engine_sv?.C_at_LSV)) /
      Average_CyclePerDay
    const Expected_Removal_Date_Core_Unformated = new Date(
      Date_Of_Validity.getTime() + numberOfDaysToAdd * 24 * 60 * 60 * 1000
    )

    const Expected_Removal_Date_Core =
      Expected_Removal_Date_Core_Unformated.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    // Clculation of LLP Removal Date
    const numberOfDaysToAddLLP = item.remaining?.Togo / Average_CyclePerDay
    // (item.LLPs[0]?.CycleLimit - item?.CSN) / Average_CyclePerDay

    const Expected_Removal_Date_LLP_Unformated = new Date(
      Date_Of_Validity.getTime() + numberOfDaysToAddLLP * 24 * 60 * 60 * 1000
    )
    // console.log(
    //   'Expected_Removal_Date_LLP_Unformated:',
    //   Expected_Removal_Date_LLP_Unformated
    // )
    const Expected_Removal_Date_LLP =
      Expected_Removal_Date_LLP_Unformated.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    // Calculate EGTM Removal Date
    let numberOfDaysToAddEGTM
    if (item?.CSO > 1000) {
      numberOfDaysToAddEGTM =
        ((item.EGTMs[0]?.EGTM / 1.2) * 200) / Average_CyclePerDay
    } else {
      numberOfDaysToAddEGTM =
        ((item.EGTMs[0]?.EGTM / 2.4) * 200) / Average_CyclePerDay
    }

    // Calculate Expected_Removal_Date_EGTM_Unformated in UTC
    const Expected_Removal_Date_EGTM_Unformated = new Date(
      Date.UTC(
        Date_Of_Validity.getUTCFullYear(),
        Date_Of_Validity.getUTCMonth(),
        Date_Of_Validity.getUTCDate(),
        0, // Set hours to 0
        0, // Set minutes to 0
        0, // Set seconds to 0
        0 // Set milliseconds to 0
      ) +
        numberOfDaysToAddEGTM * 24 * 60 * 60 * 1000
    )

    const Expected_Removal_Date_EGTM =
      Expected_Removal_Date_EGTM_Unformated.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    let minDateParameter = null // Initialize with null
    let minValue = Infinity // Initialize with a large value

    // Check if the CoreValue has the minimum date
    if (new Date(Expected_Removal_Date_Core_Unformated).getTime() < minValue) {
      minDateParameter = 'Core'
      minValue = new Date(Expected_Removal_Date_Core_Unformated).getTime()
    }

    // Check if the LLPValue has the minimum date
    if (new Date(Expected_Removal_Date_LLP_Unformated).getTime() < minValue) {
      minDateParameter = 'LLP'
      minValue = new Date(Expected_Removal_Date_LLP_Unformated).getTime()
    }

    // Check if the EGTMValue has the minimum date
    if (new Date(Expected_Removal_Date_EGTM_Unformated).getTime() < minValue) {
      minDateParameter = 'EGTM'
      minValue = new Date(Expected_Removal_Date_EGTM_Unformated).getTime()
    }

    // Return the result along with the parameter causing the minimum date
    return {
      CoreValue: Expected_Removal_Date_Core || 0,
      LLPValue: Expected_Removal_Date_LLP || 0,
      EGTMValue: Expected_Removal_Date_EGTM || 0,
      MinimumValue: new Date(minValue).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      MinimumDateParameter: minDateParameter, // Adding the parameter causing the minimum date
    }
  }
  return (
    <div>
      <ButtonGroup className='mb-2'>
        {/* Loop through the sortKeys array to render the sorting buttons */}
        {sortKeys.map((key) => (
          <Button key={key} variant='primary' onClick={() => handleSort(key)}>
            Sort by {key}
          </Button>
        ))}
      </ButtonGroup>

      <div className='table-container'>
        <Table striped bordered hover>
          {/* <div className='table-body-container'> */}
          <thead>
            <tr>
              <th>Ac Eng Pos</th>
              <th>Eng Status</th>
              <th>Eng</th>
              <th>AC</th>
              <th>Install__Date</th>
              <th>TSN</th>
              <th>CSN</th>
              <th>C_at_LSV</th>
              <th>TSO</th>
              <th>CSO</th>
              <th>CSOcalculted</th>
              {/* <th>TSI</th>
              <th>CSI</th> */}
              <th>EGTM</th>
              <th>AVG C/Day</th>
              <th>Remaining Cycles Calc</th>
              <th>Remaining Cycles A</th>
              <th>Cycle Limit Removal</th>
              <th>Affected LLP Part</th>
              <th>Expected Core Life</th>
              <th>Removal (CoreLife)</th>
              <th>Removal (LLPValue)</th>
              <th>Removal (EGTMValue)</th>
              <th>Removal (Min Rmovl Date)</th>
              <th>Removal Key</th>
            </tr>
          </thead>

          <tbody>
            {acStatusData.map((item, index) => {
              // console.log(
              //   'MinimumValue for item',
              //   item.AcEngPos,
              //   ':',
              //   item.MinimumValue
              // ) // Add this line
              if (item.Status === 'Installed') {
                const lastInputValueExpectedCoreLife =
                  lastInputData[item.AcEngPos]
                const CoreValue = calculatedValues(item).CoreValue
                const LLPValue = calculatedValues(item).LLPValue
                const EGTMValue = calculatedValues(item).EGTMValue
                const MinimumValue = calculatedValues(item).MinimumValue
                const RemovalKey = calculatedValues(item).MinimumDateParameter // Adding the parameter causing the minimum date
                const isValidDate = !isNaN(new Date(MinimumValue))
                const rowClass = isValidDate ? '' : 'invalid-date-row' // Add the class name if the date is invalid
                return (
                  <tr key={index} className={rowClass}>
                    <td>{item.AcEngPos}</td>
                    <td>{item.Status}</td>
                    <td>
                      <a
                        href={`https://fleetmanagement-api.onrender.com/engine-data/bySN/${item.Eng}`} //
                        target='_blank' // Optional: Opens the link in a new tab
                        rel='noopener noreferrer' // Recommended when using target="_blank"
                      >
                        {item.Eng}
                      </a>
                    </td>
                    <td>{item.AC ? item.AC : '-'}</td>
                    {/* <td>{item.Inst_Date ? item.Inst_Date : '-'}</td> */}
                    <td>
                      {item.Inst_Date
                        ? new Date(item.Inst_Date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : '-'}
                    </td>

                    <td>{item.TSN ? item.TSN : '-'}</td>
                    <td>{item.CSN ? item.CSN : '-'}</td>
                    {/* <td>{item.engine_sv?.T_at_LSV || '-'}</td> */}
                    <td>{item.engine_sv?.C_at_LSV || '-'}</td>
                    <td>{item?.TSO || '-'}</td>
                    <td>{item?.CSO || '-'}</td>
                    <td>{item?.CSN - item.engine_sv?.C_at_LSV}</td>
                    {/* <td>{item?.TSI || '-'}</td>
                    <td>{item?.CSI || '-'}</td> */}
                    <td>{item.EGTMs[0] ? item.EGTMs[0].EGTM : '-'}</td>
                    <td>{item.rotableutilization?.AverCycPerDay || '-'}</td>
                    <td>{item.LLPs[0]?.CycleLimit - item?.CSN || '-'}</td>
                    <td>{item.remaining?.Togo || '-'}</td>
                    {/* <td>{item.LLPs[0]?.CRemainingCalc || '-'}</td> */}
                    <td>{item.LLPs[0]?.CycleLimit || '-'}</td>
                    {/* <td>{item.LLPs[0]?.Description || '-'}</td> */}
                    <td>
                      <a
                        href={`https://fleetmanagement-api.onrender.com/llp/byEng/${item.Eng}`} //
                        target='_blank' // Optional: Opens the link in a new tab
                        rel='noopener noreferrer' // Recommended when using target="_blank"
                      >
                        {item.LLPs[0]?.Description}
                      </a>
                    </td>
                    <td>
                      <input
                        type='number'
                        value={lastInputValueExpectedCoreLife}
                        onChange={(event) =>
                          setLastInputData((prevData) => ({
                            ...prevData,
                            [item.AcEngPos]: event.target.value,
                          }))
                        }
                        size='3' // Adjust the size value as per your requirements
                      />
                    </td>

                    <td>{CoreValue}</td>
                    <td>{LLPValue}</td>
                    <td>{EGTMValue}</td>
                    <td>{MinimumValue}</td>
                    <td>{RemovalKey}</td>
                  </tr>
                )
              }
              return null // Skip rendering rows with other statuses
            })}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default AcStatus
