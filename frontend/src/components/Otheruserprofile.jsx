import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { PiDotsThreeBold } from "react-icons/pi";
import { RiArrowDropDownFill } from "react-icons/ri";
import { LuGrid } from "react-icons/lu";
import { TfiInstagram } from "react-icons/tfi";
import { GrSave } from "react-icons/gr";
import { FaClipboardUser } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import { RiAddBoxLine } from "react-icons/ri";
import { HiMiniBars3 } from "react-icons/hi2";
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';


const Otheruserprofile = () => {

  const {userid} = useParams();
  
  const [user,setUser] = useState('');
  const [post,setPost] = useState([]);
  const [isFollow,setIsFollow] = useState(false);


  // css code

  const posts = () => {
    document.querySelectorAll('.posts, .reels, .saved, .tagged').forEach(e => e.style.color = e.classList.contains('posts') ? 'black' : 'rgb(156 163 175)');
  };
  

  const reels = () => {
    document.querySelectorAll('.posts, .reels, .saved, .tagged').forEach(e => e.style.color = e.classList.contains('reels') ? 'black' : 'rgb(156 163 175)');
  };


  const saved = () => {
    document.querySelectorAll('.posts, .reels, .saved, .tagged').forEach(e => e.style.color = e.classList.contains('saved') ? 'black' : 'rgb(156 163 175)');
  };


  const tagged = () => {
    document.querySelectorAll('.posts, .reels, .saved, .tagged').forEach(e => e.style.color = e.classList.contains('tagged') ? 'black' : 'rgb(156 163 175)');
  };
  


// CODE TO SHOW OTHER USERS PROFILE............
useEffect(() => {
    const token = localStorage.getItem('jwt');
    if(!token){
    navigate('/login');
    }
  
    fetch(`http://localhost:3001/user/${userid}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      },
    })
      .then(res => res.json())
      .then((result) => {
        setUser(result.user);
        setPost(result.posts);
        if(result.user.followers.includes(JSON.parse(localStorage.getItem('user'))._id)){
          setIsFollow(true)
        }
      })
      .catch(err => console.log(err));

  }, [isFollow]); 
  


   // CODE TO FOLLOW USER.....................
   const followUser = (userId) => {
    fetch('http://localhost:3001/follow',{
       method: 'put',
       headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
       },
       body: JSON.stringify({
        followId: userId
       })
    })
    .then((res)=> res.json())
    .then((data)=>{
      setIsFollow(true);
    })
   }




      // CODE TO UNFOLLOW USER.....................
      const unfollowUser = (userId) => {
        fetch('http://localhost:3001/unfollow',{
           method: 'put',
           headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('jwt')
           },
           body: JSON.stringify({
            followId: userId
           })
        })
        .then((res)=> res.json())
        .then((data)=>{
          setIsFollow(false);
        })
       }




  return (
    
  <>
  

  {/* ....................THIS IS FOR DESKTOP SITE....................... */}
  <div className=' ml-[19%] hidden md:block mt-4'>
  <div className='hidden md:flex items-center justify-around'>

  <div>
  <Avatar 
  src={user.profilephoto ? user.profilephoto : ''} 
   sx={{ width: 150, height: 150 }}/>
  </div>
 
  <div>
  <div className='flex items-center gap-4 mt-4'>
    <span>{user.username}</span>
    {
      isFollow ?
      <button onClick={()=>{unfollowUser(user._id)}} className='bg-gray-200 rounded-md px-3 py-1 flex items-center transition-all transition-duration-500 hover:transform hover:scale-110 hover:shadow-xl hover:shadow-gray-500'>
      unfollow
    </button>
      :
      <button onClick={()=>{followUser(user._id)}} className='bg-blue-600 text-white rounded-md px-3 py-1 flex items-center transition-all transition-duration-500 hover:transform hover:scale-110 hover:shadow-xl hover:shadow-gray-500'>
      follow
    </button>
    }

    <span className='bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1 transition-all transition-duration-500 hover:transform hover:scale-110 hover:shadow-xl hover:shadow-gray-500'>Message</span>
    <span className='text-2xl'><PiDotsThreeBold/></span>
  </div> 

    <div className='space-x-6 mt-6'>
    <span><span className='font-medium mr-1'>{post.length}</span>posts</span>
    <span><span className='font-medium mr-1'>{user.followers ? user.followers.length : '0'}</span> followers</span>
    <span><span className='font-medium mr-1'>{user.following ? user.following.length : '0'}</span> following</span>
  </div>

  <div className='mt-4'>
  {user.fullname}
  </div>

  <div className='mt-4 text-gray-400'>
    Athlete
  </div>

  <div className='mt-4'>
    You know i am a devil of my world !.....and so on.
  </div>

  </div>


  </div>
  
  <div className='hidden md:block text-8xl text-gray-300 ml-32 mt-4'>
  <IoAddCircle />
  </div>


  <p className='mt-2 mx-24 hidden md:block'>
    <hr/>
  </p>


  <div className='hidden md:flex text-center justify-center space-x-16 mt-4'>

  <span onClick={posts} className='text-gray-400 text-sm flex items-center gap-2 cursor-pointer posts'><span><LuGrid/></span>POSTS</span>   
  <span onClick={reels} className='text-gray-400 text-sm flex items-center gap-2 cursor-pointer reels'><span><TfiInstagram /></span>REELS</span>   
  <span onClick={saved} className='text-gray-400 text-sm flex items-center gap-2 cursor-pointer  saved'><span><GrSave /></span>SAVED</span>   
  <span onClick={tagged} className='text-gray-400 text-sm flex items-center gap-2 cursor-pointer tagged'><span><FaClipboardUser /></span>TAGGED</span>   

  </div> 


  <div className='hidden md:flex flex-wrap m-4 items-center justify-center'>
  { 
    post.map((createdposts) => (
    <img 
    key={createdposts._id}
    className='w-[20%] h-[300px] m-1 overflow-hidden rounded-md'
     src={createdposts.image}/>
    ))
  }
  </div>
  </div>







    {/* .......................THIS IS FOR MOBILE....................... */}

  <div className='ml-3 flex md:hidden items-center justify-between mt-2'>
  <p className='flex items-center'>{user.username}<span><RiArrowDropDownFill /></span></p>
  <div className='flex mr-3 gap-4'>
    <Link to='/createpost'><RiAddBoxLine /></Link>
    <span><HiMiniBars3 /></span>
  </div>
  </div>

  <div className='flex md:hidden items-center justify-around mt-5'>
  <div>
  <Avatar
   src={user.profilephoto ? user.profilephoto : ''} 
   sx={{ width: 70, height: 70 }}/>
  </div>

  <div className='space-x-6 flex'>
    <span className='grid'><span className='font-medium'>{post.length}</span>posts</span>
    <span className='grid'><span className='font-medium'>{user.followers ? user.followers.length : '0'}</span> followers</span>
    <span className='grid'><span className='font-medium'>{user.following ? user.following.length : '0'}</span> following</span>
  </div>
  </div> 


  <p className='block md:hidden ml-3 mt-2'>{user.fullname}</p>
  <p className='block md:hidden ml-3 text-gray-400'>Actor</p>
  <p className='block md:hidden ml-3'>You know i am a devil of my world !.....and so on.</p>


  <div className='flex md:hidden px-2 py-4 ml-1'>
  {
      isFollow ?
      <button onClick={()=>{unfollowUser(user._id)}} className='bg-gray-200 rounded-md px-3 py-1 flex items-center transition-all transition-duration-500 hover:transform hover:scale-110 hover:shadow-xl hover:shadow-gray-500'>
      unfollow
    </button>
      :
      <button onClick={()=>{followUser(user._id)}} className='bg-blue-600 text-white rounded-md px-3 py-1 flex items-center transition-all transition-duration-500 hover:transform hover:scale-110 hover:shadow-xl hover:shadow-gray-500'>
      follow
    </button>
    }
  <button className='border border-black rounded-md px-3 py-1 flex items-center transition-all transition-duration-500 hover:transform hover:scale-110 ml-4'>Message</button>
  </div>


  <p className='text-6xl text-gray-300 ml-1 md:hidden px-2 py-4'>
  <IoAddCircle />
  </p>


  <div className='flex md:hidden text-2xl justify-around text-gray-500 mt-4'>
   <span className='posts' onClick={posts}><LuGrid/></span>
   <span className='reels' onClick={reels}><TfiInstagram /></span>
   <span className='saved' onClick={saved}><GrSave /></span>
   <span className='tagged' onClick={tagged}><FaClipboardUser /></span>
  </div>


  <div className='flex md:hidden flex-wrap items-center justify-between mt-2'> 
  {
    post.map((createdposts) => (
    <img  key={createdposts._id} className='w-[30%] h-[180px] m-1 overflow-hidden rounded-md' src={createdposts.image}/>
    ))
  }
  </div>



  </>

  )
}

export default Otheruserprofile













































































































































































































