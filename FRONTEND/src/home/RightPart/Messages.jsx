import React, { useRef, useEffect } from 'react'
import Message from './Message'
import useGetMessage from '../../context/useGetMessage'
import Loading from '../../components/Loading'
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

function Messages() {
  const {loading, messages} = useGetMessage();
  const safeMessages = Array.isArray(messages) ? messages : [];
  useGetSocketMessage()
  
  console.log("Messages component - messages array:", messages);
  console.log("Messages component - safeMessages:", safeMessages);
  
  const lastMsgRef=useRef()
  
  useEffect(()=>{
    setTimeout(()=>{
      if(lastMsgRef.current){
        lastMsgRef.current.scrollIntoView({behavior:"smooth"})
      }
    },100);
  },[safeMessages]);

  if (loading) return <Loading />;

  return (
    <div className='flex-1 w-full flex flex-col overflow-y-auto' style={{minHeight:"calc(92vh - 8vh)"}}>
      {safeMessages && safeMessages.length > 0 ? (
        safeMessages.map((msg, idx) => {
          if (!msg) return null;
          return (
            <div key={msg._id || idx} ref={idx === safeMessages.length - 1 ? lastMsgRef : null}>
              <Message message={msg} />
            </div>
          );
        })
      ) : (
        <div className="flex-1 w-full flex flex-col items-center justify-center text-gray-400 p-4 min-h-[200px]">No messages</div>
      )}
    </div>
  )
}

export default Messages
