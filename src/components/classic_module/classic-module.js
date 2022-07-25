import React, { useState } from "react";
import SelectHolder from "../list_display/list-display";
import styles from "./classic-module.module.css";
import { ArrowsExpandIcon } from "@heroicons/react/solid";
import ClickAwayListener from "../click_away_listener/click-away-listener";
import { fontFamily3 } from "../contants/ui-constants";

export default function ClassicModule(props) {
  const [dropOpen, showDropDown] = useState(false);
  const [activeItem, setactiveItem] = useState("");

  let { cardContent, defaults } = props;
  const handleClick = (cardName) => {
    showDropDown(!dropOpen);
    setactiveItem(cardName);
    props.handleClick && props.handleClick(cardName);
  };
  const handleSelectedItem = (selectedItem, icon, e) => {
    props.handleSelectedItem &&
      props.handleSelectedItem(selectedItem, activeItem);
  };
  return (
    <div
      style={{ position: "relative" }}
      onClick={() => {
        handleClick(cardContent);
      }}
      className={styles["module-cards-container"]}
    >
      <div className="flex flex-col justify-start hover:scale-105 duration-200  bg-white rounded-sm cursor-pointer shadow-lg items-center  w-34  h-34 min-h-34">
        <span
          style={{ color: cardContent?.color }}
          className="h-3/4 min-h-3/4 w-full  flex justify-center items-center"
        >
          {cardContent?.icon ?? defaults?.icon}
        </span>
        <span
          style={{ fontFamily: fontFamily3 }}
          className="w-full flex items-start justify-center text-center px-1"
        >
          {cardContent?.name ?? cardContent?.title}
        </span>
      </div>
      {dropOpen && props.modulesListObject ? (
        <ClickAwayListener
          handleClickAway={() => {
            showDropDown(false);
          }}
        >
          <div style={{ bottom: 80 }} className="absolute left-20 bottom-40">
            <SelectHolder
              HANDLE_SELECT={(selectedItemName, selectedItemIcon, e) => {
                handleSelectedItem(selectedItemName, cardContent, e);
              }}
              OPTIONS_LIST_OBJECT={props.modulesListObject}
              CLICK_TO_OPEN={<ArrowsExpandIcon />}
            ></SelectHolder>
          </div>
        </ClickAwayListener>
      ) : null}
    </div>
  );
}
