import React from "react";
import { Outlet } from "react-router-dom";

export default function Home({ children }) {
  return <div className="w-full h-full flex overflow-hidden">{<Outlet />}</div>;
}
