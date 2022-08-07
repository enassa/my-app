import React, { useEffect, useState } from "react";
import { CompareArrows } from "@mui/icons-material";
import { replaceUnderscoreWithSpace } from "../../contants/libraries/easy";

export default function TimeRangePicker({ handleOnChange, inputData }) {
  const [validation, setValidation] = useState({ state: false });
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");

  const checkValidation = (start, end, message) => {
    //   CHECK IF ITS REQUIRED BUT EMPTY
    if (inputData?.required && start === "") {
      handleOnChange(inputData?.name, end, {
        name: inputData?.name,
        state: false,
        message: `Start value is required`,
      });
      return;
    }
    // CHECK IF IS REQUIRED BUT INPUT IS NOT EMPTY AND THE FIELD DOES NOT REQUIRE REGEX VALIDATION
    else if (inputData?.required && start !== "") {
      if (endValue !== "" && !(end >= start)) {
        handleOnChange(inputData?.name, start, {
          name: inputData?.name,
          state: false,
          message: `End value must be  greater than start value`,
        });
        setValidation({
          state: false,
          message: `Endo value must be  greater than start value`,
        });
      } else if (endValue !== "" && !(start <= end)) {
        handleOnChange(inputData?.name, start, {
          name: inputData?.name,
          state: false,
          message: `Start value must be less than end value`,
        });
        setValidation({
          state: false,
          message: `Starto value must be less than end value`,
        });
      } else {
        if (endValue === "") {
          handleOnChange(inputData?.name, start, {
            name: inputData?.name,
            state: false,
            message: `Start value must be less than end value`,
          });
          return;
        }
        handleOnChange(inputData?.name, start, {
          name: inputData?.name,
          state: true,
          message: `Start value must be less than end value`,
        });
        setValidation({ state: true, message: `` });
      }
    }
  };

  useEffect(() => {
    if (startValue === "") return;
    checkValidation(startValue, endValue);
  }, [startValue, endValue]);
  return (
    <div
      key={`pf${inputData?.index}`}
      style={{ paddingLeft: 4 }}
      className="items-center h-100 min-h-[100px] w-full  relative"
    >
      <div
        style={{ padding: 15 }}
        className="items-center rounded-lg shadow-blend min-h-[50px] h-[50px] min-w-[50px] w-[50px]"
      >
        {inputData?.icon}
      </div>
      <div className="w-full  flex flex-col">
        <div
          style={{ borderBottom: "1px solid white", marginLeft: "5%" }}
          className="justify-center ml-[5px] mr-[10px]  flex flex-col w-full"
        >
          <span style={{ color: "#a8aeb4" }}>
            {replaceUnderscoreWithSpace(inputData?.label)}
          </span>
          <div
            className=" flex flex-row justify-start"
            style={{ w: "100%", paddingRight: 50 }}
          >
            <input
              value={startValue}
              type={"time"}
              onChange={(e) => {
                setStartValue(e.target.value);
              }}
              style={{
                border: "1px solid #e6e6e6",
                textAlign: "left",
                borderRight: "2px solid grey",
                h: 40,
                color: "#1e1e1e",
                borderRadius: "5px",
                fontSize: "1.1rem",
                w: "auto",
                padding: 10,
                outline: "none",
              }}
            />
            <span
              style={{ marginRight: 12, marginLeft: 12 }}
              className="h-40 flex items-center"
            >
              <CompareArrows />
            </span>
            <input
              type={"time"}
              min={startValue}
              value={endValue}
              onChange={(e) => {
                if (startValue === "") {
                  setValidation({
                    state: false,
                    message: "Start time is required",
                  });
                  return;
                }

                setEndValue(e.target.value);
              }}
              style={{
                border: "1px solid #e6e6e6",
                borderLeft: "2px solid grey",
                textAlign: "left",
                h: 40,
                color: "#1e1e1e",
                borderRadius: "5px",
                fontSize: "1.1rem",
                w: "auto",
                padding: 5,
                outline: "none",
              }}
            />
          </div>
        </div>
        {
          // IF INPUT IS NOT VALIDATED AND IT HAS NO PATTERN OR INPUT IS NOT VALIDATED YET IT IS REUIRED
          (!validation?.state && inputData?.pattern !== "") ||
          (!validation?.state && inputData?.required) ? (
            <span
              style={{ fontSize: 11, bottom: -5 }}
              className="bg-red-300 pl-[20px]  absolute z-[500]"
            >
              {validation.message}
            </span>
          ) : null
        }
      </div>
    </div>
  );
}
