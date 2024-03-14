import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


const Login = () => {

  const navigate = useNavigate();

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [errors,setErrors] = useState({});



  // code for show errors when all fields are empty........................
    const validate = () => {

      let validationErrors = {};
    
      if(!email){
        validationErrors.email = '* email is required *' ;
      }
 
      if(!password){
        validationErrors.password = '* Password is required *' ;
      }
    
      return validationErrors;
    
      };


  //CODE T0 LOGIN AND GET JWT TOKEN......................................
  const handleLogin = async (e) => {
    e.preventDefault();
  
    // code to show error for empty fields
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      const result = await axios.post('http://localhost:3001/login', { email, password });
  
      if (result.data.status === 'success') {
        swal({
          title: 'Logged In',
          icon: 'success',
          buttons: false,
          timer: 2000,
        });
  
        localStorage.setItem('jwt', result.data.token);
        localStorage.setItem('user',JSON.stringify(result.data.user));
        navigate('/');
        window.location.reload();
      }
    } catch (err) {
      swal({
        title: 'Invalid username or password!',
        icon: 'error',
        buttons: false,
        timer: 2000,
      });
    }
  };



  
  // CODE TO CONTINUE WITH GOOGLE.........................
  const continuewithGoogle = (credentialResponse) => {
 
      console.log(credentialResponse);
      const jwtDetail = jwtDecode(credentialResponse.credential);
      console.log(jwtDetail);
      fetch('http://localhost:3001/googleLogin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullname: jwtDetail.name,
          username: jwtDetail.name,
          email: jwtDetail.email,
          email_verified: jwtDetail.email_verified,
          clientId: credentialResponse.clientId,
          picture: jwtDetail.picture
        })
      }).then(res => res.json())
        .then(data => {
          if (data.error) {
            swal({
              title: 'Something went wrong',
              icon: 'error',
              buttons: false,
              timer: 2000,
            });
          } else {
            swal({
              title: 'Logged in',
              icon: 'success',
              buttons: false,
              timer: 2000,
            });
            console.log(data)
            localStorage.setItem('jwt', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            navigate('/')
            window.location.reload();
          }
          console.log(data)
        })
  }
  


  return (
    
  <>
  
  <div className='ml-0 md:ml-[19%] '>
   <div className='flex justify-center mt-24 md:mt-24 gap-5'>
   <div className='hidden md:block rounded-3xl w-[30%] h-[400px] overflow-hidden'>
   <img  src='https://images.unsplash.com/photo-1535451801241-b5395e1d4a1b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
   </div>
    <div className='shadow-xl shadow-gray-400 rounded-2xl grid w-[85%] md:w-[40%] p-2'>
    <p className=' m-auto'>
   <img src='https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png' width='100px' />
   </p>
   <h1 className='text-center p-4 text-3xl'>Login</h1>
    <input value={email} onChange={(e) => setEmail(e.target.value)} className='border border-gray-200 p-2 m-2 rounded-xl' type='email'  
    placeholder='email' />
    {errors.email && <p className='text-red-500 text-center' >{errors.email}</p>}
   <input value={password} onChange={(e) => setPassword(e.target.value)} className='border border-gray-200 p-2 m-2 rounded-xl' type='password' 
   placeholder='paasword' />
   {errors.password && <p className='text-red-500 text-center' >{errors.password}</p>}
   <button onClick={handleLogin} className='bg-green-500 hover:bg-green-600 p-1 text-white w-20 rounded-lg m-auto mt-2'>Login</button>
   <p className='m-auto'>or</p>
   <div className='m-auto my-2'>
      <GoogleLogin
  onSuccess={credentialResponse => {
   continuewithGoogle(credentialResponse)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
</div>   
   <p className='text-center p-2'>Don't have an account ? <Link className='text-sky-500 underline' to='/signup'>Signup</Link></p>
   </div>
   </div>
  </div>
  
  
  </>

  )
}

export default Login