import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
export const AuthContext = createContext();
const Authprovider= ({children})=> {
  const initialUserState = localStorage.getItem("CONNECTIFY");
  const [authUser,setAuthUser] = useState(initialUserState?JSON.parse(initialUserState):undefined)
  return (
  
  <AuthContext.Provider value={[authUser,setAuthUser]}>
      {children}
    </AuthContext.Provider>
  )
}

export default Authprovider;

export const useAuth = () => useContext(AuthContext);