import React from 'react'
import "./header.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
    const handleLogout =async()=>{
        if(localStorage.getItem("token")){
            localStorage.clear("token");
            alert('You have logout successfully..');
            navigate('/login')
        }
        else{
            alert("First logged in with your account")
            navigate("/login")
        }
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


    const homebt = async()=>{
        const t = JSON.parse(localStorage.getItem("token"));
        if(t['isStudent']){
            navigate('/alldeans')
        }
        else if(t['isDean']){
            navigate('/fordean')
        }
        else{
            navigate('/login')
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
