import React from 'react'
import { FaSearch } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import axios from 'axios';
import Cookies from "js-cookie"
import { useAuth } from "../../context/Authprovider";
import toast from 'react-hot-toast';

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  
  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("CONNECTIFY");
      setAuthUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className='h-[10vh]'>
      <div>
        <BiLogOutCircle
          className='text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-1'
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default Logout
