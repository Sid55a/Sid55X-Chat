import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { ADD_MESSAGES, Add_IMAGE_MESSSAGE_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import PhotoPicker from "../common/PhotoPicker";
import dynamic from "next/dynamic";
const CaptureAudio = dynamic(() => import("../common/CaptureAudio"), {
  ssr: false,
});

function MessageBar() {
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showAudioRecorder, setShowAudioRecorder] = useState(false);

  const emojiPickerRef = useRef(null);
  const handleEmojiClick = (e) => {
    setMessage((prev) => (prev += e.emoji));
  };
  const handleEmojiModel = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const sendMessage = async () => {
    try {
      const { data } = await axios.post(ADD_MESSAGES, {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message,
      });

      socket.current.emit("send-msg", {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message: data.message,
      });

      dispatch({
        type: reducerCases.ADD_MESSAG,
        newMessage: { ...data?.message },
        fromSelf: true,
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const photoPickerChange = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(Add_IMAGE_MESSSAGE_ROUTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          from: userInfo?.id,
          to: currentChatUser?.id,
        },
      });
      if (response.status === 201) {
        socket.current.emit("send-msg", {
          to: currentChatUser?.id,
          from: userInfo?.id,
          message: response?.data?.message,
        });

        dispatch({
          type: reducerCases.ADD_MESSAG,
          newMessage: { ...response?.data?.message },
          fromSelf: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      };
    }
  }, [grabPhoto]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.id !== "emoji-open") {
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(e.target)
        ) {
          setShowEmojiPicker(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
      <>
        {!showAudioRecorder && (
          <>
            <div className="flex gap-6">
              <BsEmojiSmile
                className="text-panel-header-icon cursor-pointer text-xl"
                title="Emoji"
                id="emoji-open"
                onClick={handleEmojiModel}
              />
              {showEmojiPicker && (
                <div
                  className="absolute bottom-24 left-16 z-40"
                  ref={emojiPickerRef}
                >
                  <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
                </div>
              )}
              <ImAttachment
                className="text-panel-header-icon cursor-pointer text-xl"
                title="Atach File"
                onClick={() => setGrabPhoto(true)}
              />
            </div>
            <div className="w-full rounded-lg h-10 flex items-center">
              <input
                type="text"
                placeholder="Type a message"
                className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full "
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>
            <div className="flex w-10 items-center justify-center gap-3">
              {message?.length ? (
                <button>
                  <MdSend
                    className="text-panel-header-icon cursor-pointer text-xl"
                    title="Send Message"
                    onClick={sendMessage}
                  />
                </button>
              ) : (
                <button>
                  <FaMicrophone
                    className="text-panel-header-icon cursor-pointer text-xl"
                    title="Record Message"
                    onClick={() => setShowAudioRecorder(!showAudioRecorder)}
                  />
                </button>
              )}
            </div>
          </>
        )}
      </>
      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
      {showAudioRecorder && (
        <CaptureAudio
          hide={() => setShowAudioRecorder(!setShowAudioRecorder)}
        />
      )}
    </div>
  );
}

export default MessageBar;
