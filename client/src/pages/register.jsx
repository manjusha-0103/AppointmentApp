import React ,{ useState } from 'react' 
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom'
const Register = () => {
    const [uniid, setUniid] = useState('');
    const [isStudent, setIsStudent] = useState(false);
    const [isDean, setIsDean] = useState(false);
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestData = {
            uniid,
            isStudent,
            isDean,
            password,
        };

        try {
            const response = await axios.post('/api/users', requestData);
            console.log(response.data);
            if (response.data.success){
                alert(response.data.message)
                navigate('/login')
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
        <div style={{marginTop:"5%",marginLeft:"40%"}}>
            <h3>ReGiStEr HeRe As A StUdEnT oR dEaN</h3>
            <form  onSubmit={handleSubmit} method ='POST'>
                <div>
                    <label htmlFor="uniid">University ID : </label>
                    <input 
                        type="text" 
                        id="uniid" 
                        value={uniid} 
                        onChange={(e) => setUniid(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="isStudent">Are you a student?   </label>
                    <input 
                        type="checkbox" 
                        id="isStudent" 
                        value={true}
                        checked={isStudent === true} 
                        onChange={(e) => setIsStudent(e.target.checked)} />
                </div>
                <div>
                    <label htmlFor="isDean">Are you a dean?     </label>
                    <input 
                        type="checkbox" 
                        id="isDean" 
                        value={true}
                        checked={isDean === true} 
                        onChange={(e) => setIsDean(e.target.checked)} />
                </div>
                <div>
                    <label htmlFor="password">Password : </label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
                <Link to ="/login"> Already registered login here</Link>

            </form>

            
        </div>
    )
}

export default Register
