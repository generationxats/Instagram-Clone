import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { PiDotsThreeBold, PiTelegramLogo } from "react-icons/pi";
import { FiHeart } from "react-icons/fi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { LiaTelegramPlane } from "react-icons/lia";
import { GrSave } from "react-icons/gr";
import { useNavigate,Link } from 'react-router-dom';
import { FcLike } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";



const Myfollowingposts = () => {

  const navigate = useNavigate();
  const [data,setData] = useState([]);
  const [comment,setComment] = useState([]);
  const [show,setShow] = useState(false);
  const [item,setItem] = useState([]);
  



  // IF THE USER IS NOT LOGGED IN THEN HE CAN NOT SEE HOMEPAGE..............
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/login');
    }
  
    // CODE TO SHOW ALL FOLLOWING POSTS TO HOME PAGE....................
    fetch('http://localhost:3001/myfollowingpost', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      },
    })
      .then(res => res.json())
      .then(result => {
        setData(result);
      })
      .catch(err => console.log(err));
  }, []);
  


  // CODE TO LIKE POST
  const likePost = (id) => {
    const newData = data.map((createdposts) => {
      if (createdposts._id === id) {
        return {
          ...createdposts,
          likes: [...createdposts.likes, JSON.parse(localStorage.getItem('user'))._id],
        };
      } else {
        return createdposts;
      }
    });
    setData(newData);
    // Make the API call
    fetch('http://localhost:3001/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
      })
      .catch((error) => {
        setData(data);
        console.error('Error liking post:', error);
      });
  };




  // CODE TO UNLIKE POST
  const unlikePost = (id) => {
    const newData = data.map((createdposts) => {
      if (createdposts._id === id) {
        return {
          ...createdposts,
          likes: createdposts.likes.filter((like) => like !== JSON.parse(localStorage.getItem('user'))._id),
        };
      } else {
        return createdposts;
      }
    });
    setData(newData);
    fetch('http://localhost:3001/unlike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
      })
      .catch((error) => {
        setData(data);
        console.error('Error unliking post:', error);
      });
  };



  // CODE TO ADD COMMENT
  const addComment = (text,id) => {
    fetch('http://localhost:3001/comment', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then(res => res.json())
      .then((result) => {
        const newData = data.map((createdposts)=>{
          if(createdposts._id == result._id){
            return result
          } else {
            return createdposts
          }
        })
        setData(newData);
        setComment('');
        console.log(result);
        window.location.reload();
      })
  }




     // CODE TO OPEN COMMENT PAGE...................
   const opencommentpage = (createdposts) => {
    
    if(show){
      setShow(false);
    }else{
      setShow(true);
      setItem(createdposts);
    }

   };



  return (
    
  <>
  <div className='ml-0 md:ml-[19%] flex'>


  
   <div className=' w-full md:w-[70%]'>

    {/* this is stories section */}
    <div className=' flex gap-4 overflow-hidden py-4 md:py-8 px-2'>
      <span><Avatar src='https://imageio.forbes.com/specials-images/imageserve/627bd53a3a4d3cd7729717cc/0x0.jpg?format=jpg&crop=1069,1070,x707,y83,safe&height=416&width=416&fit=bounds' sx={{width:60, height:60, border:'2px solid purple'}} /></span>
      <span><Avatar src='https://icdn.football-espana.net/wp-content/uploads/2023/06/Kylian-Mbappe-PSG-042922-169.jpg' sx={{width:60, height:60, border:'2px solid purple'}} /></span>
      <span><Avatar src='https://ew.com/thmb/4pgQGiJuJkiOs-rH_C-T62P8jGg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/The-Weeknd-c1ee39aa91df4baf91560c1b07e71ad8.jpg' sx={{width:60, height:60, border:'2px solid purple'}} /></span>
      <span><Avatar src='https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202309/roman-reigns-013032-3x4.jpg?VersionId=Pc5S147YeAVEFkk2X8PZSm4DbX9anJWK' sx={{width:60, height:60, border:'2px solid purple'}} /></span>
      <span><Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5DiKw0odJcSy75teXMN5yrYY40NqTERwArK6JimRKe_Mm8jnsNfhXeDkQ7i7kGHwQOvI&usqp=CAU' sx={{width:60, height:60, border:'2px solid purple'}} /></span>
      <span><Avatar src='https://img.etimg.com/thumb/width-1200,height-1200,imgsize-26053,resizemode-75,msid-44406506/news/politics-and-nation/too-woo-youth-inld-ropes-in-yo-yo-honey-singh.jpg' sx={{width:60, height:60, border:'2px solid purple'}} /></span>
      <span><Avatar src='https://i.pinimg.com/originals/ab/29/11/ab2911f7a88a9d75966bb5c318e438b3.jpg' sx={{width:60, height:60, border:'2px solid purple'}} /></span>
      <span><Avatar src='https://cdn.wrestletalk.com/wp-content/uploads/2023/12/cm-punk-december-13-a.jpg' sx={{width:60, height:60, border:'2px solid purple'}} /></span>
      <span><Avatar src='https://i.pinimg.com/736x/21/71/11/217111854be30c005fc40d98e8958be0.jpg' sx={{width:60, height:60, border:'2px solid purple'}} /></span>
    </div>
    

    {/* this is all posts section */}
    {
      data.map((createdposts, index) => (
        <div className=' w-full md:w-[65%] m-auto mt-4 md:mt-0' key={createdposts._id}>
        {/* this is upper section */}
         <div className='flex items-center justify-between py-2 px-4 md:px-0'>
         <div className='flex items-center'>
         <Link to={`/otheruserprofile/${createdposts.postedBy._id}`} >
         <Avatar
          src={createdposts.postedBy.profilephoto ? createdposts.postedBy.profilephoto : ''} 
           sx={{ width: 34, height: 34 }}/>
         </Link>  
         <span className='grid ml-2'>
         <span className='font-semibold text-sm'>{createdposts.postedBy.username}<span className='text-gray-400 ml-2'>.{createdposts.timestamp}</span></span>
         <span className='text-sm font-normal'>{createdposts.location}</span>
         </span>
         </div>  
         <div className='text-2xl'>
         <PiDotsThreeBold/>
         </div>
         </div>
         {/* this is image section */}
        <div className='mt-1'>
        <img onClick={()=>{opencommentpage(createdposts)}} className='w-full h-auto rounded-md overflow-hidden' src={createdposts.image} />
        </div>
        {/* this is like, comment, share and save icon */}
        <div className='flex justify-between mt-3 px-4 md:px-0'>
        <div className='flex gap-4 text-2xl'>
            {
          createdposts.likes.includes(JSON.parse(localStorage.getItem('user'))._id)
          ?
          (<span onClick={()=>{unlikePost(createdposts._id)}}><FcLike/></span>)
          :
          (<span onClick={()=>{likePost(createdposts._id)}}><FiHeart/></span>)
           }
        <span onClick={()=>{opencommentpage(createdposts)}}><IoChatbubbleOutline/></span>
        <span><LiaTelegramPlane/></span>
        </div>
         <div className='text-2xl'>
           <span><GrSave/></span>
         </div>
         </div>
         {/* this is like count,caption and comment section */}
        <div className='mt-1 px-4 md:px-0'>
        <p>{createdposts.likes.length}<span className='font-medium ml-1'>likes</span></p>
        <p><span className='font-medium mr-1'>{createdposts.postedBy.username}</span>{createdposts.title}</p>
        <p onClick={()=>{opencommentpage(createdposts)}} className='font-medium text-gray-500 cursor-pointer'>view all comments</p>
        </div> 
       <div className='flex justify-between pb-3 px-4 md:px-0'>
         <input
          className='p-1 w-[90%]'
          type='text'
          placeholder='Add a comment'
              value={comment[index]} 
              onChange={(e) => {
                const newComments = [...comment];
                newComments[index] = e.target.value;
                setComment(newComments);
              }}
        />
        <button onClick={() => addComment(comment[index], createdposts._id)} className='mr-4 font-medium text-sky-600 bg-slate-100 px-2 py-0 rounded-lg ml-4'>Post</button>
         </div>
         <hr/>
      </div>
      ))
    }
  </div>

  

              {/* THIS IS SUGGESTIONS SECTION */}
  <div className='w-[30%] hidden md:block px-4 mt-12'>
    <div className='flex items-center justify-between py-2 px-4 md:px-0'>
       <div className='flex items-center'>
       <Link to='/' >
       <Avatar src='https://i.pinimg.com/736x/21/71/11/217111854be30c005fc40d98e8958be0.jpg' sx={{ width: 40, height: 40 }}/>
       </Link>  
       <span className='grid ml-2'>
       <span className='font-semibold text-sm'>username</span>
       <span className='text-sm font-normal'>name.......</span>
       </span>
       </div>  
       <div className='text-blue-500 font-semibold text-sm'>
       switch
       </div>
       </div>
       <div className='flex justify-between text-sm mt-4'>
        <span className='text-gray-400 font-bold'>Suggested for you</span>
        <span>See All</span>
       </div>
       <div className='mt-2 flex items-center justify-between py-2 px-4 md:px-0'>
       <div className='flex items-center'>
       <Link to='/' >
       <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrQovjuedjNLbzQWKvoNnynrxlNcfXXOBYlrKSLZ6KeoCG9dcVZ0epM3ZW_WICHM4Q-Sw&usqp=CAU' sx={{ width: 40, height: 40 }}/>
       </Link>  
       <span className='grid ml-2'>
       <span className='font-semibold text-sm'>Berlin</span>
       <span className='text-sm font-normal'>berlinpactice</span>
       </span>
       </div>  
       <div className='text-blue-500 font-semibold text-sm'>
       follow
       </div>
       </div>
       <div className='mt-2 flex items-center justify-between py-2 px-4 md:px-0'>
       <div className='flex items-center'>
       <Link to='/' >
       <Avatar src='https://i.pinimg.com/736x/21/71/11/217111854be30c005fc40d98e8958be0.jpg' sx={{ width: 40, height: 40 }}/>
       </Link>  
       <span className='grid ml-2'>
       <span className='font-semibold text-sm'>itskane_99</span>
       <span className='text-sm font-normal'>kane williamson</span>
       </span>
       </div>  
       <div className='text-blue-500 font-semibold text-sm'>
       follow
       </div>
       </div>
       <div className='mt-2 flex items-center justify-between py-2 px-4 md:px-0'>
       <div className='flex items-center'>
       <Link to='/' >
       <Avatar src='https://i.pinimg.com/736x/c7/03/27/c703277364c5077d7588ac56445e15de.jpg' sx={{ width: 40, height: 40 }}/>
       </Link>  
       <span className='grid ml-2'>
       <span className='font-semibold text-sm'>danii</span>
       <span className='text-sm font-normal'>dani daniels</span>
       </span>
       </div>  
       <div className='text-blue-500 font-semibold text-sm'>
       follow
       </div>
       </div>
       <div className='mt-2 flex items-center justify-between py-2 px-4 md:px-0'>
       <div className='flex items-center'>
       <Link to='/' >
       <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNyBbnJ0b0nTladwDdsDUT0mgDbzrzcsDidMfdZnyDgU67RL4MWly31kBs5vewQ1MgGRE&usqp=CAU' sx={{ width: 40, height: 40 }}/>
       </Link>  
       <span className='grid ml-2'>
       <span className='font-semibold text-sm'>steveroggers</span>
       <span className='text-sm font-normal'>catpainroggers</span>
       </span>
       </div>  
       <div className='text-blue-500 font-semibold text-sm'>
       follow
       </div>
       </div>
       <div className='flex gap-1 text-sm text-gray-400 mt-12'>
        <span className='hover:underline'>About</span>
        <span className='hover:underline'>.Help</span>
        <span className='hover:underline'>.Press</span>
        <span className='hover:underline'>.API</span>
        <span className='hover:underline'>.Jobs</span>
        <span className='hover:underline'>.Privacy</span>
        <span className='hover:underline'>.Terms</span>
       </div>
       <div className='flex gap-1 text-sm text-gray-400 mt-1'>
        <span className='hover:underline'>Location</span>
        <span className='hover:underline'>.Language</span>
        <span className='hover:underline'>.Meta Verified</span>
       </div>
       <div className='flex gap-1 text-sm text-gray-400 mt-4'>
        &copy; 2024 INSRAGRAM FROM META
       </div>
  </div>






     {/* CODE TO OPEN COMMENT PAGE STARTS HERE ............................ */}
 {
  show && (
    /* this is main div */
    <div className='flex justify-center md:justify-start w-full h-full items-center fixed top-1' style={{ backgroundColor: 'rgb(16,16,13,0.6)' }}>
      <span onClick={opencommentpage} className='fixed top-5 right-5 text-3xl text-white'>
        <IoMdClose />
      </span>
      {/* left main div */}
      <div className='w-[0] md:w-[30%] h-[450px] overflow-hidden'>
        <img className='w-full h-auto' src={item.image}  />
        {/* Placeholder text (x) - Please replace it with your actual content */}
        x
      </div>
      {/* right main div */}
      <div className='w-[70%] md:w-[35%] h-[520px] md:h-[450px] bg-white'>
        {/* upper portion */}
        <div className='flex justify-between py-4 px-4 items-center'>
          <div className='flex items-center'>
            <span>
              <Avatar src='' sx={{ width: 34, height: 34 }} />
            </span>
            <span className='ml-1 text-sm font-semibold'>{item.postedBy.username}<span className='ml-1 font-extrathin text-gray-400 text-sm'>.{item.timestamp}</span></span>
          </div>
          <div className='text-2xl'>
            <PiDotsThreeBold />
          </div>
        </div>
        <hr />
        {/* this is users' comments */}
        <div className='h-[300px] md:h-[230px] overflow-auto'>

                 {item.comments.map((comment) => (
                    <div className='flex justify-between items-center p-4'>
                    <div className='flex items-center'>
                      <span> <Avatar src='' sx={{ width: 34, height: 34 }} /></span>
                      <span className='grid'>
                        <span className='ml-2 font-medium text-sm'>{comment.postedBy.username}<span className='ml-2 text-sm font-normal'>{comment.comment}</span></span>
                        <span className='text-sm space-x-2 ml-4'>
                          <span className='text-gray-400'>35m</span>
                          <span>like</span>
                          <span>Reply</span>
                          <span>translate</span>
                        </span>
                      </span>
                    </div>
                    <div><FiHeart /></div>
                  </div>
                  ))}

        </div>
        {/* like, comment, and share icons */}
        <div className='flex justify-between items-center text-2xl p-4 border-t'>
          <div className='flex gap-4'>

        {
          item.likes.includes(JSON.parse(localStorage.getItem('user'))._id)
          ?
          (<span onClick={()=>{unlikePost(item._id)}}><FcLike/></span>)
          :
          (<span onClick={()=>{likePost(item._id)}}><FiHeart/></span>)
        }

            <span><IoChatbubbleOutline /></span>
            <span><PiTelegramLogo /></span>
          </div>
          <div><GrSave /></div>
        </div>
        {/* total like counts */}
        <p className='text-sm font-medium ml-4'><span>{item.likes.length}</span> likes</p>
        <p className='text-sm text-gray-400 ml-4 border-b pb-2'>{item.title}</p>
        {/* add a new comment */}
        <div className='flex justify-around items-center'>
          <input value={comment} 
              onChange={(e) => {
                setComment(e.target.value);
              }} className='w-[70%] p-2' type='text' placeholder='Add a comment....' />
          <button onClick={() =>{addComment(comment,item._id);opencommentpage()}} className='font-medium text-sky-500'>Post</button>
        </div>
        {/* right main div ends up here */}
      </div>
      {/* comment div end up here */}
    </div>
    
   )
 }

 {/* CODE TO OPEN COMMENT PAGE ENDS HERE ............................ */}


  </div>
  </>


  )
}

export default Myfollowingposts






