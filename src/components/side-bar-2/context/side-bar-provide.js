import React from "react";
import { useState } from "react";

const SideBarContext = React.createContext(undefined);
const SideBarProvider = ({ children }) => {
  const [open, setSideBarState] = useState(false);

  const toggleSideBar = (state) => {
    setSideBarState(state);
  };

  return (
    <SideBarContext.Provider
      value={{
        open,
        toggleSideBar,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBarContext = () => React.useContext(SideBarContext);
export default SideBarProvider;
