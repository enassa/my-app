import React, { Component } from "react";

function Loader(props) {
  /** Destructuring of props here */
  /** Definition of states here */
  const [state, setState] = React.useState({
    FIRST_STATE: false,
    SECOND_STATE: null,
    THIRD_STATE: "",
  });
  const FIRST_STATE = state.OPEN;
  const SECOND_STATE = state.IMAGE_SRC;
  const THIRD_STATE = state.USER_TYPE;
  /** Definition of all css styles here  */
  // inline styles
  const styles = {
    NULL: null,
    mainContainer: {
      backgroundColor: ``,
      width: props.SIZE ? props.SIZE : "auto",
      height: props.SIZE ? props.SIZE : "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: `${props.LOADER_WIDTH ? props.LOADER_WIDTH : 4} solid`,
      border: `20 px solid black`,
    },
    subContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    defaultIcon: {
      color: "#ED1569",
      fontWeight: "bolder",
    },
    surroundSpinner: {
      borderRadius: 100,
      borderRight: `2px solid rgba(147,26,222,0.83)`,
      width: 65,
      height: 65,
      borderColor: props.loaderColor ? props.loaderColor : "white",

      ...props.style,
      // background:"green",
      // border:"2px solid",
    },
    iconHolder: {
      position: "absolute",
    },
  };
  // class based styles
  const myClasses = {
    NULL: null,
    mainContainer: null,
    // iconHolder:`rotate`,
    surroundSpinner: `animate-rotate`,
  };
  /** Definition of all other constants */

  /** Definition of all functions here  */
  return (
    <div className={myClasses.mainContainer} style={styles.mainContainer}>
      <div className={myClasses.subContainer} style={styles.subContainer}>
        <div
          className={myClasses.surroundSpinner}
          style={styles.surroundSpinner}
        ></div>
        <div className={myClasses.iconHolder} style={styles.iconHolder}>
          {/* {props.loaderIcon?props.loaderIcon:<div style={styles.defaultIcon}>loading</div>} */}
          {props.loaderIcon ? props.loaderIcon : null}
        </div>
      </div>
    </div>
  );
}

export default Loader;
