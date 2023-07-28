import React from 'react'
import { Navigate } from 'react-router-dom'

function DeanProtectRout({children}) {
  if (!JSON.parse(localStorage.getItem("token")).isStudent){
      return (children); 
  }
  else{
    return <Navigate to ="/alldeans"/> 
  }
    
  
}

export default DeanProtectRout
