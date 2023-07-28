import React from 'react'
import { Navigate } from 'react-router-dom'

function StudentProtectRout({children}) {
  if (JSON.parse(localStorage.getItem("token")).isStudent){
      return (children); 
  }
  else{
    return <Navigate to ="/fordean"/> 
  }
    
  
}

export default StudentProtectRout
