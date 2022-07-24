import React from "react";
import logoTextWhite from "../../assets/imgs/potbelly.jpeg";
import potbellyLogo from "../../assets/imgs/logo.jpeg";
import { User } from "../contants/ui-data";
import { UserCircleIcon, UserIcon } from "@heroicons/react/outline";
import { ORG_LOGO } from "../../constants/urls";

export default function LogoCotainer({ img, text }) {
  console.log(User());
  return (
    <div className="flex-shrink-0 flex items-center px-4 mb-10 mt-2">
      <img
        className="h-8 min-h-[32px] w-8 rounded-full"
        src={ORG_LOGO()}
        alt="logo"
      />
      <div className="flex flex-col relative">
        <span className="mx-4 text-white logo-font text-xl">POTBELLY</span>
        <span className="text-xs whitespace-nowrap mt-1 py-1 absolute top-6 w-full flex items-center rounded-full justify-center bg-[rgb(0,0,0,0.5)] text-orange-300">
          {/* <UserCircleIcon className="h-3 w-3 mr-1 " />  */}
          {User()?.role} | {User()?.branch}
        </span>
      </div>
    </div>
  );
}
