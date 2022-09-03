import { Campaign, Login, School } from "@mui/icons-material";
import React, { Component } from "react";
import { fontFamily3 } from "../contants/ui-constants";
import { fontFamily5 } from "../../contants/ui-contants/ui-constants";
let styles;
class SimpleNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getList = () => {
    const list = [
      // {title:"About us"},
      // {title:"Contact Us"},
    ];
    return list.map((item, index) => {
      return (
        <li
          style={styles.listStyles}
          className="mr-[20px] cursor-pointer h-full list-none"
        >
          {item.title}
        </li>
      );
    });
  };
  handleClick = (buttonType) => {
    if (buttonType === "BUTTON_ONE") {
      this.props.handleButtonOneClick
        ? this.props.handleButtonOneClick(buttonType)
        : alert('pass a function "handleButtonOneClick"');
    } else if (buttonType === "TWO") {
      this.props.handleButtonTwoClick
        ? this.props.handleButtonTwoClick(buttonType)
        : alert('pass a function "handleButtonTwoClick"');
    }
  };
  render() {
    const logoDetails = {
      logo: <School style={{ fontSize: 50 }} />,
      name: "Student Manager",
      buttonOneText: this.props.buttonOneText
        ? this.props.buttonOneText
        : "Login",
      buttonTwoText: this.props.buttonTwoText
        ? this.props.buttonTwoText
        : "Sign up",
    };
    styles = {
      logoStyles: {},
      listStyles: {
        fontSize: 20,
        fontFamily: fontFamily5,
        fontWeight: 300,
      },
      buttonOneStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        borderRadius: 10,
        color: "#FEA797",
        border: "1px solid #FEA797",
        width: 120,
        height: 40,
        fontFamily: fontFamily3,
        cursor: "pointer",
        marginRight: `${this.props.showButtonTwo ? "20px" : 0}`,
        ...this.props.buttonOneStyles,
      },
      buttonOneIconStyles: {
        marginRight: 10,
      },
      buttonTwoStyles: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        borderRadius: 10,
        // color:"#FEA797",
        // border:"1px solid #FEA797",
        color: "white",
        border: "1px solid white",
        width: 120,
        height: 40,
        fontFamily: fontFamily3,
        cursor: "pointer",
      },
    };

    return (
      <div
        style={{ fontFamily: fontFamily5, fontWeight: 300, fontSize: 30 }}
        className="w-full p-[20px] height-60 flex items-center justify-between "
      >
        <div
          style={{ visibility: this.props.noLogo ? "hidden" : "visible" }}
          className="flex items-center pointer-events-auto cursor-pointer justify-center"
        >
          <span className="mr-[10px] cursor-pointer flex items-center h-full">
            {/* {logoDetails?.logo} */}
          </span>
          <span className="mr-[10px] flex items-center h-full no-break">
            {/* {logoDetails?.name} */}
          </span>
        </div>
        <div className="flex justify-between items-center w-full  h-full ">
          <ul
            style={{ visibility: this.props.noMenuList ? "hidden" : "visible" }}
            className="flex justify-start h-full  items-center margin-r-40 w-full  j-end"
          >
            {this.getList()}
          </ul>
          {
            <div className="h-full flex items-center justify-center">
              {!this.props.hideFirstButton && (
                <button
                  // style={styles.buttonOneStyle}
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                  onClick={() => {
                    this.handleClick("BUTTON_ONE");
                  }}
                >
                  {<Login style={styles.buttonOneIconStyles} />}
                  {logoDetails.buttonOneText}
                </button>
              )}

              {this.props.showButtonTwo ? (
                <button
                  // style={styles.buttonTwoStyles}
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                  onClick={() => {
                    this.handleClick("BUTTON_TWO");
                  }}
                >
                  {logoDetails.buttonTwoText}
                </button>
              ) : null}
            </div>
          }
        </div>
      </div>
    );
  }
}
export default SimpleNavbar;
