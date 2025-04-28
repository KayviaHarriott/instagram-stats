import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
// import { TestingPage } from './pages/TestingPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/results" element={<TestingPage />} /> */}
    </Routes>
  )
}

export default App
