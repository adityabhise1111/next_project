"use client"
import React ,{ useState }from 'react'


const RegisterPage = () => {
    const [email, setemail]= useState("a@b.c")
    const [password, setpassword]= useState("")
  return (
    <div>RegisterPage
        <div>{email}</div>
        <div>{password}</div>
        <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} />
        <input type="password" value={password} onChange={(p)=>setpassword(p.target.value)} />
        <button onClick={()=>{console.log("Registering",email,password)}}>Register</button>
        <button onClick={()=>{console.log("Logging in",email,password)}}>Login</button>
    </div>
    
  )
}

export default RegisterPage
