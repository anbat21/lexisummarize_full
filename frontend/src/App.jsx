import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Summarize from './pages/Summarize'

export default function App(){
 return(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Summarize/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
  </BrowserRouter>
 )
}
