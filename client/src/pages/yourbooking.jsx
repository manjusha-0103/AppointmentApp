import React,{ useState,useEffect } from 'react'
import axios from 'axios';
import './yourbooking.css'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import moment from 'moment/moment';

const Bookings =(props)=>{
  const [open,setOpen] = useState(true)

  const CancelAppointmnet =async()=>{
    const token = JSON.parse(localStorage.getItem('token'));
    const reqdata = {
      dean : props.props.dean,
      date : props.props.appointmentDate

    }
   // console.log(props.props._id)
    const res = await axios.post('/api/users/your-appointment',
    reqdata,
    {headers :
      {
        Authorization:`Bearer ${token['token']}`,
      }
    });

    if(res.data.success){
      alert('Appointmnet is successfully canceled')
    }
    else{
      alert('Something went wrong')
    }
}

  return(
    <>
      <div className ='booking' onClick={()=>setOpen(!open)}>
        Appointment with {props.props.dean}
        <div style={{marginLeft : '73%'}}>
          <ArrowCircleDownIcon sx={{fontSize:'2rem'}}/>
        </div>
        
      </div>
          {!open &&
            <div className='details' >
              <div>
                <h2>Your Appointmment is with {props.props.dean}</h2>
                <h3>Date : {moment(props.props.appointmentDate).format("DD-MM-YYYY")}</h3>
                <p>Time : 10AM to 11AM</p>
                <div >
                  <button onClick={CancelAppointmnet} style={{marginLeft: '0%'}}className='cancelbt'>Cancel Appointmnet</button>
                </div>
              </div>
            </div>
          }
    </>
  )

}
const YourBooking = () => {
  const [appointmnets,setAppointment] = useState()
  const [yes,isappointment ] = useState(false)
  const getAppointmnet = async()=>{
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token)
      
    const reqdata = {
      data : token
    }
      try{
        const res = await axios.post('/api/users/your-appointment',reqdata,{
          headers: {
            Authorization: `Bearer ${token['token']}`,
          },
        });
        if (res.data.success){
          //console.log(res.data.data);
          isappointment(true)
          setAppointment(res.data.data);
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
    <>
      <div className='main-margin'>
      {yes?(
        <>
          {appointmnets && appointmnets.map((appointmnet,idx) => (<Bookings key={idx} props = {appointmnet}/>))}
        </>):(
          <div>
            <h3>You haven't booked any appointment</h3>
          </div>

        )
        
      } 
      </div>
    </>
  )
}

export default YourBooking
