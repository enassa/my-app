import React from "react";
import { Outlet } from "react-router-dom";
import ResultScreenProvider from "./context/results-screen-context";

export default function ResultScreenHelper() {
  return (
    <ResultScreenProvider>
      <div className="w-full h-full flex">{<Outlet />}</div>
    </ResultScreenProvider>
  );
}
