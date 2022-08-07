import React from "react";
import noStatImg from "../../../assets/images/noStats.svg";
export default function GeneralInfo() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div>
        <img src={noStatImg}></img>
      </div>
    </div>
  );
}
