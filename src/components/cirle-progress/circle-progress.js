import React from "react";
import "./circulr-progress.css";

export default function CircleProgress({ children }) {
  const getValue = () => {};
  const styles = {
    borderRadius: "50%",
    // width: "120px",
    // height: "120px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  };
  return (
    <div style={{ ...styles }} id="progress-circle">
      <div className="h-full w-full overflow-hidden flex justify-center  items-center">
        {children ? children : getValue()}
      </div>
    </div>
  );
}
