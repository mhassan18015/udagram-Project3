import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Header } from './Sections/index'
import { OnWingStatusGE90 } from './Pages/GE90/Index'
import { UnInstalledGE90 } from './Pages/GE90/Index'
import { OnWingStatusCFM567B } from './Pages/CFM56-7B/Index'
import { UnInstalledCFM567B } from './Pages/CFM56-7B/Index'
import { OnWingStatusT700 } from './Pages/T700/Index'
import { UnInstalledT700 } from './Pages/T700/Index'

import { Container } from './components/737AC/index'

const App = () => {
  const [selectedEngine, setSelectedEngine] = useState('CFM567B') // Default to CFM56-7B

  const handleEngineChange = (event) => {
    setSelectedEngine(event.target.value)
  }

  return (
    <>
      <Router>
        <Header />
        <div className='select-container'>
          <select
            value={selectedEngine}
            onChange={handleEngineChange}
            className='engine-select'
          >
            <option value='GE90'>GE90</option>
            <option value='CFM567B'>CFM56-7B</option>
            <option value='T700'>Trent 700</option>
          </select>
        </div>

        <Container>
          <Routes>
            <Route
              path='/'
              element={
                selectedEngine === 'GE90' ? (
                  <OnWingStatusGE90 />
                ) : selectedEngine === 'CFM567B' ? (
                  <OnWingStatusCFM567B />
                ) : (
                  <OnWingStatusT700 /> // Add this line
                )
              }
            />
            <Route
              path='/UnInstalled'
              element={
                selectedEngine === 'GE90' ? (
                  <UnInstalledGE90 />
                ) : selectedEngine === 'CFM567B' ? (
                  <UnInstalledCFM567B />
                ) : (
                  <UnInstalledT700 /> // Add this line
                )
              }
            />
          </Routes>
        </Container>
      </Router>
    </>
  )
}

export default App
