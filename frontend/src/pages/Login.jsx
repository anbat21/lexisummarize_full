
import React,{useState} from 'react'
import { loginAPI } from '../services/api'

export default function Login(){
 const[email,setEmail]=useState('')
 const[pw,setPw]=useState('')
 const[msg,setMsg]=useState('')

 const go=async()=>{
    try{
        const r=await loginAPI(email,pw)
        setMsg(JSON.stringify(r))
    }catch(e){
        setMsg(e.response?.data?.detail || e.message)
    }
 }

 return(<div>
    <h1>Login</h1>
    <input placeholder='email' value={email} onChange={e=>setEmail(e.target.value)}/>
    <input placeholder='password' type='password' value={pw} onChange={e=>setPw(e.target.value)}/>
    <button onClick={go}>Login</button>
    <p>{msg}</p>
 </div>)
}
