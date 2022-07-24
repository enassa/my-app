import React from "react";
import NavContent from "./nav-content";
import LogoCotainer from "../logo-container/logo-container";
import { useThemeContext } from "../../context/theme-context";

export default function DesktopView() {
  const { theme, colors, themOptions } = useThemeContext();
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div
        className={`flex flex-col flex-grow pt-5 pb-4 overflow-y-auto ${colors.bgOne}`}
      >
        <LogoCotainer />
        <NavContent />
      </div>
    </div>
  );
}
