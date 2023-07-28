
// import './App.css';
import React from 'react'
import AllDeanpage from './pages/deanpage';
import Login from './pages/login';
import Register from './pages/register';
import Fordean from './pages/fordean';
import YourBooking from './pages/yourbooking';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Header from './components/header';
import UserPublicRout from './components/routes/userpublicRout';
import UserProtectRout from './components/routes/userprotectRout';
import DeanPublicRout from './components/routes/deanpublic';

function App() {
  return (
    <>
      
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path = '/' 
              element={               
                <UserPublicRout>
                  <Register/>
                </UserPublicRout>                                  
            }/>
            <Route path = '/login' 
              element={
                <UserPublicRout>
                   <Login/> 
                </UserPublicRout>   
            }/>
            
            <Route path = '/alldeans' 
              element={
                <UserProtectRout>
                  <AllDeanpage/>
                </UserProtectRout>                
            }/> 
            <Route path = '/alldeans' 
              element={
                <UserProtectRout>
                  <AllDeanpage/>
                </UserProtectRout>                
            }/>       
            <Route path = '/your-appointment' 
                element={<YourBooking />}/>  
          </Routes>

            
          <Routes>
              
            <Route path = '/fordean/' 
              element={ 
                <UserProtectRout>
                  <Fordean/>
                </UserProtectRout>
              }>
              <Route path = 'cancelappointment' element = {<Fordean/>}/>
              <Route path = 'changestatus' element = {<Fordean/>}/>
                
            </Route>
            
          </Routes>
            
          
            
      </BrowserRouter>
    </>
  );
}

export default App;
