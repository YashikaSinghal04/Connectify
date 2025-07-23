import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../zustand/useConversation.js";
import sound from "../assets/sound.mp3";
import { useAuth } from "./Authprovider";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessage, selectedConversation } = useConversation();
  const [authUser] = useAuth();

  // Play notification sound
  const playNotification = () => {
    try {
      const audio = new Audio(sound);
      audio.play();
    } catch (error) {
      console.log("Error playing notification sound:", error);
    }
  };

  React.useEffect(() => {
    console.log("Socket connection status:", socket ? "Connected" : "Not connected");
    console.log("Current selectedConversation:", selectedConversation);
    
    if (socket) {
      const handleNewMessage = (message) => {
        console.log("Received newMessage event:", message);
        console.log("Current messages before update:", messages);
        
        setMessage((prev) => {
          console.log("Previous messages in setMessage:", prev);
          const newMessages = [...prev, message];
          console.log("New messages array:", newMessages);
          return newMessages;
        });
        // Only play notification if the message is NOT sent by the current user
        if (authUser && message.senderId !== authUser._id) {
          playNotification();
        }
      };

      socket.on("newMessage", handleNewMessage);

      // Add connection event listeners for debugging
      socket.on("connect", () => {
        console.log("Socket connected with ID:", socket.id);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
    });

      socket.on("connect_error", (error) => {
        console.log("Socket connection error:", error);
      });
      
    return () => {
        console.log("Cleaning up socket listeners");
        socket.off("newMessage", handleNewMessage);
        socket.off("connect");
        socket.off("disconnect");
        socket.off("connect_error");
    };
    }
  }, [socket, setMessage, selectedConversation, messages, authUser]);
};

export default useGetSocketMessage;