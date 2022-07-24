import React, { useEffect, useState } from "react";
import {
  checkRegex,
  replaceUnderscoreWithSpace,
  searchContains,
} from "../../libraries/easy";
import ClickAwayListener from "../click_away_listener/click-away-listener";
import { LocationMarkerIcon } from "@heroicons/react/solid";

export default function InputDropDown({
  dropDownData,
  handleSelect,
  handleChange,
  disabled,
  inputData,
  propertyForDropdown,
  propertyForSecondaryText,
  fullDescription,
}) {
  const [validation, setValidation] = useState({ state: false });
  const [inputValue, setInputValue] = useState("");
  const [dropState, setDropState] = useState(false);
  const [selectedValue, setSelected] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearcResults] = useState([]);
  const [hovered, setHovered] = useState("");
  const dropDown = !!inputData ? inputData : [];
  const propertyForDrop = propertyForDropdown ? propertyForDropdown : "name";

  const ejectDropDownlist = () => {
    let dropDownList = searching ? searchResults : dropDown;
    return (
      Array.isArray(dropDownList) &&
      dropDownList.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              padding: 20,
              backgroundColor: `${
                item[propertyForDrop] === selectedValue
                  ? "#012043"
                  : item[propertyForDrop] === hovered
                  ? "#F6F6F6"
                  : ""
              }`,
              color: `${
                item[propertyForDrop] === selectedValue
                  ? "white"
                  : item[propertyForDrop] === hovered
                  ? ""
                  : ""
              }`,
            }}
            onClick={() => {
              setSelected(item[fullDescription]);
              setInputValue(item[propertyForDrop]);
              setDropState(false);
            }}
            onMouseOver={() => {
              setHovered(item[propertyForDrop]);
            }}
            onMouseOut={() => {
              setHovered("");
            }}
            className="w-full flex items-center cursor-pointer  justify-start"
          >
            <LocationMarkerIcon className="h-5 w-10" />{" "}
            <div className="flex w-full  flex-col">
              <span className="w-full">{item[propertyForDrop]}</span>
              {propertyForSecondaryText && (
                <span className="text-xs text-gray-400 w-full">
                  {item[fullDescription]}
                </span>
              )}
            </div>
          </div>
        );
      })
    );
  };
  const handleOnChange = (value) => {
    setSelected("");
    if (!dropState) {
      setDropState(true);
    }
    if (value === "") {
      setSearching(false);
      setSearcResults([]);
    } else {
      let results = searchContains(dropDown, value, propertyForDrop);
      setSearcResults(results);
      setSearching(true);
    }
    setInputValue(value);
    handleChange(value);
  };
  useEffect(() => {
    handleSelect(selectedValue);
  }, [selectedValue]);

  return (
    <div
      key={`pf${inputData?.index}`}
      style={{ paddingLeft: 4 }}
      className="items-center flex h[100px] w-full relative"
    >
      <div className="w-full flex  flex-col">
        <div
          style={{ borderBottom: "1px solid #e6e6e6" }}
          className="justify-center flex flex-col w-full"
        >
          {/* <span style={{ color: "#a8aeb4" }}>
            {replaceUnderscoreWithSpace(inputData?.label)}
          </span> */}
          <div
            className="flex-col flex justify-start"
            style={{ width: "100%", paddingRight: 50 }}
          >
            <input
              value={inputValue}
              onChange={(e) => {
                handleOnChange(e.target.value);
              }}
              onBlur={(e) => {}}
              onFocus={(e) => {
                setDropState(true);
              }}
              style={{
                border: 0,
                color: "#1e1e1e",
                fontSize: "1.1rem",
                width: "100%",
                height: "100%",
                outline: "none",
              }}
            />
          </div>
          {dropState ? (
            <ClickAwayListener
              handleClickAway={() => {
                setDropState(false);
              }}
            >
              <div className="w-full flex justify-center">
                <div
                  style={{
                    top: 50,
                    width: "98%",
                    borderTop: "5px solid #012043",
                    maxHeight: 236,
                  }}
                  className="absolute mb-[20px]  w-full overflow-y-auto z-[9000] h-auto min-h-[50px] bg-white shadow-md justify-start flex-col flex"
                >
                  {ejectDropDownlist()}
                </div>
              </div>
            </ClickAwayListener>
          ) : null}
        </div>
        {
          // IF ( INPUT IS NOT VALIDATED AND IT HAS NO PATTERN OR INPUT IS NOT VALIDATED YET IT IS REUIRED
          (!validation?.state && inputData?.pattern !== "") ||
          (!validation?.state && inputData?.required) ? (
            <span
              style={{ fontSize: 11 }}
              className="bg-red-400 pl-[20px] absolute bottom-0"
            >
              {validation.message}
            </span>
          ) : null
        }
      </div>
    </div>
  );
}
