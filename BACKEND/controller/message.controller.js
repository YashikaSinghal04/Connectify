import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../SocketIO/server.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

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
    
    const receiverSocketId = getReceiverSocketId(receiverId);
    const senderSocketId = getReceiverSocketId(senderId);
    
    if (receiverSocketId && global.io) {
      global.io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    if (senderSocketId && global.io) {
      global.io.to(senderSocketId).emit("newMessage", newMessage);
    }
    
    res.status(201).json(newMessage);
  } catch (error) {
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
      res.status(500).json({error:"Internal server error"});  
    }
}