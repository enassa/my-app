import React, { useState } from "react";
import { navigation, secondaryNavigation } from "./data/constants";
import { useNavigate } from "react-router-dom";
import { User } from "../contants/ui-data";
import Casantey from "../casantey/casantey";
import { IS_SUPER_ACCOUNT } from "../../constants/urls";

export default function NavContent() {
  const [activeMenu, setActiveMenu] = useState("Manage Office");
  const navigate = useNavigate();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <nav
      className="mt-5 flex-1 relative flex flex-col divide-y divide-gray-700 overflow-y-auto"
      aria-label="Sidebar"
    >
      <div className="relative space-y-1">
        {navigation.map((item, index) => {
          if (item.roles.includes(User().role)) {
            const isSelected = item.name === activeMenu;
            return (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMenu(item.name);
                  navigate(item.href);
                }}
                key={index}
                href={item.href}
                className={classNames(
                  isSelected
                    ? "bg-white text-orange-400"
                    : "text-gray-300 hover:text-white-400 hover:bg-stone-700",
                  "group flex items-center px-2 py-2 text-sm leading-6 font-medium cursor-pointer relative"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                <item.icon
                  className="mr-4 flex-shrink-0 h-6 w-6 text‑inheri"
                  aria-hidden="true"
                />
                {item.name}

                {/* {isSelected ? (
                  <div
                    style={{
                      // boxShadow:
                      //   "0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07),0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07);",
                      borderRight: "3px solid white",
                      transform: "rotateZ(45deg)",
                    }}
                    className="w-5 z-[9999999]  h-5 absolute rounded-full bg-stone-800 top-[-19px] right-[-5px]"
                  ></div>
                ) : null}
                {isSelected ? (
                  <div
                    style={{
                      // boxShadow:
                      //   "0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07),0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07);",
                      borderRight: "3px solid white",
                      transform: "rotateZ(-45deg)",
                    }}
                    className="w-5  h-5 absolute rounded-full bg-stone-800 bottom-[-19px] right-[-5px]"
                  ></div>
                ) : null} */}
              </div>
            );
          }
        })}
      </div>
      <div className="pt-6 mt-9">
        <div className="px-2 space-y-1">
          {secondaryNavigation.map((item) => {
            if (item.roles.includes(User().role)) {
              return (
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveMenu(item.name);
                    navigate(item.href);
                  }}
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600 cursor-pointer"
                >
                  <item.icon
                    className="mr-4 h-6 w-6 text-cyan-200"
                    aria-hidden="true"
                  />
                  {item.name}
                </li>
              );
            }
          })}
        </div>
        {!IS_SUPER_ACCOUNT() && (
          <div className="w-full absolute bottom-[10px] flex justify-center">
            <Casantey />
          </div>
        )}
      </div>
    </nav>
  );
}
