import React, { Component } from "react";
import { fontFamily2, fontFamily3 } from "../contants/ui-constants";
import {
  getTodaysDate,
  getTommorowsDate,
  getWindowWidth,
} from "../../libraries/easy";

export default class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: getTodaysDate(),
      endDate: getTommorowsDate(),
    };
  }
  getYYYMMDDFormat = (date) => {};
  sendChange = () => {
    this.props.handleChange
      ? this.props.handleChange(this.state.startDate, this.state.endDate)
      : console.log(this.state.startDate, this.state.endDate);
  };
  handleChange = (changeType, date) => {
    if (changeType === "start") {
      this.setState({ startDate: date }, () => {
        this.sendChange();
      });
    } else if (changeType === "end") {
      this.setState({ endDate: date }, () => {
        this.sendChange();
      });
    }
    // this.props.handleChange?this.props.handleChange(date,)
  };
  render() {
    const innerWidth = getWindowWidth();
    return (
      <div
        style={{
          transform: "scale(0.9)",
          fontFamily: fontFamily3,
          fontWeight: 300,
        }}
        className="h-full flex flex-row items-center justify-items-center h-100 "
      >
        <span>
          {/* <span>From: </span> */}
          {/* &nbsp; */}
          <input
            min="2022-01-01"
            style={{
              width: "auto",
              outline: "none !important",
              backgroundColor: "transparent",
              textAlign: "center",
            }}
            defaultValue={getTodaysDate()}
            onChange={(e) => {
              this.handleChange("start", e.target.value);
            }}
            className="border-0 text-sm md:text-base text-white cursor-pointer outline-none"
            type="date"
          />
        </span>
        &nbsp;
        <i
          style={{
            fontSize: 30,
            color: "#5F6FE4",
            marginRight: 5,
            marginLeft: 5,
          }}
          className="bx bxtop bx-chevrons-right"
        ></i>
        <span>
          {/* &nbsp; */}
          {/* <span>To: </span>&nbsp;&nbsp; */}
          <input
            max={getTommorowsDate()}
            style={{
              width: "auto",
              backgroundColor: "transparent",
              textAlign: "center",
            }}
            defaultValue={getTommorowsDate()}
            onChange={(e) => {
              this.handleChange("end", e.target.value);
            }}
            className="border-0 text-sm md:text-base text-white cursor-pointer outline-none"
            type="date"
          />
        </span>
      </div>
    );
  }
}
