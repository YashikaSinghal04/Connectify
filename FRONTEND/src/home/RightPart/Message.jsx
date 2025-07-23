import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("CONNECTIFY"));
  if (!authUser || !authUser._id) return null;
  // Robust string comparison
  const itsMe = String(message.senderId) === String(authUser._id);
  console.log("authUser._id:", authUser._id, "message.senderId:", message.senderId, "itsMe:", itsMe);
  const alignClass = itsMe ? "justify-end" : "justify-start";
  const bubbleClass = itsMe ? "bg-blue-500 text-white" : "bg-gray-200 text-black";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className={`flex w-full ${alignClass} p-2`}>
      <div className={`rounded-xl px-4 py-2 max-w-xs ${bubbleClass}`} style={{wordBreak: 'break-word'}}>
          {message.message}
        <div className="text-xs text-gray-500 mt-1 text-right">{formattedTime}</div>
      </div>
    </div>
  );
}

export default Message;
