import React,{useState} from 'react'
import { Link, useNavigate ,useParams} from 'react-router-dom'
import axios from 'axios';

function Otp() {
    const OTP = useParams
    const [otp,setOtp] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        let end = "^[0-9]{1,6}$"
        const requestData = {
            otp,
        };

        try {
            const response = await axios.post(`/api/users/verify-otp/${OTP}`, requestData);
            console.log(response.data);
            if (response.data.success){
                
                alert(response.data.message);
                
                navigate('/login'); 
            }
            else{
                alert(response.data.message);
                //navigate('/pre-reset-pass')
            }
        
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
        <div style={{marginTop:"5%", marginLeft:"40%"}}>
                <h3>One Time Password Verification</h3>
                <p>You have got the email for OTP verification on provided Gmail account</p>
                <p>Paste 6 digits OTP for verification</p>
                <form action="POST" onSubmit={handleSubmit}>     
                    <div>
                        <label htmlFor="otp"> One Time Password : </label>
                        <input 
                            type="text" 
                            id="otp" 
                            value={otp} 
                            placeholder='Your Email address'
                            onChange={(e) => setOtp(e.target.value)} 
                        required />
                    </div>
                    <button type ="submit">Verify</button> <br />   
                    <button type='submit'>Resend OTP</button>
                </form>
            </div>
        </div>
    )
}

export default Otp
