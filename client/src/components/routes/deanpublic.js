import React from 'react'
import { Navigate } from 'react-router-dom'

function DeanPublicRout({children}) {
  if (!JSON.parse(localStorage.getItem("token")).isStudent){
      
      return <Navigate to ="/fordean"/> 
  }
  else{
    return (children); 
  }
    
  
}

export default DeanPublicRout