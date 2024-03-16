import React, { useState,useEffect } from 'react'
import { Avatar } from '@mui/material';
import { RiAddBoxLine } from "react-icons/ri";
import { CiInstagram } from "react-icons/ci";
import { GoHomeFill } from "react-icons/go";
import { FaRegCompass } from "react-icons/fa";
import { RiMessengerLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { AiFillInstagram } from "react-icons/ai";
import { BsMessenger } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { CiLogout, CiLogin } from "react-icons/ci";
import { Link,useNavigate } from 'react-router-dom';
import { MdCancel } from "react-icons/md";
import { RiArrowDropDownFill } from "react-icons/ri";
import { BiSolidUpArrow } from "react-icons/bi";
import { LiaTelegramPlane } from "react-icons/lia";



const Navbar = () => {

  const navigate = useNavigate();

  const[mdhome,setMdHome] = useState(false);
  const[mdsearch,setMdSearch] = useState(false);
  const[mdreel,setMdreel] = useState(false);
  const[mdmessages,setMdMessages] = useState(false);
  const[mdprofile,setMdProfile] = useState(false);
  const[logoutpageopen,setLogoutPageOpen] = useState(false);
  const[option,setOption] = useState(false);
  const [user,setUser] = useState('');



  // CSS PROPERTIES

  const setActiveClass = (activeClass) => {
    document
      .querySelectorAll('.home, .search, .explore, .reel, .messages, .notifications, .create, .more, .profile')
      .forEach((e) => {
        e.style.fontWeight = e.classList.contains(activeClass) ? 'bolder' : 'normal';
      });
  };

  const handlemdhome = () => {
    setMdHome(true);
    setMdSearch(false);
    setMdreel(false);
    setMdMessages(false);
    setMdProfile(false);
  }

  const handlemdsearch = () => {
    setMdHome(false);
    setMdSearch(true);
    setMdreel(false);
    setMdMessages(false);
    setMdProfile(false);
  }

  const handlemdreel = () => {
    setMdHome(false);
    setMdSearch(false);
    setMdreel(true);
    setMdMessages(false);
    setMdProfile(false);
  }

  const handlemdmessages = () => {
    setMdHome(false);
    setMdSearch(false);
    setMdreel(false);
    setMdMessages(true);
    setMdProfile(false);
  }

  const handlemdprofile = () => {
    setMdHome(false);
    setMdSearch(false);
    setMdreel(false);
    setMdMessages(false);
    setMdProfile(true);
  }





  // CODE TO SHOW LOGIN AND LOGOUT BUTTON FUNCTION
  const loginStatus = () => {
    const token = localStorage.getItem('jwt');
    if(token){
      return (
        <div key="logout" onClick={() => {setActiveClass('more');setLogoutPageOpen(true)}} className='more flex items-center gap-3 px-6 py-[14px] hover:bg-gray-100 rounded-lg'>
          <span className='text-2xl'><CiLogin /></span>
          <span>Logout</span>
        </div>
      );
    } else {
      return (
        <Link key="login" to='/login' onClick={() => setActiveClass('more')} className='more flex items-center gap-3 px-6 py-[14px] hover:bg-gray-100 rounded-lg'>
          <span className='text-2xl'><CiLogin /></span>
          <span>Login</span>
        </Link>
      );
    }
  }
  
 


  // CODE TO OPEN LIST IN INSTAGRAM LOGO
  const openList = () => {
    if(option){
      setOption(false);
    }
    else{
      setOption(true);
    }
  }



    // CODE TO SHOW USERS Photo ON HIS PROFILE ..................
    useEffect(() => {
  
      const token = localStorage.getItem('jwt');
    if(!token){
    navigate('/login');
    }

    else{ 
  
      fetch(`http://localhost:3001/user/${JSON.parse(localStorage.getItem('user'))._id}`,{
      headers:{
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      },
      }).then(res => res.json())
        .then(result => {
          setUser(result.user);
        })
        .catch(err => console.log(err))
      } 
      }, [])
  



  return (
    
  <>


  {/* DESKTOP NAVIGATION BARS.......................... */}

  
  
   {/* THIS IS INSTAGRAM LOGO FOR SMALL SCREEN STARTS HERE */}
  <div className='flex md:hidden justify-between items-center'>
      <div className='flex items-center'>
       <Link to='/'>
       <img className='w-[110px] ml-5' src='https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png' />
       </Link>
       <span onClick={openList} className='text-4xl'>
    {
      option ?
      <span className='text-sm'><BiSolidUpArrow/></span>
      :
      <span><RiArrowDropDownFill/></span>
    }
    </span>
  {  option && (
     <div className='bg-gray-50 shadow-xl shadow-gray-400 grid text-center absolute top-[5%] left-[17%] p-2 rounded-lg z-10'>
     <Link to='/allposts' onClick={openList} className='p-1 hover:bg-gray-200 rounded-lg cursor-pointer'>All posts</Link>
     <Link to='/' onClick={openList} className='p-1 hover:bg-gray-200 rounded-lg cursor-pointer'>my Following</Link>
   </div>
    )
  }
      </div>
      <div className='flex gap-2 text-2xl mr-2'>
        <span><FiHeart/></span>
        <span><LiaTelegramPlane/></span>
      </div>
    </div>
  {/* THIS IS INSTAGRAM LOGO FOR SMALL SCREEN STARTS ENDS */}



  <div className='w-[19%] h-auto border-r hidden md:block px-2 fixed top-0'>

  <div className='flex py-[15px] items-center'>
    <Link to='/'>
    <img className='w-[110px] ml-5' src='https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png' />
    </Link>
   <span onClick={openList} className='text-4xl'>
    {
      option ?
      <span className='text-sm'><BiSolidUpArrow/></span>
      :
      <span><RiArrowDropDownFill/></span>
    }
    </span>
  </div> 


  {  option && (
     <div className='bg-gray-50 shadow-xl shadow-gray-400 grid text-center absolute top-[10%] left-[44%] p-2 rounded-lg'>
     <Link to='/allposts' onClick={openList} className='p-1 hover:bg-gray-200 rounded-lg cursor-pointer'>All posts</Link>
     <Link to='/' onClick={openList} className='p-1 hover:bg-gray-200 rounded-lg cursor-pointer'>my Following</Link>
   </div>
    )
  }



  <Link to='/' onClick={() => setActiveClass('home')} className='home flex items-center gap-3 px-6 py-[14px] hover:bg-gray-100 rounded-lg'>
    <span className='text-3xl'><GoHomeFill/></span>
    <span>Home</span>
  </Link>

  <Link to='/search' onClick={() => setActiveClass('search')} className='search flex items-center gap-3 px-6 py-[14px] hover:bg-gray-100 rounded-lg'>
    <span className='text-3xl'><IoSearchOutline/></span>
    <span>Search</span>
  </Link>

  <div onClick={() => setActiveClass('explore')} className='explore flex items-center gap-3 px-6 py-[14px] hover:bg-gray-100 rounded-lg'>
    <span className='text-2xl'><FaRegCompass/></span>
    <span>Explore</span>
  </div>

  <div onClick={() => setActiveClass('reel')} className='reel flex items-center gap-3 px-6 py-[14px] hover:bg-gray-100 rounded-lg'>
    <span className='text-2xl'><CiInstagram/></span>
    <span>Reels</span>
  </div>

  <div onClick={() => setActiveClass('messages')} className='messages flex items-center gap-3 px-6 py-[14px] hover:bg-gray-100 rounded-lg'>
    <span className='text-2xl'><RiMessengerLine/></span>
    <span>Messages</span>
  </div>

  <div onClick={() => setActiveClass('notifications')} className='notifications flex items-center gap-3 px-6 py-[14px] hover:bg-gray-100 rounded-lg'>
    <span className='text-2xl'><FiHeart/></span>
    <span>Notifications</span>
  </div>

  <Link to='/createpost' onClick={() => setActiveClass('create')} className='create flex items-center gap-3 px-6 py-[14px] hover:bg-gray-100 rounded-lg'>
    <span className='text-2xl'><RiAddBoxLine/></span>
    <span>Create</span>
  </Link>

  <Link to='/profile' onClick={handlemdprofile} className='create flex items-center gap-3 px-6 py-[14px] hover:bg-gray-100 rounded-lg '>
  {mdprofile ? (
    <FaUserCircle />
  ) : (
    user && user.profilephoto ? (
      <Avatar src={user.profilephoto} sx={{ width: 35, height: 35 }} />
    ) : (
      <FaUserCircle /> // Or any other fallback component or placeholder
    )
  )}
</Link>



  {loginStatus()}
      

  </div>
  




  {/* BOTTOM NAVIGATION BARS FOR MOBILE.................... */}

  <nav className='w-full flex md:hidden items-center justify-between text-3xl bg-white fixed top-[94%] px-8 py-4 z-10'>

  <Link to='/' onClick={handlemdhome}>{mdhome ? <GoHomeFill/> : <GoHome/>}</Link>
  <Link to='/search' onClick={handlemdsearch}>{mdsearch ? <FaSearch/> : <IoSearchOutline/>}</Link>
  <span onClick={handlemdreel} className='text-md'>{mdreel ?<AiFillInstagram/> : <CiInstagram/>}</span>
  <span onClick={handlemdmessages}>{mdmessages ? <BsMessenger/> : <RiMessengerLine/>}</span>
  
  <Link to='/profile' onClick={handlemdprofile}>
  {mdprofile ? (
    <FaUserCircle />
  ) : (
    user && user.profilephoto && (
      <Avatar src={user.profilephoto} sx={{ width: 26, height: 26 }} />
    )
  )}
</Link>


  </nav>




   {/* .............LOGOUT PAGE ................................... */}
   {
     logoutpageopen &&
     <div onClick={()=>setLogoutPageOpen(false)} className='w-full h-[100%] md:h-[700px] fixed z-10' style={{backgroundColor:'rgb(16,16,13,0.2)'}}>
    <div className='bg-white w-[65%] md:w-[23%] text-center m-auto rounded-lg mt-[65%] md:mt-[12%]'>
    <span onClick={()=>setLogoutPageOpen(false)} className='text-xl text-red-600 hover:text-red-500 float-right'><MdCancel/></span>
    <h1 className='m-auto py-3 ml-4'>Confirm</h1> 
    <span className='flex justify-center'><Avatar src={user.profilephoto ? user.profilephoto : ''}  sx={{width:40,height:40}} /></span>
    <span className='text-sm'>{JSON.parse(localStorage.getItem('user')).username}</span>
    <p className='py-2'>Are you really want to logout ?</p>
    <div className='justify-around flex py-4'>
      <button onClick={()=>setLogoutPageOpen(false)} className='bg-gray-400 hover:bg-gray-300 px-4 py-1 rounded-lg'>Cancel</button>
      <button onClick={()=>{setLogoutPageOpen(false);localStorage.clear();navigate('/login')}} className='bg-red-600 hover:bg-red-500  px-4 py-1 rounded-lg'>Logout</button>
    </div>
    </div>
   </div>
   }
    
  
  </>

  )
}

export default Navbar





