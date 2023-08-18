import React, { useEffect, useState } from "react";
import Avatar from "../common/Avatar";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import ContextMenu from "../common/ContextMenu";
function ChatHeader() {
  const [{ currentChatUser, onlineUsers }, dispatch] = useStateProvider();
  const [currentUser, setCurrentUser] = useState({});
  const [isContextPageOpen, setIsContextPageOpen] = useState(false);

  const [contextMenueCordinates, setContextMenueCordinates] = useState({
    x: 0,
    y: 0,
  });
  const showContextMenue = (e) => {
    e.preventDefault();
    setContextMenueCordinates({ x: e.pageX - 50, y: e.pageY + 20 });
    setIsContextPageOpen(true);
  };
  const contextMenueOptions = [
    {
      name: "Exit",
      callback: async () => {
        dispatch({ type: reducerCases.SET_EXIT_CHAT });
      },
    },
  ];
  useEffect(() => {
    setCurrentUser(currentChatUser);
  }, [currentChatUser]);

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background z-10 ">
      <div className="flex items-center justify-center gap-6 ">
        <div className="relative">
          <Avatar type="sm" image={currentChatUser?.profilePicture} />
          {onlineUsers.includes(currentChatUser.id) ? (
            <div className="absolute bg-icon-green rounded-full  h-3 w-3 bottom-0 right-[-10px]" />
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-primary-strong">{currentUser?.name}</span>
          <span className="text-secondary text-sm">
            {onlineUsers.includes(currentChatUser.id) ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <div className="flex gap-6">
        <MdCall
          className="text-panel-header-icon cursor-pointer text-xl"
          onClick={() =>
            alert(
              "Currently not functionable. Will include in further updates :)"
            )
          }
        />
        <IoVideocam
          className="text-panel-header-icon cursor-pointer text-xl"
          onClick={() =>
            alert(
              "Currently not functionable. Will include in further updates :)"
            )
          }
        />
        <BiSearchAlt2
          className="text-panel-header-icon cursor-pointer text-xl"
          onClick={() => dispatch({ type: reducerCases.SET_MESSAGE_SEARCH })}
        />
        <BsThreeDotsVertical
          className="text-panel-header-icon cursor-pointer text-xl"
          onClick={(e) => showContextMenue(e)}
          id="context-opener"
        />
        {isContextPageOpen && (
          <ContextMenu
            options={contextMenueOptions}
            cordinates={contextMenueCordinates}
            contextMenue={isContextPageOpen}
            setContextMenue={setIsContextPageOpen}
          />
        )}
      </div>
    </div>
  );
}

export default ChatHeader;
