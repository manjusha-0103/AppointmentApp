import React from 'react'
import { Navigate } from 'react-router-dom'

function UserPublicRout({children}) {
  if (localStorage.getItem("token")){
    return <Navigate to ='/alldeans'/>
  }
  else{
    return  (children)
  }
    
  
}

export default UserPublicRout