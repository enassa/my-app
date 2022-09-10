import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import { replaceUnderscoreWithSpace } from "../../libraries/easy";
import DropdownMultiple from "../drop-down-mulitple/drop-down-mulitple";

export default function ComboMultipleSelect(props) {
  const [popUpState, setPopUpState] = useState(false);
  const [inputValue, setinputValuee] = useState("");
  const [additions, setAdditions] = useState([]);
  const { inputData } = props;

  //   const handleOnChange = (value) => {
  //     setinputValuee(value)
  //   }

  const returnSelected = (selected) => {
    let newArr = [];
    selected.forEach((element) => {
      if (!additions.includes(element)) {
        newArr.push(element);
      }
    });
    if (newArr.length) {
      setAdditions([...additions, ...newArr]);
    }
    props.getSelected && props.getSelected(selected);
    // setAdditions(selected)
  };

  const deleteAddition = (item) => {
    let newArr = additions;
    let indexOfItem = newArr.indexOf(item);
    newArr.splice(indexOfItem, 1);
    setAdditions([...newArr]);
  };

  const ejectAdditions = () => {
    return additions.map((item, index) => {
      return (
        <div
          key={index}
          style={{ border: "1px solid grey" }}
          className="w-[80%] h-[50%] flex items-center justify-between pl-[10px] pr-[5pz] rounded-md mb-[20px]"
        >
          <span>{item}</span>
          <XIcon
            onClick={() => {
              deleteAddition(item);
            }}
          />
        </div>
      );
    });
  };
  useEffect(() => {
    props.getAdditions && props.getAdditions(additions);
  }, [additions.length]);

  useEffect(() => {
    return () => {
      //   checkValidation(inputValue);
    };
  }, [inputValue]);
  return (
    <div className="flex flex-col w-full">
      <div className="w-full  flex-col flex items-center">
        {ejectAdditions()}
      </div>
      <div
        key={`pf${inputData?.index}`}
        style={{ paddingLeft: 4, flexFlow: "" }}
        className="flex flex-row-reverse items-center h-full pr-[10px] w-full relative"
      >
        <div
          style={{ padding: 15, color: "white" }}
          className={`${
            popUpState ? "round-up nate-pink-bg" : "rounded-md bg-blue-500"
          } justify-center items-center shadow-blend min-h-[50%] h-[50%] min-w-[50px] w-[50px]`}
          onClick={() => {
            setPopUpState(!popUpState);
          }}
        >
          {popUpState ? <XIcon /> : inputData?.icon}
        </div>
        <div className="flex w-full  justify-start pl-[20px]">
          <span className="" style={{ color: "#012043", fontSize: 20 }}>
            {replaceUnderscoreWithSpace(inputData?.label)}
          </span>
        </div>
        {popUpState ? (
          <div
            style={{ top: -280 }}
            className={`w-[350px] animate-rise  h-[300px] bg-white shadow absolute`}
          >
            <DropdownMultiple
              getSelected={(selected) => {
                setPopUpState(false);
                returnSelected(selected);
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
