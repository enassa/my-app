import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useTooltipServices } from "../../context/tooltip-context";

const Tooltip = () => {
  const { myState, myMessage, myEvent } = useTooltipServices();
  const percent = (number, total) => {
    return (number / total) * 100;
  };

  const styles = {
    mouseDirection: {
      left: myEvent?.clientX,
      top: myEvent?.clientY,
    },
  };

  return (
    <>
      {myState && (
        <div
          className="fixed z-[9999] flex items-center justify-center bg-gray-900"
          style={styles.mouseDirection}
        >
          <div className="relative inline-block tooltip">
            <div className=" py-2 px-3 text-sm font-medium text-white  rounded-lg shadow-sm  rounded-md z-20   ">
              {myMessage}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// const styles = () => {
//   return {
//     left: percent(this.x, this.viewportWidth + 19),
//     top: percent(this.y, this.viewportHeight - 40),
//   };
//   function percent(value, total) {
//     return Math.round((value * 100) / total) + "%";
//   }
// };

// showTooltip({ state: true, message: "Click to add items to your order", e });
const TooltipOne = () => {
  return (
    <>
      {/* <button ref={tooltipRef}>Tooltip</button> */}
      <div
        id="tooltip-animation"
        role="tooltip"
        class="inline-block absolute z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm transition-opacity duration-300 tooltip dark:bg-gray-700"
      >
        {/* {content} */}
        {/* <div data-popper-arrow></div> */}
      </div>
      {/* <ChevronDownIcon className="tooltip-arrow" /> */}
    </>
  );
};
const TooltipTwo = () => {
  return (
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        <div class="group cursor-pointer relative inline-block border-b border-gray-400 w-28 text-center">
          Hover over me
          <div class="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 ml-14 px-3 pointer-events-none">
            Tooltip center
            <svg
              class="absolute text-black h-2 w-full left-0 top-full"
              x="0px"
              y="0px"
              viewBox="0 0 255 255"
              // xml:space="preserve"
            >
              <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tooltip;
