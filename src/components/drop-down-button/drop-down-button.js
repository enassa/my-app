import React, { useEffect, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ClickAwayListener from "../click_away_listener/click-away-listener";

export default function DropDownButton({
  data,
  drop,
  handleChange,
  valueSelected,
  disabled,
}) {
  const [dropState, setDrop] = useState(false);
  const [selected, setSelected] = useState(valueSelected);
  useEffect(() => {
    if (data[0].title !== undefined && selected === undefined) {
      setSelected(data[0]?.title);
      return;
    }
    handleChange(selected);
  }, [selected]);
  return (
    <div
      className={`${
        disabled ? "bg-gray-50" : "bg-white"
      } w-[180px] relative justify-between cursor-pointer px-2 h-[50px] flex items-center shadow mb-3`}
    >
      <div className="w-full h-full flex justify-between items-center">
        <span>{selected}</span>
        {dropState ? (
          <ExpandLess
            onClick={() => {
              setDrop(false);
            }}
          />
        ) : (
          <ExpandMore
            onClick={() => {
              !disabled && setDrop(true);
            }}
          />
        )}
      </div>
      {dropState ? (
        <ClickAwayListener
          handleClickAway={() => {
            setDrop(false);
          }}
        >
          <div
            className={`w-full bg-white bottom-[-103px] animate-rise absolute z-[10000] shadow h-auto right-0`}
          >
            {!!data &&
              data.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={(e) => {
                      setSelected(item.title);
                      setDrop(false);
                    }}
                    className="w-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 h-[50px] flex justify-between items-center"
                  >
                    <div className="mr-2  pl-2 flex items-center">
                      {item?.icon}
                    </div>
                    <div className="w-full flex justify-start items-center">
                      {item.title}
                    </div>
                  </div>
                );
              })}
          </div>
        </ClickAwayListener>
      ) : null}
    </div>
  );
}
