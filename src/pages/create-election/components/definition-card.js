import { Delete } from "@mui/icons-material";
import { Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { defFieldsOption } from "../../../components/contants/ui-data";
import DropDownButton from "../../../components/drop-down-button/drop-down-button";
import {
  replaceSpaceWithUnderscore,
  replaceUnderscoreWithSpace,
} from "../../../contants/libraries/easy";

export default function DefinitionCard({
  data,
  handleChange,
  handleDelete,
  disabled,
  error,
  name,
}) {
  const [inputValue, setInputValue] = useState(undefined);
  const [fieldDef, setFieldType] = useState(undefined);
  const [show, setShow] = useState(undefined);

  const [defaultData, setDefaultData] = useState(data);

  useEffect(() => {
    if (
      defaultData.Title === undefined &&
      defaultData.Type === undefined &&
      !!data
    ) {
      setDefaultData(defaultData);
      return;
    }
    handleChange &&
      handleChange({
        ...defaultData,
        Title: replaceSpaceWithUnderscore(defaultData.Title),
      });
  }, [defaultData]);
  return (
    <div className="w-[95%] flex items-center h-[50px]  mb-3">
      <div
        className={`${
          error ? "border-red-200 border" : ""
        } w-[100%] h-[50px] mr-2 shadow mb-3`}
      >
        <input
          name={name}
          placeholder="eg. House name"
          className="w-full h-full px-2 outline-none"
          type="text"
          onFocus={(e) => {
            e.target.select();
          }}
          disabled={disabled}
          value={replaceUnderscoreWithSpace(data.Title)}
          onChange={(e) => {
            setDefaultData({
              ...defaultData,
              Title: e.target.value,
            });
          }}
        />
      </div>
      <DropDownButton
        handleChange={(value) => {
          setDefaultData({ ...defaultData, fieldDef: value });
          setFieldType(value);
        }}
        valueSelected={data.Type}
        data={defFieldsOption}
        disabled={disabled}
      />
      <div className="h-full w-[100px] ml-2 bg-white justify-center items-center">
        <Switch
          onChange={(e) => {
            setDefaultData({ ...defaultData, Show: e.target.checked });
          }}
          checked={data.Show || false}
          disabled={disabled}
        />
      </div>
      <div className="w-[50px] ml-3 justify-end cursor-pointer px-2 h-[50px] flex items-center mb-3">
        {/* <Edit className="mr-2" /> */}
        <Delete
          onClick={() => {
            !disabled && handleDelete(data);
          }}
          className={`${
            disabled ? "text-gray-300" : "text-red-300 hover:text-red-600"
          } mr-2  `}
        />
      </div>
    </div>
  );
}
