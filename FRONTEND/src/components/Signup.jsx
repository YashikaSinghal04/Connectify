import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios"
import { useAuth } from '../context/Authprovider';
import { Link } from 'react-router-dom';
function Signup() {
  const [authUser,setAuthUser]=useAuth()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // watch the password and confirm password fields
  const password = watch("password","");
  const confirmPassword = watch("confirmPassword","");

  const validatePasswordMatch=(value)=>{
    return value===password || "password do not match"
  }

 const onSubmit = async (data) => {
  const userInfo = {
    fullname: data.fullname,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
  };

  try {
    const response = await axios.post("/api/user/signup", userInfo);
    if (response.data) {
      alert("Signup successful");
      localStorage.setItem("CONNECTIFY", JSON.stringify(response.data));
      setAuthUser(response.data);
    }
  } catch (error) {
    console.error("Signup error:", error);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-gray-700 text-white p-8 rounded-xl shadow-md space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-center">CONNECTIFY</h1>
          <p className="text-center text-gray-300 mt-1">Create your account</p>
        </div>

        {/* Full Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm">Full Name</label>
          <input
            id="name"
            placeholder="Your name"
            {...register("fullname", { required: true })}
            className="bg-gray-800 border border-gray-600 rounded px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fullname && <span className="text-red-400 text-sm mt-1">This field is required</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm">Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            {...register("email", { required: true })}
            className="bg-gray-800 border border-gray-600 rounded px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <span className="text-red-400 text-sm mt-1">This field is required</span>}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-sm">Password</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            {...register("password", { required: true })}
            className="bg-gray-800 border border-gray-600 rounded px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <span className="text-red-400 text-sm mt-1">This field is required</span>}
        </div>

    {/* Confirm Password */}
<div className="flex flex-col">
  <label htmlFor="confirmPassword" className="mb-1 text-sm">Confirm Password</label>
  <input
    type="password"
    id="confirmPassword"
    placeholder="********"
    {...register("confirmPassword", {
      required: "This field is required",
      validate: validatePasswordMatch
    })}
    className="bg-gray-800 border border-gray-600 rounded px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {errors.confirmPassword && <span className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</span>}
</div>


        {/* Submit */}
        <div className="flex flex-col items-center">
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-2 rounded font-semibold">
            Sign Up
          </button>
          <p className="text-sm text-gray-300 mt-3">
            Already have an account? <Link to="/login" className="text-blue-400 underline cursor-pointer">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
