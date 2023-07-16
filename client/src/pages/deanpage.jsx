import React, { useEffect } from 'react'
import './deanpage.css';
import { useState } from 'react';
import axios from 'axios';

const Card = ({props})=>{
  return(
    <>
        <div className='card'>
          <h2 className='uId'>Dean's University ID : {props.uniid}</h2>
          <h3 className='avt'>Available Time : </h3>
          <div className='time'>
            <p>Every Week,</p>
            <p>Thursday and Friday : 10 AM to 11 AM</p>
          </div>
          <div>
            <div className='date'>
              <input type="date" />
            </div >
          </div>
          <button className='book'>Book Appointmnet</button>
        </div>
    </>
  )
}

const AllDeanpage = () => {
  const [deans,setDeans] = useState([])

  const getDeanData = async()=>{
    const token = localStorage.getItem('token');
    //console.log(token);
    try{
      const res = await axios.get('/api/users/alldeans',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success){
        console.log(res.data.data);
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
      <div className='main-content'>
        {deans && deans.map((dean)=><Card key ={dean} props = {{dean}}/>)}
      </div>
    </div>
  )
}

export default AllDeanpage
