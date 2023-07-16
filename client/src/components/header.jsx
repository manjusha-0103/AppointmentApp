import React from 'react'
import "./header.css";
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate()
    const handleLogout =async()=>{
        localStorage.clear("token");
        alert('You have logout successfully..');
        navigate('/login')
    }
    const handleLogoutbt=async()=>{
        const t = localStorage.getItem("token");
        
        if(t){
            return true
        }
        else {
            return false
        }
    }

    return (
        <div>    
            <div className='layout'>
            {handleLogoutbt?
                <button className='home-bt'
                >Home</button>
            
            :<></>
                
            }
            <h2 className='app-heading'>Apppointment App</h2>
            {handleLogoutbt?
                <button className="logout-bt"onClick ={handleLogout}>Logout</button>
                
                :<></>
            }
            </div>
        </div>
    )
}

export default Header
