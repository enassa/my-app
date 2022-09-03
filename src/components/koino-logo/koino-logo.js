import React from "react";
import { useNavigate } from "react-router-dom";
import { fontFamily5 } from "./../../contants/ui-contants/ui-constants";
import { HowToVote } from "@mui/icons-material";

export default function Koinologo({ showText }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        color: "#333",
        fontSize: 50,
        fontWeight: "bolder",
        fontFamily: fontFamily5,
      }}
      className=" fixed left-0 top-[10px] flex justify-center h-[50px] items-center text-lg"
    >
      <div
        onClick={() => navigate("/")}
        className="flex justify-start cursor-pointer ml-4 mt-2 items-center "
      >
        <HowToVote
          style={{ fontSize: 50 }}
          className="text-3xl w-auto sm:h-10 text-[#5445E5]"
        />
        <span
          className={`text-[#5445E5] text-2xl font-bold ${
            showText ? "inline" : "hidden"
          } md:inline `}
        >
          <span className="font-extralight">Koino</span>Vote
        </span>
      </div>
    </div>
  );
}
