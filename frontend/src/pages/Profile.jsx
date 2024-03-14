import React, { useEffect,useRef,useState } from 'react';
import { Avatar } from '@mui/material';
import { IoIosSettings } from "react-icons/io";
import { RiArrowDropDownFill } from "react-icons/ri";
import { LuGrid } from "react-icons/lu";
import { TfiInstagram } from "react-icons/tfi";
import { GrSave } from "react-icons/gr";
import { FaClipboardUser } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import { RiAddBoxLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { HiMiniBars3 } from "react-icons/hi2";
import {Link,useNavigate} from 'react-router-dom';
import PostDetail from '../components/PostDetail';
import swal from 'sweetalert';
import { TailSpin } from 'react-loader-spinner';




const Profile = () => {

  const navigate = useNavigate();
  const [data,setData] = useState([]);
  const [show,setShow] = useState(false);
  const [post,setPost] = useState([]);
  const [usertoken,setUserToken] = useState(localStorage.getItem('user'));
  const [profilepage,setProfilePage] = useState(false);
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [user,setUser] = useState('');
  const [loading,setLoading] = useState(false);


  // CSS CODE..........................................
  const setActiveClass = (activeClass) => {
    document
      .querySelectorAll('.posts, .reels, .saved, .tagged')
      .forEach((e) => {
        e.style.color = e.classList.contains(activeClass) ? 'black' : 'rgb(156 163 175)';
      });
  };




  // CODE TO SHOW USERS POSTS ON HIS PROFILE ..................
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
        setData(result.posts);
        setUser(result.user);
        setPost(result.posts);
      })
      .catch(err => console.log(err))
    } 
    }, [])



   // CODE TO OPEN THAT PHOTO ON PROFILE 
  const openphoto = (createdposts) => {
    
    if(show){
      setShow(false);
    }else{
      setShow(true);
      setPost(createdposts);
    }

   };

 
  // CODE TO OPEN PROFILE PHOTO UPLOAD SECTION................
  const openprofilepage = () => {
    if(profilepage){
      setProfilePage(false);
    }
    else{
      setProfilePage(true);
    }
  }
 

  // CODE TO OPEN INPUT FIELD ...............
  const hiddeninput = useRef(null);

  const handleinput = () => {
    hiddeninput.current.click();
  }



  // CODE TO POST IMAGE TO CLOUDINARY AND GET LINK
const createPost = async () => {
  try {
    setLoading(true);
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'Instagram-clone');
    data.append('cloud_name', 'amansharma');

    const cloudinaryResponse = await fetch(
      'https://api.cloudinary.com/v1_1/amansharma/image/upload',
      {
        method: 'post',
        body: data,
      }
    );
    const cloudinaryData = await cloudinaryResponse.json();
    setUrl(cloudinaryData.url);

    // CODE TO SAVE DATA TO DATABASE
    const response = await fetch('http://localhost:3001/uploadprofilepic', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        image: cloudinaryData.url,
      }),
    });

    openprofilepage();
    swal({
      title: 'profile updated successfully',
      icon: 'success',
      buttons: false,
      timer: 2000,
    });
    setTimeout(()=>{
    window.location.reload();
    },2000)

    setLoading(false);
  } catch (error) {
    console.error(error);
  }
};



    // CODE TO PREVIEW PHOTO BEFORE UPLOADING IT 
    const loadfile = (event) => {
      const output = document.getElementById('output');
      output.src = URL.createObjectURL(event.target.files[0]);
      output.onload = function () {
        URL.revokeObjectURL(output.src);
      };
  
      setImage(event.target.files[0]);
    };




  // CODE TO REMOVE PROFILE POST..................
    const removeprofile = async() => {
      setLoading(true);
      const response = await fetch('http://localhost:3001/removeprofilepic', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          image: '',
        }),
      });
      openprofilepage();
      swal({
        title: 'profile removed successfully',
        icon: 'success',
        buttons: false,
        timer: 2000,
      });
      setTimeout(()=>{
      window.location.reload();
      },2000)
  
      setLoading(false);
    }

  

  return (
  

    <>
  
  {/* THIS IS FOR DESKTOP SCREEN......................... */}
    <div className='ml-0 md:ml-[19%]'>
   <div className='hidden md:flex items-center justify-around'>
   <div>
   <Avatar onClick={()=>{openprofilepage()}} 
    src={user.profilephoto ? user.profilephoto : ''} 
    sx={{ width: 140, height: 140 }}/>
   </div>
   <div>
   <div className='flex items-center gap-2 mt-12'>
   <span>{usertoken ? JSON.parse(localStorage.getItem('user')).username : ''}</span>
     <span className='bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1'>Edit Profile</span>
     <span className='bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1'>View Archieve</span>
     <span className='bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1'>Add tools</span>
     <span className='text-3xl'><IoIosSettings/></span>
   </div> 
     <div className='space-x-6 mt-6'>
     <span><span className='font-medium mr-1'>{post ? post.length : '0'}</span>posts</span>
     <span><span className='font-medium mr-1'>{user.followers ? user.followers.length : '0'}</span> followers</span>
     <span><span className='font-medium mr-1'>{user.following ? user.following.length : '0'}</span> following</span>
   </div>
   <div className='mt-4'>
   {usertoken ? JSON.parse(localStorage.getItem('user')).fullname : ''}
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
   <span onClick={() => setActiveClass('posts')}  className='text-gray-400 text-sm flex items-center gap-2 cursor-pointer posts'><span><LuGrid/></span>POSTS</span>   
   <span onClick={() => setActiveClass('reels')}  className='text-gray-400 text-sm flex items-center gap-2 cursor-pointer reels'><span><TfiInstagram /></span>REELS</span>   
   <span onClick={() => setActiveClass('saved')} className='text-gray-400 text-sm flex items-center gap-2 cursor-pointer  saved'><span><GrSave /></span>SAVED</span>   
   <span onClick={() => setActiveClass('tagged')} className='text-gray-400 text-sm flex items-center gap-2 cursor-pointer tagged'><span><FaClipboardUser /></span>TAGGED</span>   
   </div> 
   <div className='hidden md:flex flex-wrap m-4 items-center justify-center'>
      {
    data.map((createdposts) => (
    <img onClick={()=>{openphoto(createdposts)}} key={createdposts._id} className='w-[24%] h-[300px] m-1 overflow-hidden rounded-md' src={createdposts.image}/>
    ))
     }
   </div>
    </div>


  

   {/* THIS IS FOR MOBILE SCREEN............................................... */}
  <div className='ml-3 flex md:hidden items-center justify-between mt-2'>
  <p className='flex items-center'>{usertoken ? JSON.parse(localStorage.getItem('user')).username : ''}<span><RiArrowDropDownFill /></span></p>
  <div className='flex mr-3 gap-4'>
  <Link to='/createpost'><RiAddBoxLine /></Link>
  <span
   onClick={()=>{
    if (window.confirm('Do you want to logout ' + JSON.parse(localStorage.getItem('user')).username + '?')) {
      localStorage.clear();
      navigate('/login')
    }
   }}>
  <CiLogout />
  </span>
  </div>
  </div>
   <div className='flex md:hidden items-center justify-around mt-5'>
   <div>
   <Avatar onClick={()=>{openprofilepage()}} 
   src={user.profilephoto ? user.profilephoto : ''} 
   sx={{ width: 70, height: 70 }}/>
   </div>
   <div className='space-x-6 flex'>
     <span className='grid'><span className='font-medium'>{post ? post.length : '0'}</span>posts</span>
     <span className='grid'><span className='font-medium'>{user.followers ? user.followers.length : '0'}</span> followers</span>
     <span className='grid'><span className='font-medium'>{user.following ? user.following.length : '0'}</span> following</span>
   </div>
   </div> 
   <p className='block md:hidden ml-3 mt-2'>{usertoken ? JSON.parse(localStorage.getItem('user')).fullname : ''}</p>
   <p className='block md:hidden ml-3 text-gray-400'>Actor</p>
   <p className='block md:hidden ml-3'>You know i am a devil of my world !.....and so on.</p>
   <p className='bg-gray-100 p-4 m-2 grid md:hidden rounded-xl'>
     <span className='font-medium'>Professional dashboard</span>
     <span className='text-gray-400'>New tools are available now</span>
   </p>
   <p className='block md:hidden text-center p-2 m-2 rounded-xl bg-gray-100'>
     Edit profile
   </p>
   <p className='text-6xl text-gray-300 ml-1 md:hidden'>
   <IoAddCircle />
   </p>
   <div className='flex md:hidden text-2xl justify-around text-gray-500 mt-4'>
    <span onClick={() => setActiveClass('posts')} className='posts' ><LuGrid/></span>
    <span onClick={() => setActiveClass('reels')}className='reels'><TfiInstagram /></span>
    <span onClick={() => setActiveClass('saved')} className='saved'><GrSave /></span>
    <span onClick={() => setActiveClass('tagged')} className='tagged'><FaClipboardUser /></span>
   </div>
   <div className='flex md:hidden flex-wrap items-center justify-between mt-2'> 
   {
    data.map((createdposts) => (
    <img onClick={()=>{openphoto(createdposts)}} key={createdposts._id} className='w-[31%] h-[250px] m-1 overflow-hidden rounded-md' src={createdposts.image}/>
    ))
     }

   </div>

   
   {
    show && 
    <PostDetail item={post} openphoto={openphoto} />
   }



  {/* ..............THIS IS UPLOAD OR REMOVE PROFILE PIC STARTS.................. */}
  {
    profilepage && 
     
    <div  className='w-full h-full md:h-[700px] fixed top-0' style={{backgroundColor:'rgb(16,16,13,0.4)'}}>
    <div className='bg-white grid w-[75%] md:w-[35%] m-auto mt-[45%] md:mt-[8%] p-4 rounded-2xl'>
      {
        loading ? 
        (
          <div className='justify-center mt-12 flex'>
          <TailSpin color='gray' height={100} />
          </div>
        )
        :
        (
          <>
          <div className='m-auto'><img className='rounded-full w-20 h-20' id='output' src='https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg' /></div>
      <h1 className='text-center py-4 text-2xl border-b'>Change Profile Photo</h1>
      <button onClick={()=>{handleinput()}} className='py-3 font-bold text-sky-500 border-b'>upload photo</button>
     <input type='file' ref={hiddeninput} accept='image/*' style={{display:'none'}} onChange={loadfile}
       />
      <button onClick={removeprofile} className='py-3 font-bold text-red-500 border-b'>remove current photo</button>
          <button className='py-3 font-bold text-green-500 border-b' onClick={() => createPost()}>post</button>
      <button onClick={openprofilepage} className='py-3'>cancel</button>
      </>
        )
      }
       
    </div>
    </div>
  }
  {/* ..............THIS IS UPLOAD OR REMOVE PROFILE PIC ENDS.................. */}

    </>
  )
}

export default Profile


