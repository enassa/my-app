import React, { Component } from "react";
function SelectHolder(props) {
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
    mainContainer: `fill-entire-page d-flex height-auto `,
    subContainer: `height-auto`,
    contentArea: `pop-up-rise overflow-auto max-height-400 z-high height-auto bg-white absolute margin-t-30 width-200 shadow`,
    listItem: `d-flex justify-start f-row items-center w-full  height-50 cursor-pointer `,
    innerSurround: `d-flex justify-start f-row items-center w-full  h-full cursor-pointer`,
    listItemHovered: `d-flex justify-start f-flow items-center w-full  height-50 cursor-pointer`,
    iconsContainer: `d-flex justify-center items-center min-width-50 h-full`,
    textsContainer: `d-flex justify-start items-center w-full  h-full`,
    clickToOpen: `cursor-pointer ${ICON_HOVERED ? "anime-bounce-y" : null}`,
  };
  /** Definition of all other constants */
  let handleItemClick = (itemName, itemIcon, e) => {
    setState({ ...state, EXPAND: !EXPAND });
    if (props.HANDLE_SELECT) {
      props.HANDLE_SELECT(itemName, itemIcon, e);
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
            onClick={(e) => {
              handleItemClick(item.name, item.icon, e);
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
    // <div className={myClasses.mainContainer} style={styles.mainContainer}>
    // <div className={myClasses.subContainer} style={styles.NULL}>
    //     <div
    //       className={myClasses.clickToOpen}
    //       onClick={()=>{
    //         setState({...state, EXPAND:!EXPAND})
    //       }}
    //       onMouseOver={()=>{setState({...state, ICON_HOVERED:!ICON_HOVERED})}}
    //       onMouseOut={()=>{setState({...state, ICON_HOVERED:!ICON_HOVERED})}}
    //     >
    //         {EXPAND?<ExpandLess/>:this.props.children}
    //         {props.children}
    //     </div>
    //     {EXPAND
    //     ?
    <div className={myClasses.contentArea} style={styles.contentArea}>
      {ejectItems()}
    </div>
    //     :
    //     null
    //   }
    //   </div>
    // </div>
  );
}
export default SelectHolder;
