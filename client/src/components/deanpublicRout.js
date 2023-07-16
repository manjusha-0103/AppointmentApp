import React from 'react'
import { Navigate } from 'react-router-dom'

function DeanPublicRout({children}) {
  if (localStorage.getItem("token")){
    return <Navigate to ="/fordean"/>

  }
  else{
    return  (children);
  }
  
    
  
}

export default DeanPublicRout