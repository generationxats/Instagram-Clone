// import React, { useState } from 'react';
// import { Avatar } from '@mui/material';
// import { PiDotsThreeBold, PiTelegramLogo } from "react-icons/pi";
// import { FiHeart } from "react-icons/fi";
// import { IoChatbubbleOutline } from "react-icons/io5";
// import { LiaTelegramPlane } from "react-icons/lia";
// import { GrSave } from "react-icons/gr";
// import { FcLike } from "react-icons/fc";
// import { IoMdClose } from "react-icons/io";
// import { MdDelete } from "react-icons/md";

// const PostDetail = ( {item,openphoto} ) => {
 
//     const [comment,setComment] = useState([]);
   

//   // CODE TO DELETE POST .....................
// const Deletepost = (postId) => {
//     if(window.confirm('Do you want to delete this post ? ')){

//         fetch(`http://localhost:3001/deletepost/${postId}`, {
//             method: 'delete',
//             headers: {
//               "Authorization": "Bearer " + localStorage.getItem('jwt')
//             },
//           })
//           .then((res) => res.json())
//           .then((result) => {
//             console.log(result);
//             window.location.reload();
//           })
//           .catch((error) => {
//             console.error("Error deleting post:", error);
//           });

//     }
  
//   };
  




  
//   return (
    
//     <div className='flex justify-center w-full h-full items-center fixed top-1' style={{ backgroundColor: 'rgb(16,16,13,0.6)' }}>
//     <span onClick={openphoto} className='fixed top-5 right-5 text-3xl text-white'>
//       <IoMdClose />
//     </span>
//     {/* left main div */}
//     <div className='w-[0] md:w-[30%] h-[450px] overflow-hidden'>
//       <img className='w-full h-auto' src={item.image}  />
//       {/* Placeholder text (x) - Please replace it with your actual content */}
//       x
//     </div>
//     {/* right main div */}
//     <div className='w-[70%] md:w-[35%] h-[520px] md:h-[450px] bg-white'>
//       {/* upper portion */}
//       <div className='flex justify-between py-4 px-4 items-center'>
//         <div className='flex items-center'>
//           <span>
//             <Avatar src='https://i.guim.co.uk/img/media/30ce5098a6e7a5886c8a8598a686d2963a4b6c00/535_899_1791_1075/master/1791.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=1533d491cc823f6952893d495a68a002' sx={{ width: 34, height: 34 }} />
//           </span>
//           <span className='ml-1'>{item.postedBy.username}<span className='ml-1 font-extrathin text-gray-400 text-sm'>.6 hours ago</span></span>
//         </div>
//         <div onClick={() => Deletepost(item._id)} className='text-2xl text-red-600'>
//           <MdDelete />
//         </div>
//       </div>
//       <hr />
//       {/* this is users' comments */}
//       <div className='h-[300px] md:h-[230px] overflow-auto'>

//       {item.comments.map((comment) => (
        
//         <div className='flex justify-between items-center p-4'>
//         <div className='flex items-center'>
//           <span> <Avatar src='https://i.guim.co.uk/img/media/30ce5098a6e7a5886c8a8598a686d2963a4b6c00/535_899_1791_1075/master/1791.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=1533d491cc823f6952893d495a68a002' sx={{ width: 34, height: 34 }} /></span>
//           <span className='grid'>
//             <span className='ml-2 font-medium'>{comment.postedBy.username}<span className='ml-2 text-sm font-normal'>{comment.comment}</span></span>
//             <span className='text-sm space-x-2 ml-4'>
//               <span className='text-gray-400'>35m</span>
//               <span>like</span>
//               <span>Reply</span>
//               <span>translate</span>
//             </span>
//           </span>
//         </div>
//         <div><FiHeart /></div>
//       </div>

//       ))}
        

//       </div>
//       {/* like, comment, and share icons */}
//       <div className='flex justify-between items-center text-2xl p-4 border-t'>
//         <div className='flex gap-4'>
          
//       {
//         item.likes.includes(JSON.parse(localStorage.getItem('user'))._id)
//         ?
//         (<span onClick={()=>{unlikePost(item._id)}}><FcLike/></span>)
//         :
//         (<span onClick={()=>{likePost(item._id)}}><FiHeart/></span>)
//       }
//           <span><IoChatbubbleOutline /></span>
//           <span><PiTelegramLogo /></span>
//         </div>
//         <div><GrSave /></div>
//       </div>
//       {/* total like counts */}
//       <p className='text-sm font-medium ml-4'>{item.likes.length} likes</p>
//       <p className='text-sm text-gray-400 ml-4 border-b pb-2'>{item.title}</p>
//       {/* add a new comment */}
//       <div className='flex justify-around items-center'>
//         <input value={comment} 
//             onChange={(e) => {
//               setComment(e.target.value);
//             }} className='w-[70%] p-2' type='text' placeholder='Add a comment....' />
//         <button onClick={() => addComment(comment, item._id)}  className='font-medium text-sky-500'>Post</button>
//       </div>
//       {/* right main div ends up here */}
//     </div>
//     {/* comment div end up here */}
//   </div>


//   )
// }

// export default PostDetail






import React from 'react';
import { Avatar } from '@mui/material';
import { PiTelegramLogo } from "react-icons/pi";
import { FiHeart } from "react-icons/fi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { LiaTelegramPlane } from "react-icons/lia";
import { GrSave } from "react-icons/gr";
import { FcLike } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const PostDetail = ({ item,openphoto }) => {




  // CODE TO DELETE POST .....................
const Deletepost = (postId) => {
    if(window.confirm('Do you want to delete this post ? ')){

        fetch(`http://localhost:3001/deletepost/${postId}`, {
            method: 'delete',
            headers: {
              "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
          })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error deleting post:", error);
          });
    }
  };



  return (
    
  <>
  
  
       {/* this is main div  */}
    <div className='flex justify-center w-full h-full items-center fixed top-1' style={{ backgroundColor: 'rgb(16,16,13,0.6)' }}>
      <span
        onClick={openphoto}
        className='fixed top-5 right-5 text-3xl text-white'>
        <IoMdClose />
      </span>
      {/* left main div */}
      <div className='w-[0] md:w-[30%] h-[450px] overflow-hidden'>
        <img className='w-full h-auto' src={item.image}  />
        {/* Placeholder text (x) - Please replace it with your actual content */}
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
          <div onClick={()=>{Deletepost(item._id)}} className='text-2xl text-red-600'>
            <MdDelete />
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
          {/* <input value={comment} 
              onChange={(e) => {
                setComment(e.target.value);
              }} className='w-[70%] p-2' type='text' placeholder='Add a comment....' />
          <button onClick={() =>{addComment(comment,item._id);opencommentpage()}} className='font-medium text-sky-500'>Post</button> */}
        </div>
        {/* right main div ends up here */}
      </div>
      {/* comment div end up here */}
    </div>
  
  
  
  
  </>

  )
}

export default PostDetail



