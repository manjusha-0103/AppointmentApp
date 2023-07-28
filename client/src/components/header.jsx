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
    const t = JSON.parse(localStorage.getItem("token"));
    const handleLogoutbt=async()=>{
        if(t){
            return true
        }
        else {
            return false
        }
    }


    const homebt = async()=>{
        if(t['isStudent']){
            navigate('/alldeans')
        }
        else{
            navigate('/fordean')
        }
    }

    return (
        <div>    
            <div className='layout'>
            {handleLogoutbt &&
                <button className='home-bt'
                onClick={()=>homebt()}>Home</button>
            }
            
            <h2 className='app-heading'>Apppointment App</h2>
            {handleLogoutbt &&
                <button className="logout-bt"onClick ={handleLogout}>Logout</button>  
            }
            </div>
        </div>
    )
}

export default Header
