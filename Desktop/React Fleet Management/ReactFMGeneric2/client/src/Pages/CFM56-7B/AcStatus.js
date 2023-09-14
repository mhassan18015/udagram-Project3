import React, { useState } from 'react'
import { AcStatus } from '../../components/737AC/index'
import './AcStatus.css'
const OnWingStatusCFM567B = () => {
  const [acEngPosCount, setAcEngPosCount] = useState(0)

  const handleAcEngPosCount = (count) => {
    setAcEngPosCount(count)
  }
  return (
    <>
      <div className='flex-container'>
        <h1 className='heading-margin'>CFM56-7B Fleet</h1>
        <p className='inline-text'>Total AC Eng Pos:</p>
        <p className='inline-text'>{acEngPosCount}</p>
        {/* Pass the handleAcEngPosCount function as a prop */}
      </div>
      <AcStatus onAcEngPosCount={handleAcEngPosCount} />
      {/* Display the count */}
      {/* <p>Total AC Eng Pos: {acEngPosCount}</p> */}
      {/* <AcStatus /> */}
    </>
  )
}

export default OnWingStatusCFM567B
