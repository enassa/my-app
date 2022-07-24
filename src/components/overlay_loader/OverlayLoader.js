import { CakeIcon } from "@heroicons/react/solid";
import React, { Component } from "react";
import Loader from "../loader/Loader";

export default class OverlayLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const myClasses = {
      NULL: null,
      mainContainer: `d-flex f-row j-center a-center pointer-events-auto fill-entire-page top-0 left-0 z-[300]`,
    };
    const styles = {
      mainContainer: {
        backgroundColor: this.props.bgColor
          ? this.props.bgColor
          : "transparent",
      },
    };
    return (
      <div className={myClasses.mainContainer} style={styles.mainContainer}>
        {this.props.noIcon ? (
          <Loader />
        ) : (
          <Loader loaderIcon={<CakeIcon style={{ color: "orange" }} />} />
        )}
      </div>
    );
  }
}
