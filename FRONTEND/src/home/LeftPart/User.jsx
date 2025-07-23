import React from 'react';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUser } = useSocketContext();
  // Defensive check and use 'includes' not 'include'
  const isOnline = Array.isArray(onlineUser) && onlineUser.includes(user._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? 'bg-slate-700' : ''
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="bg-neutral text-neutral-content w-12 rounded-full">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Default Avatar"
              className="w-16 h-16 rounded-full"
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold">{user.fullname}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
