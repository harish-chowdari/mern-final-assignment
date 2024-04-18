import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./Components/Login/Login.jsx"
import Home from "./Components/Home/Home.jsx"
import EmpList from "./Components/EmpList/EmpList.jsx"
import Dashboard from './Components/Dashboard/Dashboard.jsx'
import EditEmp from './Components/EditEmp/EditEmp.jsx'



const userName = localStorage.getItem("userName")


const App = () => {

  
  return (
    <div>
    

      
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Login/>} /> 
            { userName ? <Route path='/create-employee' element={<Home/>} /> : <Route path='/'/>}
            { userName ? <Route path='/home' element={<Dashboard/>} /> : <Route path='/'/>}
            { userName ? <Route path='/emp' element={<EmpList/>} /> : <Route path='/'/>}
            { userName ? <Route path='/edit/:id' element={<EditEmp/>} /> : <Route path='/'/>}
          </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App