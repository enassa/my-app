import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React, { Component } from "react";
function DropList(props) {
  /** Destructuring of props here */
  /** Definition of states here */
  const [state, setState] = React.useState({
    HOVERED: null,
    SELECTED: null,
    ICON_HOVERED: false,
    EXPAND: false,
  });
  const HOVERED = state.HOVERED;
  const SELECTED_TEXT = state.SELECTED_ICON;
  const ICON_HOVERED = state.ICON_HOVERED;
  const EXPAND = state.EXPAND;
  /** Definition of all css styles here  */
  // inline styles
  const styles = {
    NULL: null,
    mainContainer: {
      backgroundColor: ``,
    },
    listItem: {
      color: `${
        props.TEXT_ORIGINAL_COLOR
          ? props.TEXT_ORIGINAL_COLOR
          : "rgb(108, 108, 108)"
      }`,
    },
    listItemHovered: {
      color: `${props.TEXT_ON_HOVER ? props.TEXT_ON_HOVER : "#4a4a4a"}`,
      backgroundColor: `${props.BG_ON_HOVER ? props.BG_ON_HOVER : "#f5f5f5"}`,
    },
    listItemSelected: {
      color: `${props.TEXT_SELECTED ? props.TEXT_SELECTED : "#4a4a4a"}`,
      backgroundColor: `${
        props.BG_ON_SELECTED ? props.BG_ON_SELECTED : "#f5f5f5"
      }`,
    },
    contentArea: {
      padding: "9px 0",
      backgroundColor: "#fff",
      borderRadius: "3px",
    },
  };
  // class based styles
  const myClasses = {
    NULL: null,
    mainContainer: `w-full h-full flex  h-auto  `,
    subContainer: `h-auto `,
    contentArea: `${
      EXPAND ? "animate-rise" : "animate-slideDownVanish"
    } overflow-auto max-h-[400px] z-[300px] h-auto  bg-white absolute mt-[30px] w-[20px]0 pop-up-shadow`,
    listItem: `flex  justify-start  flex-row items-center  w-full  h-[50px] cursor-pointer `,
    innerSurround: `flex  justify-start  flex-row items-center  w-full  h-full cursor-pointer`,
    listItemHovered: `flex  justify-start  f-flow items-center  w-full  h-[50px] cursor-pointer`,
    iconsContainer: `flex  j-center items-center  min-w-[50p] h-full`,
    textsContainer: `flex  justify-start  items-center  w-full  h-full`,
    clickToOpen: `cursor-pointer ${ICON_HOVERED ? "animate-bounce" : null}`,
  };
  /** Definition of all other constants */
  let handleItemClick = (itemName, itemIcon) => {
    setState({ ...state, EXPAND: !EXPAND });
    if (props.HANDLE_SELECT) {
      props.HANDLE_SELECT(itemName, itemIcon);
    }
  };

  /** Definition of all functions here  */
  let ejectItems = () => {
    let numberOfItems = props.OPTIONS_LIST_OBJECT.length;
    if (props.OPTIONS_LIST_OBJECT) {
      //  alert("dddd")
      return props.OPTIONS_LIST_OBJECT.map((item, index) => {
        return (
          <div
            key={index}
            onMouseOver={() => {
              setState({ ...state, HOVERED: item.name });
            }}
            onClick={() => {
              handleItemClick(item.name, item.icon);
            }}
            onMouseOut={() => {
              setState({ ...state, HOVERED: null });
            }}
            className={myClasses.listItem}
            style={
              HOVERED == item.name && SELECTED_TEXT != item.name
                ? styles.listItemHovered
                : SELECTED_TEXT == item.name
                ? styles.listItemSelected
                : styles.listItem
            }
          >
            <div className={myClasses.innerSurround}>
              {item.icon ? (
                <div className={myClasses.iconsContainer}>{item.icon}</div>
              ) : null}
              <div className={myClasses.textsContainer}>{item.name}</div>
            </div>
            {/* {props.DIVIDER?props.DIVIDER:null} */}
            {index !== numberOfItems - 1 ? props.DIVIDER : null}
          </div>
        );
      });
    } else {
    }
  };
  return (
    <div className={myClasses.mainContainer} style={styles.mainContainer}>
      <div className={myClasses.subContainer} style={styles.NULL}>
        <div
          className={myClasses.clickToOpen}
          onClick={() => {
            setState({ ...state, EXPAND: !EXPAND });
          }}
          onMouseOver={() => {
            setState({ ...state, ICON_HOVERED: !ICON_HOVERED });
          }}
          onMouseOut={() => {
            setState({ ...state, ICON_HOVERED: !ICON_HOVERED });
          }}
        >
          {/* {EXPAND?<ExpandLess/>:this.props.children} */}
          {props.children}
        </div>
        {EXPAND ? (
          <div className={myClasses.contentArea} style={styles.contentArea}>
            {ejectItems()}
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default DropList;
