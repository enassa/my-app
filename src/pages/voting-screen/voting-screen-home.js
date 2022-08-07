import React from "react";
import { Outlet } from "react-router-dom";

export default function VotingScreenHome() {
  return (
    <div className="w-full h-full flex justify-start flex-col">
      {<Outlet />}
    </div>
  );
}
