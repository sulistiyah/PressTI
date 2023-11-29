import React from 'react'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/login_component'
import Home from './components/home_omponent'
import Sidebar from './components/sidebar_component'
import ProgramStudi from './components/program_studi_component'
import Kelas from './components/kelas_component'
import MataKuliah from './components/mata_kuliah_component'


function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
      <div className='d-flex'>
          <div className='col-auto'>
            <Routes>
              <Route path='/home' element={ <Home/> } />
              <Route path='/sidebar' element={ <Sidebar/> } />
              <Route path='/program_studi' element = { <ProgramStudi/> } />
              <Route path='/kelas' element = { <Kelas/> } />
              <Route path='/mata_kuliah' element = { <MataKuliah/> } />
              
            </Routes>
          </div>
      </div>
      
    </Router>
  )
}
export default App
