import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  checkRegex,
  replaceUnderscoreWithSpace,
} from "../../contants/libraries/easy";

export default function InputField({ handleOnChange, inputData, error }) {
  const [validation, setValidation] = useState({ state: false });
  const [inputValue, setInputValue] = useState("");

  // const checkValidation = (value, message) => {
  //   //   CHECK IF ITS REQUIRED BUT EMPTY
  //   if (inputData.required && value === "") {
  //     handleOnChange(inputData.name, value, {
  //       name: inputData.name,
  //       state: false,
  //       message: `${inputData.name} is required`,
  //     });
  //     setValidation({ state: false, message: `${inputData.name} is required` });
  //     return;
  //   }
  //   // CHECK IF IS REQUIRED BUT INPUT IS NOT EMPTY AND THE FIELD DOES NOT REQUIRE REGEX VALIDATION
  //   else if (inputData.required && value !== "" && inputData.pattern === "") {
  //     handleOnChange(inputData.name, value, {
  //       name: inputData.name,
  //       state: true,
  //       message: `${inputData.name} is required`,
  //     });
  //     setValidation({ state: true, message: `${inputData.name} is required` });
  //   }
  //   //  CHECK IF PATTERN IS REQUIRED AND INPUT MATCHES PATTERN
  //   else {
  //     setValidation({ state: true, message: `` });
  //     if (inputData.pattern === "") return;
  //     if (checkRegex(value, inputData.pattern)) {
  //       handleOnChange(inputData.name, value, {
  //         name: inputData.name,
  //         state: true,
  //         message: ``,
  //       });
  //       setValidation({ state: true, message: "" });
  //       return;
  //     }
  //     handleOnChange(inputData.name, value, {
  //       name: inputData.name,
  //       state: false,
  //       message,
  //     });
  //     setValidation({ state: false, message: inputData.helperText });
  //   }
  // };
  //   const handleOnChange = (value) => {
  //     setinputValuee(value)
  //   }

  // useEffect(() => {
  //   checkValidation(inputValue);
  //   // return () => {
  //   // };
  // }, [inputValue]);
  const labelForm = replaceUnderscoreWithSpace(inputData?.label);
  return (
    <div
      key={`pf${inputData?.index}`}
      style={{ paddingLeft: 4 }}
      className=" flex items-center text-gray-500 overflow-hidden h-[100px] min-h-[100px] w-full  relative"
    >
      <div
        style={{ padding: 15 }}
        className="justify-center items-center rounded-md shadow min-h-[50px] h-[50p] min-w-[50p] w-[50px]"
      >
        {inputData?.icon}
      </div>
      <div className="w-full flex  flex-col ">
        <div
          style={{ borderBottom: "1px solid #e6e6e6", marginLeft: "5%" }}
          className="justify-center ml-[5px] mr-[10px] flex flex-col  w-full "
        >
          {/* <span style={{ color: "#a8aeb4" }}> */}
          <span style={{ color: "" }}>
            {labelForm === "NumberOfVoters" ? "Number of voters" : labelForm}
          </span>
          <div
            className="flex flex-col  justify-start"
            style={{ w: "100%", paddingRight: 50 }}
          >
            <input
              name={inputData.name}
              onChange={(e) => {
                // e.stopPropagation()
                handleOnChange(inputData?.name, e.target.value);
                // checkValidation(e.target.value);
              }}
              // onBlur={(e) => {
              //   e.stopPropagation();
              //   handleOnChange(e.target.value);
              //   // checkValidation(e.target.value);
              // }}
              type={inputData?.type}
              style={{
                border: 0,
                fontSize: "1rem",
                w: "100%",
                outline: "none",
              }}
              value={inputData?.value}
              className="text-gray-500"
            />
          </div>
        </div>
        {
          // IF INPUT IS NOT VALIDATED AND IT HAS NO PATTERN OR INPUT IS NOT VALIDATED YET IT IS REUIRED
          (!validation?.state && inputData.pattern !== "") ||
          (!validation?.state && inputData.required) ? (
            <span
              style={{ fontSize: 11 }}
              className="text-red-400 pl-[30px] absolute bottom-0"
            >
              {validation.message}
            </span>
          ) : null
        }
      </div>
    </div>
  );
}
