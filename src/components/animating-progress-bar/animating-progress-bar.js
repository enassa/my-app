import React from "react";

export default function AnimatingProgressBar() {
  return (
    <>
      <div className="progressbar" style={{ width: "80%" }}></div>
      <div className="progressbar" style={{ width: "20%" }}></div>
      <div className="progressbar" style={{ width: "90%" }}></div>
      <div className="progressbar" style={{ "--p": 0 }}></div>
      <div className="progressbar" style={{ "--p": 0, width: "60%" }}></div>
      <div className="progressbar" style={{ "--p": 0, width: "30%" }}></div>
    </>
  );
}
