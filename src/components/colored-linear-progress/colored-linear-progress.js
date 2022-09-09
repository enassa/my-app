import React from "react";
import "./colored-linear.css";

export default function ColoredLinearProgress() {
  return (
    <div id="container">
      <div class="child progress"></div>
      <div class="child shrinker timelapse"></div>
    </div>
  );
}
