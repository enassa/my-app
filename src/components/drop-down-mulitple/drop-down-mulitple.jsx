import { PlusCircleIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { generateRandomString, searchContains } from "../../libraries/easy";
import { User } from "../contants/ui-data";
import Loader from "../loader/Loader";
import { CheckCircleIcon } from "@heroicons/react/solid";

export default function DropdownMultiple({
  inputData,
  getSelected,
  objPropertyForDrop,
  handleClose,
  addToSelectedOptions,
  activeOption,
}) {
  const [validation, setValidation] = useState({ state: false });
  const [inputValue, setInputValue] = useState("");
  const [dropState, setDropState] = useState(false);
  const [selected, setSelected] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearcResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [hovered, setHovered] = useState("");
  const dropDown = [
    { name: "Service 1", phone: "0549546822" },
    { name: "Service 2", phone: "0549546823" },
    { name: "Service 3", phone: "0549546825" },
    { name: "Service 4", phone: "0549546827" },
  ];
  //   console.log(objPropertyForDrop);

  const addOrRemoveFromSelected = (newItem, index) => {
    // console.log(newItem, index);
    // I am  adding indexed identification ids to the option item before it as added to the list for deletion functionality
    let item = {
      ...newItem,
      index: `${index}${newItem.type}${
        newItem.menuItem
      }${generateRandomString()}`,
      quantity: 1,
    };
    let arr = [...selected];
    let arr2 = [...selectedIndex];
    let indexOfItem = arr.findIndex((el) => el.id === newItem.id);
    if (indexOfItem === -1) {
      arr.push(item);
      arr2.push(index);
    } else {
      arr.splice(indexOfItem, 1);
      arr2.splice(indexOfItem, 1);
    }
    setSelected(arr);
    setSelectedIndex(arr2);
  };
  let propertyForDrop =
    objPropertyForDrop === undefined ? objPropertyForDrop : "menuItem";
  const ejectDropDownlist = () => {
    let dropDownList = searching ? searchResults : itemsList;
    return (
      !!dropDownList &&
      dropDownList
        .filter((item) => item.branch === User().branch)
        .map((item, index) => {
          const isSelected = [...selectedIndex]?.includes(index);
          // console.log("========", item);
          return (
            <div
              key={index}
              style={
                {
                  // backgroundColor: `${
                  //   item[propertyForDrop] === selected
                  //     ? "#012043"
                  //     : item[propertyForDrop] === hovered
                  //     ? "#F6F6F6"
                  //     : ""
                  // }`,
                  // color: `${
                  //   item[propertyForDrop] === selected
                  //     ? "white"
                  //     : item[propertyForDrop] === hovered
                  //     ? ""
                  //     : ""
                  // }`,
                }
              }
              onMouseOver={() => {
                setHovered(item[propertyForDrop]);
              }}
              onMouseOut={() => {
                setHovered("");
              }}
              onClick={() => {
                addOrRemoveFromSelected(item, index);
              }}
              className="w-full relative hover:bg-[#7c7a7a29] text-white items-center flex justify-startrelative px-4"
            >
              {/* <input
                className="absolute scale-[2] top-0 h-full  "
                style={{
                  transform: "scale(1)",
                  left: 20,
                  marginRight: 5,
                  cursor: "pointer",
                }}
                checked={[...selectedIndex]?.includes(index)}
                multiple
                id={`${item.menuItem}${index}`}
                type="checkbox"
              /> */}
              <>
                {isSelected ? (
                  <div
                    // style={{ padding: "20px 20px 20px 10px" }}
                    className="  right-0 flex items-center cursor-pointer "
                    htmlFor={`${item.menuItem}${index}`}
                  >
                    <div className="flex bg-[rgb(0,0,0,0.5)] blue-color mr-5 p-2 rounded-full justify-center text-blue-100 items-center">
                      <span className="mr-5">
                        <CheckCircleIcon className="text-blue-400 h-6 w-6" />
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    // style={{ padding: "20px 20px 20px 10px" }}
                    className="  right-0 flex items-center cursor-pointer "
                    htmlFor={`${item.menuItem}${index}`}
                  >
                    <div className="flex  blue-color mr-5 p-2 rounded-full justify-center text-blue-100 items-center">
                      <span className="mr-5 rounded-full bg-white h-5 w-6">
                        {/* <C className="text-white h-6 w-6" /> */}
                      </span>
                    </div>
                  </div>
                )}
              </>

              <div
                style={{ padding: "20px 20px 20px 10px" }}
                className="h-full flex items-center cursor-pointer w-full"
                htmlFor={`${item.menuItem}${index}`}
              >
                <span
                  style={{ backgroundImage: `url('${item.imageUrl}')` }}
                  className="w-14 h-14 mr-3 bg-red-200 rounded-full bg-no-repeat bg-cover bg-center "
                ></span>
                <span>{item.menuItem}</span>
              </div>
              {/* <div
                style={{ padding: "20px 20px 20px 10px" }}
                className="h-full flex items-center cursor-pointer w-full"
                htmlFor={`${item.menuItem}${index}`}
              >
                <div className="flex bg-[rgb(0,0,0,0.5)] blue-color mr-5 p-2 rounded-full justify-center text-blue-100 items-center">
                  <span className="mr-5">GHS {item.price}</span>
                </div>
              </div> */}
              <div
                // style={{ padding: "20px 20px 20px 10px" }}
                className="absolute  right-0 flex items-center cursor-pointer "
                htmlFor={`${item.menuItem}${index}`}
              >
                <div className="flex bg-[rgb(0,0,0,0.5)] blue-color mr-5 p-2 px-4 rounded-full justify-center text-blue-100 items-center">
                  <span className={`${isSelected ? "" : ""}`}>
                    GHS {item.price}
                  </span>
                </div>
                {/* <div className="flex bg-[rgb(0,0,0,0.5)] blue-color mr-5 p-2 rounded-full justify-center text-blue-100 items-center">
                  <span className="mr-5">
                  <span className="mr-5">GHS {item.price}</span>
                    <CheckCircleIcon className="text-blue-400 h-6 w-6" />
                  </span>
                </div> */}
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
      let results = searchContains(itemsList, value, propertyForDrop);
      setSearcResults(results);
      setSearching(true);
    }
    setInputValue(value);
  };
  useEffect(() => {
    // console.log(inputData);
    setItemsList(!!inputData ? inputData : dropDown);
    setSelected([]);
    setSelectedIndex([]);
    // setTimeout(() => {
    // }, 10);
    // if (inputValue === "") return; //using this to check for innitial load
    // checkValidation(selected)
  }, [inputData.length, activeOption]);

  return (
    <div className="items-center flex flex-col justify-start h-full w-full relative">
      <div className="w-full flex flex-col h-full ">
        <div className="justify-start flex flex-col h-full w-full">
          <div
            className="flex-row justify-center items-center flex"
            style={{
              width: "100%",
              height: 50,
              minHeight: 50,
              padding: "10px 10px",
              borderBottom: "1px solid #e6e6e6",
            }}
          >
            <SearchIcon className="h-5 w-5 mr-2 text-white left-0" />
            <input
              value={inputValue}
              placeholder="Search for option"
              onChange={(e) => {
                handleOnChange(e.target.value);
              }}
              onBlur={(e) => {}}
              onFocus={(e) => {
                setDropState(true);
              }}
              style={{
                border: 0,
                // borderBottom: "1px solid #e6e6e6",
                color: "#1e1e1e",
                fontSize: "0.8rem",
                width: "100%",
                outline: "none",
              }}
              className="rounded-full py-1 px-3"
            />
            {/* <span
              onClick={() => {
                handleClose();
              }}
              className="text-red-800 mr-2 left-0"
            >
              close
            </span> */}
            <XIcon
              onClick={() => {
                handleClose();
              }}
              className="h-4 w-4 ml-4 text-red-200 left-0"
            />
          </div>
          <div className="w-full bg-[#231414e6]  overflow-y-scroll z-[5555] h-full justify-start flex-col">
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
        <div className="flex w-full pointer-events-none absolute bottom-[20px] pr-[20px] z-[5555] justify-end">
          <button
            style={{ padding: "10px 15px" }}
            className="bg-red-100  hover:bg-red-50 flex items-center shadow-blend text-[#453030e6] rounded-md pointer-events-auto"
            onClick={() => {
              getSelected(selected);
              handleClose();
            }}
          >
            <PlusCircleIcon className="w-5 h-5 mr-1 pointer-events-none" />{" "}
            <span className="pointer-events-none">ADD TO SELECTION</span>
          </button>
        </div>
      </div>
    </div>
  );
}
