import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import TypeSend from "./TypeSend.jsx";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/Authprovider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="w-full h-screen flex flex-col bg-slate-900 text-gray-300">
      <div className="flex-1 flex flex-col">
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <Chatuser />
            <div
              className=" flex-1 overflow-y-auto"
              style={{ maxHeight: "calc(92vh - 8vh)" }}
            >
              <Messages />
            </div>
            <TypeSend />
          </>
        )}
      </div>
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  console.log(authUser);
  return (
    <>
    <label
    htmlFor="my-drawer-2"
    className="btn btn-ghost drawer-button lg:hidden absolute left-5">
      <CiMenuFries className="text-white text-xl"/>
    </label>
    <div className="flex flex-1 items-center justify-center h-full w-full">
      <h1 className="text-center">
        Welcome{" "}
        <span className="font-semibold text-xl">
          {authUser.fullname}
        </span>
        <br />
        No chat selected, please start conversation by selecting anyone to
        your contacts
      </h1>
    </div>
    </>
  );
};