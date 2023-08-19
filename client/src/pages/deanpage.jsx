import React, { useEffect } from 'react'
import './deanpage.css';

import { useState } from 'react';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
import moment from 'moment';

const Card = ({props})=>{
  //const params = useParams()
  const [date,setDate] = useState({})
  const navigate = useNavigate()

  const minDate = () => {
    const today = new Date().toISOString().split('T')[0];
    return today;
  };

  const handleDateChange = (event) => {
    const chosenDate = new Date(event.target.value);
    const dayOfWeek = chosenDate.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // If a weekend day is selected, don't update the state
      alert('Weekend days are not allowed. Please choose a weekday.');
    } else {
      setDate(event.target.value);
    }
  };

  const bookAppointment = async()=>{
    const token = JSON.parse(localStorage.getItem('token'));
    //console.log(date)
    const requestData ={
            user_mail : token.email,
            dean_mail : props.email,
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
      //console.log(res.data)
      if(res.data.success){
        
        alert(res.data.message);
        navigate('/your-appointment');

      }
      else{
        alert(res.data.message);
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
            <p>Monday to Friday</p>
            <p>Time : 10 AM to 11 AM</p>
          </div>
          <form  onSubmit={bookAppointment} >
            <div className='date'>
              <input 
                type="date"
                min = {minDate()} 
                onChange={handleDateChange}
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
        <p><Link to ='/your-appointment'>Your Appointments</Link></p>
      </div>
      <div className='main-content'>
        {deans && deans.map((dean,idx) => (<Card key={idx}props={dean} />))}
      </div>
    </div>
  )
}

export default AllDeanpage
