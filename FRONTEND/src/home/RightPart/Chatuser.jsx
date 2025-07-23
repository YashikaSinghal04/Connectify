import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';
function Chatuser() {
  
  const { selectedConversation } = useConversation();
  const { onlineUser } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return Array.isArray(onlineUser) && onlineUser.includes(userId) ? "Online" : "Offline";
  }
  console.log(selectedConversation);
  if (!selectedConversation) {
    return <div className='flex items-center justify-center h-[8vh] bg-gray-800 text-gray-400'>No user selected</div>;
  }
  return (
    <div className='flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300'>
          <div className="avatar avatar-online avatar-placeholder">
          <div className="  w-16 rounded-full">
           <img
  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
 
/>

          </div>
        </div>
        <div>
        <h1 className='text-xl'>{selectedConversation.fullname}</h1>
        <span className='text-sm'>{getOnlineUsersStatus(selectedConversation._id)}</span>
      </div>
    </div>
  )
}

export default Chatuser
