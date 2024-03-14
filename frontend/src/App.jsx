import React from 'react';
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import Otheruserprofile from './components/Otheruserprofile';
import Myfollowingposts from './pages/Myfollowingposts';
import Search from './pages/Search';
import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => {




  return (
    
  <>

<GoogleOAuthProvider clientId="652216037895-4onfoehv7b690duir33o5minu1pkrojd.apps.googleusercontent.com">

  <Navbar />
  
  <Routes>
    
  <Route path='/' element={<Myfollowingposts/>} />
  <Route path='/login' element={<Login/>} />
  <Route path='/signup' element={<Signup/>} />
  <Route path='/profile' element={<Profile/>} />
  <Route path='/createpost' element={<CreatePost/>} />
  <Route path='/otheruserprofile/:userid' element={<Otheruserprofile/>} />
  <Route path='/allposts' element={<Home/>} />
  <Route path='/search' element={<Search/>} />

  </Routes>
   
  
  </GoogleOAuthProvider>
  
  </>

  )
}

export default App




















