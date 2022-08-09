import React, { Component } from "react";
var styles, myClasses;

export default class PopUpButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: null,
      select: null,
      selectedText: null,
      iconHovered: false,
      expand: this.props.exapnd ? this.props.exapnd : false,
      itemList: this.props.itemList ? this.props.itemList : [],
    };
  }
  handleItemClick = (itemName, itemIcon) => {
    this.setState({ expand: !this.state.expand });
    if (this.props.handleSelect) {
      this.props.handleSelect(itemName, itemIcon);
    }
  };
  handleClick = (value) => {
    if (this.props.itemList) this.setState({ expand: !this.state.expand });
    else {
      if (this.props.handleClick) this.props.handleClick(value);
      else console.log("I'm working pass a function");
    }
  };
  // this.props.itemList?this.setState({ expand:!this.state.expand})?this
  // this.props.handleClick
  // ?this.props.handleClick(value)
  // : this.setState({ expand:!this.state.expand})

  componentDidMount() {}
  /** Definition of all functions here  */

  ejectItems = () => {
    let numberOfItems = this.state.itemList.length;
    if (this.state.itemList) {
      //  alert("dddd")
      return this.state.itemList.map((item, index) => {
        return (
          <div
            key={index}
            onMouseOver={() => {
              this.setState({ hover: item.name });
            }}
            onClick={() => {
              this.handleItemClick(item.name, item.icon);
            }}
            onMouseOut={() => {
              this.setState({ hover: null });
            }}
            className={myClasses.listItem}
            style={
              this.state.hover == item.name &&
              this.state.selectedText != item.name
                ? styles.listItemHovered
                : this.state.selectedText == item.name
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
            {/* {this.props.DIVIDER?this.props.DIVIDER:null} */}
            {index !== numberOfItems - 1 ? this.props.DIVIDER : null}
          </div>
        );
      });
    }
  };
  render() {
    const { buttonText, outerStyles, innerStyles, outerClasses, innerClasses } =
      this.props;

    const innerStyle = {
      // defaults styles on top here
      display: "flex",
      justifyContent: "flex-start",
      padding: "12px 27px",
      outline: "none",
      border: " 0px",
      color: "white",
      backgroundColor: "black",
      borderRadius: "50px",
      fontFamily: "'Roboto', sans-serif",
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "2.5px",
      fontWeight: "500",
      cursor: "Pointer",
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
      ...innerStyles,
    };
    const textIconStyle = {
      // defaults styles on top here
      ...this.props.textIconStyles,
    };
    const dropDownStyle = {
      width: "auto",
      backgroundColor: "white",
      position: "absolute",
      borderRadius: "10px",
      marginTop: "15px",
      overflow: "hidden",
      padding: "20px 0px",
      ...this.props.dropDownStyles,
      // display:this.state.expand?"flex":"none",
    };
    const outerStyle = {
      // defaults styles on top here
      ...outerStyles,
    };

    const innerClass = `
            ${innerClasses}
        `;
    const outerClass = `
            ${outerClasses}
        `;
    myClasses = {
      NULL: null,
      mainContainer: `flex h-auto `,
      subContainer: `h-auto`,
      contentArea: `${
        this.state.expand
          ? "flex flex flex-col animate-rise "
          : "slide-down-vanish none"
      }  overflow-auto m-h-[400px] z-high h-auto bg-white absolute w-auto shadow-md`,
      listItem: `w-auto  inliine-block justify-start flex flex-row items-center flex  w-full h-[50px] cursor-pointer p-[20px]`,
      innerSurround: `flex justify-start flex flex-row items-center flex  w-full h-full cursor-pointer`,
      listItemHovered: `flex justify-start  flex-row items-center   w-full h-[50px] cursor-pointer `,
      iconsContainer: `flex justify-center items-center   m-w-[50px] h-full`,
      textsContainer: `flex justify-start flex items-center flex  w-full h-full`,
    };
    styles = {
      NULL: null,
      mainContainer: {
        backgroundColor: ``,
      },
      listItem: {
        color: `${
          this.props.textOriginalColor
            ? this.props.textOriginalColor
            : "rgb(108, 108, 108)"
        }`,
      },
      listItemHovered: {
        color: `${
          this.props.textOnHoverColor ? this.props.textOnHoverColor : "#4a4a4a"
        }`,
        backgroundColor: `${
          this.props.onHoverBg ? this.props.onHoverBg : "#f5f5f5"
        }`,
      },
      listItemSelected: {
        color: `${
          this.props.textSelected ? this.props.textSelected : "#4a4a4a"
        }`,
        backgroundColor: `${
          this.props.onSelectedBg ? this.props.onSelectedBg : "#f5f5f5"
        }`,
      },
      contentArea: {
        padding: "9px 0",
        backgroundColor: "#fff",
        borderRadius: "3px",
      },
      textStyles: {
        display: "inline-block",
        verticalAlign: "middle",
        lineHeight: "100%",
        whiteSpace: "nowrap",
        height: "100%",
        ...this.props.textStyles,
      },
    };

    return (
      <div
        onClick={(e) => this.handleClick()}
        style={outerStyle}
        className={outerClass}
      >
        <button style={innerStyle} className={innerClass}>
          {this.props.icon ? this.props.icon : null}

          {buttonText ? (
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <span style={styles.textStyles}>{buttonText}</span>
              {this.props.textIcon ? (
                <span style={textIconStyle}>{this.props.textIcon}</span>
              ) : null}
            </span>
          ) : (
            !this.props.noText && (
              <span style={{ display: "flex", justifyContent: "center" }}>
                Submit
              </span>
            )
          )}
          {this.props.children}
        </button>
        <div style={dropDownStyle} className={myClasses.contentArea}>
          {this.ejectItems()}
        </div>
      </div>
    );
  }
}
