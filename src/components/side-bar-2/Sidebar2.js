import React, { useState } from "react";
import DesktopView from "./desktop-view";
import MobileView from "./mobile-view";

export default function Sidebar2() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <MobileView />
      <DesktopView />
    </>
  );
}
