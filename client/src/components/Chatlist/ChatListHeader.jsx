import React, { useState } from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { reducerCases } from "@/context/constants";
import { useRouter } from "next/router";
import ContextMenu from "../common/ContextMenu";
function ChatListHeader() {
  const router = useRouter();
  const [{ userInfo }, dispatch] = useStateProvider();
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
      name: "Logout",
      callback: async () => {
        setIsContextPageOpen(false);
        router.push("/logout");
      },
    },
  ];
  const handleAllContactsPage = () => {
    dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
  };
  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center">
      <div className="cursor-pointer">
        <Avatar type="sm" image={userInfo?.profileImage} />
      </div>
      <div className="flex gap-6">
        <BsFillChatLeftTextFill
          className="text-panel-header-icon cursor-pointer text-xl"
          title="New Chat"
          onClick={handleAllContactsPage}
        />
        <BsThreeDotsVertical
          className="text-panel-header-icon cursor-pointer text-xl"
          title="Menue"
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

export default ChatListHeader;
