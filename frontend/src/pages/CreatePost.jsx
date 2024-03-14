import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';


const CreatePost = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);  
  const [location,setLocation] = useState('');


    // CODE TO PREVIEW PHOTO BEFORE UPLOADING IT 
  const loadfile = (event) => {
    const output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };

    setImage(event.target.files[0]);
  };



  // CODE TO CREATE POST AND SAVE IMAGE TO CLOUDINARY
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
      const response = await fetch('http://localhost:3001/createpost', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          title,
          image: cloudinaryData.url,
          location,
          timestamp: new Date().toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'})
        }),
      });

      const postData = await response.json();

      if (postData.error) {
        throw new Error('Please add all the fields');
      }

      swal({
        title: 'Post added successfully',
        icon: 'success',
        buttons: false,
        timer: 2000,
      });

      navigate('/');
    } catch (error) {
      console.error(error);

      swal({
        title: error.message || 'An error occurred',
        icon: 'error',
        buttons: false,
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };


   // IF THE USER IS NOT LOGGED IN THEN HE CANNOT SEE PROFILE PAGE
    useEffect(() => {
    const token = localStorage.getItem('jwt');
    if(!token){
    navigate('/login');
    }
    }, [])
   



  return (
    
  <>
  <div className='ml-0 md:ml-[19%]'>
    
  
         {loading ? (
        <div className='justify-center mt-48 flex'>
          <TailSpin color='gray' height={100} />
        </div>
      ) : (
        <div className='shadow-lg shadow-gray-400 w-[90%] md:w-[45%] m-auto rounded-xl pb-2 mt-32 md:mt-16'>
          <div className='flex items-center p-4'>
            <span className='m-auto'>Create new post</span>
            <button onClick={createPost} className='text-sky-500 font-medium'>
              Post
            </button>
          </div>
          <hr />
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-[90%] m-auto rounded-lg flex border p-2 my-2'
            placeholder='Caption...'
          />
          <input className='w-[90%] m-auto rounded-lg flex border p-2 my-2' type='text' placeholder='location..' value={location} onChange={(e)=>setLocation(e.target.value)} />
          <div>
            <img
              id='output'
              className='m-auto h-[250px] my-2'
              src='https://static.vecteezy.com/system/resources/previews/007/567/154/original/select-image-icon-vector.jpg'
            />
            <input
              className='flex m-auto'
              type='file'
              accept='image/*'
              onChange={loadfile}
            />
          </div>
        </div>
      )}


  </div>
  </>
  )
}

export default CreatePost
