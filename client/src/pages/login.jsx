import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const Login = () => {
  const [uniid, setUniid] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
        uniid,
        password,
    };

    try {
        const response = await axios.post('/api/users/login', requestData,
        {headers :{Authorization :"Bearer"+localStorage.getItem("token")}});
        console.log(response.data);
        if (response.data.success){
            localStorage.setItem('token',response.data.token); 
            alert(response.data.message)
            if(response.data.isStudent){
              navigate('/alldeans');
            }
            else{
              navigate('/fordean');
            }
            
        }
        else{
            alert(response.data.message)
            navigate('/login')
        }
    
    } catch (error) {
        console.error(error);
    }
};
  return (
    <div>
      <div style={{marginTop:"5%", marginLeft:"40%"}}>
        <h3>LOGIN AS DEAN OR STUDENT</h3>
          <form action="POST" onSubmit={handleSubmit}>     
              <div>
                <label htmlFor="uniid"> University ID : </label>
                  <input 
                    type="text" 
                    id="uniid" 
                    value={uniid} 
                    onChange={(e) => setUniid(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="password">Password : </label>
                  <input 
                    type="password" 
                    id="password" 
                    value={password}  
                    onChange={(e) => setPassword(e.target.value)} required />
              </div>
                    
              <button type ="submit">Login</button>              
              <Link to = "/">  Not registered ,register here</Link>
          </form>
      </div>
    </div>
  )
}

export default Login
