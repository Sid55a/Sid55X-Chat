import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function onboarding() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("New To Sid55X-Chat");
  const [image, setImage] = useState("/default_avatar.png");
  const router = useRouter();
  useEffect(() => {
    if (!newUser && !userInfo?.email) {
      router.push("/login");
    } else if (!newUser && userInfo?.email) {
      router.push("/");
    }
  }, [newUser, userInfo, router]);

  const onBoardUser = async () => {
    if (validateDetails()) {
      const email = userInfo?.email;

      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          email,
          name,
          about,
          image,
        });
        if (data.status) {
          dispatch({
            type: reducerCases.SET_NEW_USER,
            newUser: false,
          });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id: data.user.id,
              name,
              email,
              profileImage: image,
              status: about,
            },
          });
          router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const validateDetails = () => {
    if (name.length < 3) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className="bg-panel-header-background h-screen w-screen flex flex-col items-center justify-center text-white">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image src="/whatsapp.gif" alt="Sid55X-Chat" height={300} width={300} />
        <span className="text-7xl">Sid55X-Chat</span>
      </div>
      <h2 className="text-2xl">Create Your Profile</h2>

      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input name="Display Name" state={name} setState={setName} lable />
          <Input name="About" state={about} setState={setAbout} lable />
          <div
            className="flex items-center justify-center"
            onClick={onBoardUser}
          >
            <button className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg">
              Create Profile
            </button>
          </div>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default onboarding;
