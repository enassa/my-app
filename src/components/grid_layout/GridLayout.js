import React, { Component } from "react";
import style from "./gridlayout.module.css";
class GridLayOut extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const styles = {
      ...this.props?.style,
    };
    return (
      <div
        // className={`${this.props?.ClassName}`}
        style={styles}
        className={`${this.props.className} ${style["main-container"]}`}
      >
        {this.props.children}
      </div>
    );
  }
}

export default GridLayOut;
