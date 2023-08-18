import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { HOST } from "@/utils/ApiRoutes";
import { calculateTime } from "@/utils/CalculateTime";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import dynamic from "next/dynamic";
const VoiceMessage = dynamic(() => import("./VoiceMessage"), { ssr: false });

function SearchMessages() {
  const [{ currentChatUser, messages }, dispatch] = useStateProvider();
  const [seacrhTerm, setSeacrhTerm] = useState("");
  const [searchedMessages, setSearchedMessages] = useState([]);
  const [imageMessages, setImageMessages] = useState([]);
  const [audioMessages, setAudioMessages] = useState([]);

  useEffect(() => {
    setImageMessages(messages.filter((message) => message.type === "image"));
    setAudioMessages(messages.filter((message) => message.type === "audio"));

    if (seacrhTerm) {
      setSearchedMessages(
        messages.filter(
          (message) =>
            message.type === "text" && message.message.includes(seacrhTerm)
        )
      );
    } else {
      setSearchedMessages([]);
    }
  }, [seacrhTerm]);

  return (
    <div className="border-conversation-border border-l bg-conversation-panel-background flex flex-col z-10 max-h-screen">
      <div className="h-16 px-4 py-5 flex gap-10 items-center bg-panel-header-background text-primary-strong">
        <IoClose
          className="cursor-pointer text-icon-lighter text-2xl"
          onClick={() => {
            dispatch({
              type: reducerCases.SET_MESSAGE_SEARCH,
            });
            setImageMessages([]);
            setAudioMessages([]);
          }}
        />
        <span>Search Messages</span>
      </div>
      <div className="overflow-auto custom-scrollbar h-2/5">
        <div className="flex items-center flex-col w-full">
          <div className="flex px-5 items-center gap-3 h-14 w-full">
            <div className="bg-panel-header-background flex items-center  gap-5 px-3 py-1 rounded-lg flex-grow w-full">
              <div>
                <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-lg" />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Search Messages"
                  className="bg-transparent text-sm focus:outline-none text-white w-full"
                  value={seacrhTerm}
                  onChange={(e) => setSeacrhTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <span className="mt-2 text-secondary">
            {!seacrhTerm.length &&
              `Search for messages with ${currentChatUser.name}`}
          </span>
        </div>
        <div className="flex justify-center h-full flex-col">
          {seacrhTerm.length > 0 && !searchedMessages.length && (
            <span className="text-secondary w-full flex justify-center">
              No Messages Found
            </span>
          )}
          <div className="flex flex-col w-full h-full">
            {searchedMessages.reverse().map((message) => (
              <div className="flex cursor-pointer flex-col justify-center hover:bg-background-default-hover w-full px-5 border-b-[0.1px] border-secondary py-5">
                <div className="text-sm text-secondary">
                  {calculateTime(message.createdAt)}
                </div>
                <div className="text-icon-green">{message.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-1/2 border-t-2">
        <div className="overflow-auto custom-scrollbar h-1/2 border-t-2">
          <div className="flex flex-col justify-center my-4">
            {!imageMessages.length > 0 ? (
              <span className="text-secondary w-full flex justify-center">
                No Images Found
              </span>
            ) : (
              <span className="text-secondary w-full flex justify-center">
                Image Messages
              </span>
            )}
            <div className="flex overflow-x-scroll custom-scrollbar ">
              {imageMessages.reverse().map((message) => (
                <div className="flex    cursor-pointer  hover:bg-background-default-hover w-full px-5  border-secondary py-5 ">
                  <div className="flex flex-col gap-2 h-full w-40">
                    <Image
                      src={`${HOST}/${message.message}`}
                      className="rounded-lg"
                      alt="asset"
                      height={70}
                      width={70}
                    />
                    <div className="text-sm text-secondary">
                      {calculateTime(message.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="overflow-auto custom-scrollbar h-1/2 border-t-2">
          <div className="flex flex-col justify-center my-4">
            <div>
              {!audioMessages.length > 0 ? (
                <span className="text-secondary w-full flex justify-center">
                  No Audio Found
                </span>
              ) : (
                <span className="text-secondary w-full flex justify-center">
                  Audio Messages
                </span>
              )}
            </div>
            <div className="flex flex-col overflow-y-scroll custom-scrollbar ">
              {audioMessages.reverse().map((message) => (
                <div className="flex    cursor-pointer   hover:bg-background-default-hover w-full px-5  border-secondary py-5  ">
                  <div className="flex flex-col gap-2 ">
                    <VoiceMessage message={message} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchMessages;
