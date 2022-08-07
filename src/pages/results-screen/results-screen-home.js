import React from "react";
import { Outlet } from "react-router";

export default function ResultsScreenHome() {
  return (
    <div className="w-full h-full flex justify-start flex-col">
      {<Outlet />}
    </div>
  );
}
