//import react from 'react'
// import './App.css';
import AllDeanpage from './pages/deanpage';
import Login from './pages/login';
import Register from './pages/register';
import Fordean from './pages/fordean';
import Booking from './pages/booking';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Header from './components/header';
import UserPublicRout from './components/userpublicRout';
import UserProtectRout from './components/userprotectRout';
import DeanPublicRout from './components/userpublicRout';
import DeanProtectRout from './components/userprotectRout';
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
          <Route path = '/book-appointment' 
            element={
              <UserProtectRout>
                <Booking/>
              </UserProtectRout>  
          }/>
        </Routes>
        <Routes>
          <Route path = '/fordean' 
            element={
              <DeanProtectRout>
                <Fordean/>
              </DeanProtectRout>
              
            }/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
