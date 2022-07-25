import React, { Component } from "react";
import { getTodaysDateWithoutDash } from "../../pages/login-screen/login-screen";
import { fontFamily5 } from "../contants/ui-constants";

export default class Casantey extends Component {
  render() {
    return (
      <div
        className="fixed bottom-20 text-white  justify-center flex-col items-center"
        style={{ fontFamily: fontFamily5, fontSize: 18 }}
      >
        <div>
          Powered by{" "}
          <a
            href={"//www.casantey.com"}
            target="_blank"
            // style={{ color: "#01B000" }}
            className="font-Arial-bold text-orange-400"
          >
            Casantey
          </a>
        </div>
        <div style={{ fontSize: 9 }} className="flex justify-center">
          {" "}
          Copyright &#169; 2022 |v{getTodaysDateWithoutDash()}
        </div>
        {/* <div className="w-full text-xs flex justify-center">
          <span className="text-white">@{process.env.NODE_ENV}</span>
        </div> */}
      </div>
    );
  }
}
