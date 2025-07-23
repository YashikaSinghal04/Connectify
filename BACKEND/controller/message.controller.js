import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../SocketIO/server.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    console.log("Sending message from", senderId, "to", receiverId);

    let convo = await Conversation.findOne({
      members: { $all: [senderId, receiverId] }
    });
    if (!convo) {
      convo = await Conversation.create({
        members: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message
    });
    if (newMessage) {
      convo.messages.push(newMessage._id);
    }
    await Promise.all([convo.save(), newMessage.save()]);
    
    console.log("Message saved, now emitting socket events");
    
    const receiverSocketId = getReceiverSocketId(receiverId);
    const senderSocketId = getReceiverSocketId(senderId);
    
    console.log("Receiver socket ID:", receiverSocketId);
    console.log("Sender socket ID:", senderSocketId);
    console.log("Global io available:", !!global.io);
    
    if (receiverSocketId && global.io) {
      console.log("Emitting to receiver:", receiverSocketId);
      global.io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    if (senderSocketId && global.io) {
      console.log("Emitting to sender:", senderSocketId);
      global.io.to(senderSocketId).emit("newMessage", newMessage);
    }
    
    console.log("Socket emissions completed");
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getMessage=async (req,res)=>{
    try{
      const {id:chatUser}=req.params;
      const senderId=req.user._id;
      // Fetch all messages where sender/receiver are either user
      const messages = await Message.find({
        $or: [
          { senderId: senderId, receiverId: chatUser },
          { senderId: chatUser, receiverId: senderId }
        ]
      }).sort({ createdAt: 1 });
      res.status(200).json(messages);
    }catch(error){
      console.log("Error in getMessage",error);
      res.status(500).json({error:"Internal server error"});  
    }
}