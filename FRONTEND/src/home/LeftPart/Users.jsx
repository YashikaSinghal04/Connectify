import React from 'react';
import User from './User';
import useGetAllUsers from '../../context/userGetAllUsers';

function Users() {
  const [allUsers, loading] = useGetAllUsers();
  return (
    <div>
      <h1 className='py-2 px-8 py-2 text-white font-semibold bg-slate-800 rounded-md'>Messages</h1>
      <div className='flex-1 overflow-y-auto' style={{maxHeight:"calc(84vh - 10vh)"}}>
        {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;
