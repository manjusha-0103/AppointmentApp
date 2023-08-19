import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function PrePageResetPass() {
    
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const requestData = {
            email,
        };

        try {
            const response = await axios.post('/api/users/pre-reset-pass', requestData);
            console.log(response.data);
            if (response.data.success){
                
                alert(response.data.message);
                
                navigate('/login'); 
            }
            else{
                navigate('/')
            }
        
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div style={{marginTop:"5%", marginLeft:"40%"}}>
            <h3>Add Email of an account of which password you want to change</h3>
            <p>You will get the email for changing the password on provided Gmail account</p>
            <form action="POST" onSubmit={handleSubmit}>     
                <div>
                    <label htmlFor="email"> Email : </label>
                    <input 
                        type="text" 
                        id="email" 
                        value={email} 
                        placeholder='Your Email address'
                        onChange={(e) => setEmail(e.target.value)} 
                    required />
                </div>
                <button type ="submit">Reset</button> <br />   
                <Link to = "/login"style={{color: "black",}}>  Go for Login OR </Link><br />
                <Link to = "/"style={{color: "black",}}>  Registered Yourself....</Link>
            </form>
        </div>
    )
}

export default PrePageResetPass
