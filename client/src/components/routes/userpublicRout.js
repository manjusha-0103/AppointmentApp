import React from 'react'
import { Navigate } from 'react-router-dom'

function UserPublicRout({children}) {
  if (localStorage.getItem("token")){
    if(JSON.parse(localStorage.getItem("token")).isStudent){
      return <Navigate to ='/alldeans'/>    
    }
    else{
      return <Navigate to ='/fordean/'/>   
    }
  } 
  else{
    return  (children)
  }
    
  
}

export default UserPublicRout