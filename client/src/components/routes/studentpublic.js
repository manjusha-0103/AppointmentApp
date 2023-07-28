import React from 'react'
import { Navigate } from 'react-router-dom'

function StudentPublicRout({children}) {
  if (JSON.parse(localStorage.getItem("token")).isStudent){
      
      return <Navigate to ="/alldeans"/> 
  }
  else{
    return (children); 
  }
    
  
}

export default StudentPublicRout