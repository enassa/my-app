import { useContext, useState } from "react";
import { createContext } from "react";

const TooltipContext = createContext();

const TooltipProvider = ({ children }) => {
  const [myState, setMyState] = useState(false);
  const [myMessage, setMyMessage] = useState("");
  const [myEvent, setMyEvent] = useState();

  const showTooltip = (state, message = "message here", event) => {
    setMyState(state);
    setMyMessage(message);
    setMyEvent(event);
  };

  return (
    <TooltipContext.Provider
      value={{ showTooltip, myState, myMessage, myEvent }}
    >
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltipServices = () => useContext(TooltipContext);

export default TooltipProvider;
