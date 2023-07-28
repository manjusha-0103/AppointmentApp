import React,{ useState,useEffect } from 'react'
import moment from 'moment';
import axios from 'axios';
import './yourbooking.css'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import './yourbooking.css';


const ForAppointment =(props)=>{
  //console.log(props.props.dean);
  const [open,setOpen] = useState(true)

  const cancelAppointmnet =async()=>{
      const token = JSON.parse(localStorage.getItem('token'));
      const reqdata = {
        _id: props.props._id,
      }
      console.log(props.props._id)
      const res = await axios.post('/api/users/fordean/cancelappointment',
      reqdata,
      {headers :
        {
          Authorization:`Bearer ${token['token']}`,
        }
      });

      if(res.data.success){
        alert('Appointmnet is successfully deletd')
      }
      else{
        alert('Something went wrong')
      }
  }
  const changeStatus =async()=>{
    const token = JSON.parse(localStorage.getItem('token'));
    
    const reqdata = {
      _id: props.props._id
    }
    const res = await axios.put('/api/users/fordean/changestatus',
    reqdata,
    {headers :
      {
        Authorization:`Bearer ${token['token']}`,
      }
    })
    if(res.data.success){
      alert('Appointmnet is successfully done')
    }
    else{
      alert('Something went wrong')
    }
  }


  return(
    <>
      <div className ='booking' onClick={()=>setOpen(!open)}>
        Appointment with {props.props.user}
        <div style={{marginLeft : '73%'}}>
          <ArrowCircleDownIcon sx={{fontSize:'2rem'}}/>
        </div>
        
      </div>
          {!open &&
            <div className='details'>
              <div>
                <h2>Your Appointmment is with {props.props.user}</h2>
                <h3>Date : {moment(props.props.appointmentDate).format("DD-MM-YYYY")}</h3>
                <p>Time : 10AM to 11AM</p>
                <button onClick={changeStatus}className='donebt'>SET DONE</button>
                <button onClick={cancelAppointmnet} className='cancelbt'>Cancel Appointmnet</button>
              </div>
            </div>
          }
    </>
  )
}


const Fordean = () => {
  const [pendings,setAppointment] = useState([]);
  const [ispendings,setIspendings] = useState(true);
  
  const getAppointmnet = async()=>{
    const token = JSON.parse(localStorage.getItem('token'));
    //console.log(token)
      
      const reqdata = {
        data : token
      }
      try{
       
        const res = await axios.post('/api/users/fordean/',
        reqdata,
        {
          headers: {
            Authorization: `Bearer ${token['token']}`,
          },
        });
        if (res.data.success){
          console.log(res.data.data);
          setIspendings(true)
          //console.log(setIspendings.ispendings)
          setAppointment(res.data.data);
        }
        else{
          setAppointment(res.data.data);
          setIspendings(false);
          //console.log(setIspendings.ispendings)
        }

      }
      catch(error){
        console.log(error)
      }
  }
  useEffect(()=>{
    getAppointmnet();
  },[])

  return (
    <div className='main-ct'>
      <h1>YOUR PENDING APPOINTMENT</h1>
      {ispendings?(
        <>
          {pendings && pendings.map((pending,idx) => (<ForAppointment key={idx} props = {pending}/>))}
        </>):(
          <div>
            <h3>You don't have any pending appointmnet</h3>
          </div>

        )
        
      } 
    </div>
  )
}

export default Fordean
