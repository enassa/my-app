import React from "react";
import { Outlet } from "react-router-dom";
import VoteScreenProvider from "./context/vote-screen-context";

export default function VoteScreenHelper() {
  return (
    <VoteScreenProvider>
      <div className="w-full h-full flex">{<Outlet />}</div>;
    </VoteScreenProvider>
  );
}
