import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';




const Signup = () => {



  const navigate = useNavigate();

  const [email,setEmail] = useState('');
  const [fullname,setFullName] = useState('');
  const [username,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [errors,setErrors] = useState({});

  
  
    // CODE TO SHOW ERRORS WHEN ALL FIELDS ARE EMPTY ........................

  const validate = () => {

    let validationErrors = {};
  
    if(!email){
      validationErrors.email = '* email is required *' ;
    }
  
    if(!fullname){
      validationErrors.fullname = '* Name is required *' ;
    }
  
    if(!username){
      validationErrors.username = '* username is required *' ;
    }
  
    if(!password){
      validationErrors.password = '* Password is required *' ;
    }
  
    return validationErrors;
  
    };



    //  CODE TO SIGNUP USER...............................
    const handleSignup = async (e) => {

      e.preventDefault();
  
     // CODE TO SHOW ERRORS WHEN ALL FIELDS ARE EMPTY

     const validationErrors = validate();
     if(Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
     }
  
  
     // regex errors when user enter invalid email and password must contain altleast 1 capital 1 small 1 special character.......

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const passwordRegex = /^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*[^a-zA-Z0-9]).{5,}$/;

    if (!emailRegex.test(email)){
        swal({
          title:'Invalid email',
          icon:'error',
          buttons:false,
          timer:2000
        });
        return;
    } 

    if (!passwordRegex.test(password)){
      swal({
        title:'Password must contain atleast 2 UpperCase 2 Lowercase and 1 special letter',
        icon:'error',
        buttons:false,
        timer:2000
      });
      return;
  } 

  
   // THIS IS MAIN CODE TO SIGN UP.....................

      
      try {
        const result = await axios.post('http://localhost:3001/signup', { email, fullname, username, password });
        swal({
          title: 'User Registered Successfully',
          icon: 'success',
          buttons: false,
          timer: 2000,
        });
  
        navigate('/');
  
      } catch (err) {
       
        if (err.response && err.response.status === 400 && err.response.data.message === 'email already exists') {
  
          swal({
            title: 'email Already Exists',
            icon: 'warning',
            buttons: false,
            timer: 2000,
          });
        } 
         

        else if (err.response && err.response.status === 400 && err.response.data.message === 'username already exists') {
  
          swal({
            title: 'Username Already Exists',
            icon: 'warning',
            buttons: false,
            timer: 2000,
          });
        } 
         
       
        else {
  
          swal({
            title: 'Something went wrong',
            icon: 'error',
            buttons: false,
            timer: 2000,
          });
  
        }
  
      }
    };




  return (
    
  <>
  
  <div className='ml-0 md:ml-[19%]'>
   

      <div className='flex justify-center gap-5 mt-24 md:mt-12'>
     <div className='hidden md:block rounded-3xl w-[30%] h-auto overflow-hidden'>
     <img  src='https://images.unsplash.com/photo-1704999638827-cd0a7fed5c1c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
     </div>
      <div className='shadow-xl shadow-gray-400 rounded-2xl grid w-[85%] md:w-[40%] p-2'>
      <p className=' m-auto'>
      <img src='https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png' width='100px' />
     </p>
     <h1 className='text-center p-4 text-3xl'>Signup</h1>
     <input value={email} onChange={(e) => setEmail(e.target.value)} className='border border-gray-200 p-2 m-2 rounded-xl' type='email' 
     placeholder='email' />
     {errors.email && <p className='text-red-500 text-center' >{errors.email}</p>}
     <input value={fullname} onChange={(e) => setFullName(e.target.value)}  className='border border-gray-200 p-2 m-2 rounded-xl' type='text' 
     placeholder='full name' />
      {errors.fullname && <p className='text-red-500 text-center' >{errors.fullname}</p>}
     <input value={username} onChange={(e) => setUserName(e.target.value)}  className='border border-gray-200 p-2 m-2 rounded-xl' type='text' 
     placeholder='user name' />
      {errors.username && <p className='text-red-500 text-center' >{errors.username}</p>}
     <input value={password} onChange={(e) => setPassword(e.target.value)}  className='border border-gray-200 p-2 m-2 rounded-xl' type='password' 
     placeholder='paasword' />
      {errors.password && <p className='text-red-500 text-center' >{errors.password}</p>}
      <button onClick={handleSignup} className='bg-green-500 hover:bg-green-600 p-1 text-white w-20 rounded-lg m-auto mt-2'>Signup</button>
      <p className='text-center p-4'>Already have an account ? <Link className='text-sky-500 underline' to='/login'>Login</Link></p>
      </div>
      </div>
  



  </div>
  
  </>

  )
}

export default Signup
