import React,{useState} from 'react'
import { Link, useNavigate ,useParams} from 'react-router-dom'
import axios from 'axios';
function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  const {otp} = useParams()
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const requestData = {
        email,
        cpassword,
    };

    try {
        const response = await axios.post(`/api/users/reset-pass/${otp}+link=hxh`, requestData);
        console.log(response.data);
        if (response.data.success){
            
            alert(response.data.message);
            
            navigate('/login'); 
        }
        else{
            alert(response.data.message)
            navigate('/')
        }
    
    } catch (error) {
        console.error(error);
    }
};



  return (
    
    <div style={{marginTop:"5%", marginLeft:"40%"}}>
      <h3>LOGIN AS DEAN OR STUDENT</h3>
        <form action="POST" onSubmit={handleSubmit}>     
            <div>
              <label htmlFor="email"> Email : </label>
                <input 
                  type="text" 
                  id="email" 
                  value={email} 
                  placeholder='Your Email address'
                  onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="password"> New Password : </label>
                  <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    placeholder='New Password' 
                    onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <div>
                <label htmlFor="cpassword">Confirm Password : </label>
                  <input 
                    type="password" 
                    id="cpassword" 
                    value={cpassword}  
                    placeholder='Confirm Password'
                    onChange={(e) => setCPassword(e.target.value)} required />
              </div>
                    
              <button type ="submit">Reset</button> <br />   
              <Link to = "/login"style={{color: "black",}}>  Go for Login OR </Link><br />
              <Link to = "/"style={{color: "black",}}>  Registered Yourself....</Link>
          </form>
    </div>
  ) 
}

export default ResetPassword
