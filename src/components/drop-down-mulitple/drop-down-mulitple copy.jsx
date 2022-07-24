import { XIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { searchContains } from "../../libraries/easy";
import Loader from "../loader/Loader";

export default function DropdownMultiple({
  inputData,
  getSelected,
  objProperty,
}) {
  const [validation, setValidation] = useState({ state: false });
  const [inputValue, setInputValue] = useState("");
  const [dropState, setDropState] = useState(false);
  const [selected, setSelected] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearcResults] = useState([]);
  const [hovered, setHovered] = useState("");
  const dropDown = [
    { name: "Service 1", phone: "0549546822" },
    { name: "Service 2", phone: "0549546823" },
    { name: "Service 3", phone: "0549546825" },
    { name: "Service 4", phone: "0549546827" },
  ];

  const addOrRemoveFromSelected = (item) => {
    let arr = selected;
    let indexOfItem = arr.indexOf(item);
    if (indexOfItem === -1) {
      arr.push(item);
    } else {
      arr.splice(indexOfItem, 1);
    }
    setSelected(arr);
  };
  let propertyForDrop = "name";
  const ejectDropDownlist = () => {
    let dropDownList = searching ? searchResults : itemsList;
    return dropDownList.map((item, index) => {
      return (
        <div
          key={index}
          style={{
            backgroundColor: `${
              item[propertyForDrop] === selected
                ? "#012043"
                : item[propertyForDrop] === hovered
                ? "#F6F6F6"
                : ""
            }`,
            color: `${
              item[propertyForDrop] === selected
                ? "white"
                : item[propertyForDrop] === hovered
                ? ""
                : ""
            }`,
          }}
          onMouseOver={() => {
            setHovered(item[propertyForDrop]);
          }}
          onMouseOut={() => {
            setHovered("");
          }}
          className="w-full items-center flex justify-startposition-relative px-4"
        >
          <input
            className="position-absolute top-0 h-full  pointer-events-none"
            style={{
              transform: "scale(1.5)",
              left: 20,
              marginRight: 13,
              cursor: "pointer",
            }}
            id={item.name}
            // checked = {selected.includes(item.name)}
            type="checkbox"
          />

          <label
            onClick={() => {
              addOrRemoveFromSelected(item.name);
            }}
            style={{ padding: "20px 20px 20px 50px" }}
            className="h-full  cursor-pointer w-full"
            htmlFor={item.name}
          >
            {item[propertyForDrop]}
          </label>
        </div>
      );
    });
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
      let results = searchContains(itemsList, value, propertyForDrop);
      setSearcResults(results);
      setSearching(true);
    }
    setInputValue(value);
  };
  useEffect(() => {
    setTimeout(() => {
      setItemsList(!!inputData ? inputData : dropDown);
    }, 2000);
    if (inputValue === "") return; //using this to check for innitial load
    // checkValidation(selected)
  }, []);
  return (
    <div className="items-center flex flex-col justify-start h-full w-full relative">
      <div className="w-full flex-col h-full min-h-[90%]">
        <div className="justify-center flex-col h-full w-full">
          <div
            className="flex-col justify-center items-center flex"
            style={{
              width: "100%",
              height: 50,
              minHeight: 50,
              padding: "10px 10px",
            }}
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
                borderBottom: "1px solid #e6e6e6",
                color: "#1e1e1e",
                fontSize: "1.1rem",
                width: "100%",
                outline: "none",
              }}
            />
          </div>
          <div
            style={{ width: "100%", height: 300, maxHeight: 300 }}
            className="w-full overflow-y-auto z-[5555]  height-auto justify-start flex-col"
          >
            {itemsList.length ? (
              ejectDropDownlist()
            ) : (
              <div className="w-full h-full flex justify-center items-center flex-col">
                <Loader />
                <span className="mt-[10px]">Fetching data...</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <div className="flex w-full pointer-events-none absolute bottom-20 pr-20 z-[5555] justify-end">
          <button
            style={{ padding: "10px 30px", color: "white" }}
            className="bg-blue-500 pointer-events-all"
            onClick={(selectedItems) => {
              getSelected(selected);
            }}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
