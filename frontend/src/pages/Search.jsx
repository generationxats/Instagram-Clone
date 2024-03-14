import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";

const Search = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch(`http://localhost:3001/searchUser?search=${search}`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt')
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    if (search.trim() === '') {
      setData([]);
      return;
    }

    fetchUsers();
  }, [search, navigate]);

  return (
    <div className='ml-0 md:ml-[19%] px-1 py-2'>
      <div className='gap-2 items-center flex'>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='p-2 ml-1 my-1 w-[90%] rounded-lg border'
          placeholder='search...'
        />
        <span className='text-xl'><CiSearch /></span>
      </div>

      {loading && <p className='text-center text-gray-300 text-xl my-4'>Loading...</p>}

      {data.length === 0 && !loading && (
      <p className='text-center text-gray-300 text-xl my-4'>
       {search.trim() === '' ? 'Search users' : `No user found - ${search}`}
       </p>
       )}


      {data.map((createdposts) => (
        <Link
          to={`/otheruserprofile/${createdposts._id}`}
          className=' ml-1 md:ml-4 w-[90%] md:w-[60%] mx-1 my-2 p-2 rounded-lg flex gap-2 items-center bg-gray-100 hover:bg-gray-50'
          key={createdposts._id}
        >
          <span>
            <Avatar src={createdposts.profilephoto} sx={{ width: 40, height: 40 }} />
          </span>
          <span>{createdposts.username}</span>
        </Link>
      ))}
    </div>
  );
};

export default Search;

