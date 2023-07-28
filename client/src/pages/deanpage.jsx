import React, { useEffect } from 'react'
import './deanpage.css';

import { useState } from 'react';
import axios from 'axios';
import {Link,useParams,useNavigate} from 'react-router-dom';
import moment from 'moment';

const Card = ({props})=>{
  //const params = useParams()
  const [date,setDate] = useState({})
  const navigate = useNavigate()
  
  const bookAppointment = async()=>{
    const token = JSON.parse(localStorage.getItem('token'));
    //console.log(date)
    const requestData ={
                 dean : props.uniid,
      appointmentDate : date,
                 user : token.uniid,
    }
    
    try{
      const res = await axios.post('/api/users/alldeans',
        requestData,
        
        {headers :{
          Authorization:`Bearer ${token['token']}`,
        }}
        );
      console.log(res.data)
      if(res.data.success){
        
        alert("Appointment is booked successfully")
        //navigate('/alldeans/');

      }
      else{
        alert("Appointment is not available")
        //navigate('/alldeans/')
      }
    }
    catch(error){
      console.log(error);
    }
  }
  return(
    <>
        <div className='card'>
          <h2 className='uId'>Dean's University ID : {props.uniid}</h2>
          <h3 className='avt'>Available Time : </h3>
          <div className='time'>
            <p>Every Week,</p>
            <p>Thursday and Friday : 10 AM to 11 AM</p>
          </div>
          <form  onSubmit={bookAppointment} >
            <div className='date'>
              <input type="date" 
              onChange={(e) => setDate(e.target.value)}
              />
            </div >
            <button type = 'submit'className='book'>Book Appointmnet</button>
            
          </form>
          
        </div>
    </>
  )
}

const AllDeanpage = () => {
  const [deans,setDeans] = useState()

  const getDeanData = async()=>{
  const token = JSON.parse(localStorage.getItem('token'));
  //console.log(token)
    
    
    try{
      const res = await axios.get('/api/users/alldeans',{
        headers: {
          Authorization: `Bearer ${token['token']}`,
        },
      });
      if (res.data.success){
        //console.log(res.data.data);
        setDeans(res.data.data);
      }

    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getDeanData();
  },[])

  return (
    <div>
      <div className='your'>
        <Link to ='/your-appointment'><p>Your Appointments</p></Link>
      </div>
      <div className='main-content'>
        {deans && deans.map((dean,idx) => (<Card key={idx}props={dean} />))}
      </div>
    </div>
  )
}

export default AllDeanpage
