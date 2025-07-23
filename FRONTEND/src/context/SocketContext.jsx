import { useState, useEffect } from 'react'
import { createContext } from 'react'
const socketContext = createContext()
import io from "socket.io-client"
import { useAuth } from "./Authprovider"
import { useContext } from 'react'

export const useSocketContext=()=>{
    return useContext(socketContext)
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUser,setOnlineUser]  = useState([])
    const [authUser] = useAuth()

    useEffect(() => {
        console.log("AuthUser in SocketContext:", authUser);
        
        if (authUser && authUser._id) {
            console.log("Creating socket connection for user:", authUser._id);
            
            const socket = io("http://localhost:4002", {
                query: {
                    userId: authUser._id,
            },
        });
            
            socket.on("connect", () => {
                console.log("Socket connected successfully with ID:", socket.id);
            });
            
            socket.on("connect_error", (error) => {
                console.log("Socket connection error:", error);
            });
            
        setSocket(socket);
            
            socket.on("getOnlineUsers",(users)=>{
                console.log("Received online users:", users);
                setOnlineUser(users);
            });
            
            return()=>{
                console.log("Closing socket connection");
                socket.close();
            };

        }else{
            console.log("No authUser, closing socket if exists");
            if(socket){
                socket.close()
                setSocket(null);
            }
    }
    }, [authUser]);
    
    return (
        <socketContext.Provider value={{ socket, onlineUser }}>
            {children}
        </socketContext.Provider>
    )
}