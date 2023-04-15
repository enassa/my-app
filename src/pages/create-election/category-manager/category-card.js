import { Add, AddCircle, Close, Delete } from "@mui/icons-material";
import { Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  categoryOptionsBluePrint,
  defFieldsOption,
} from "../../../components/contants/ui-data";
import DropDownButton from "../../../components/drop-down-button/drop-down-button";
import { useCreateElectionServices } from "../context/create-election-context";
import MultipleSelect from "../../../components/multiple-select/multiple-select";

export default function CategoryCard({
  data,
  handleChange,
  handleDelete,
  disabled,

  name,
}) {
  const { deleteCategory, errors, setError, updateCategory } =
    useCreateElectionServices();
  const [categoryData, setCategoryData] = useState({ ...data });

  useEffect(() => {
    if (categoryData === undefined && !!data) {
      setCategoryData(data?.Title);
      return;
    }
    setError([]);
    handleChange && updateCategory(categoryData);
  }, [categoryData]);

  const addOption = () => {
    let allOptions = categoryData.Options;
    const idOfLastOption = allOptions[allOptions.length - 1]?.Id;
    let NewOption = {
      ...categoryOptionsBluePrint,
      Id: idOfLastOption + 1,
      Title: `Option ${idOfLastOption + 2}`,
    };
    allOptions.push(NewOption);
    setCategoryData({ ...categoryData, Options: allOptions });
  };

  const deleteOption = (id) => {
    let allOptions = categoryData.Options;
    if (allOptions?.length === 2) return;
    let newOptions = allOptions.filter((item) => item?.Id !== id);
    setCategoryData({ ...categoryData, Options: newOptions });
  };

  const updateOption = (id, value) => {
    let allOptions = categoryData.Options;
    let indexOfItemToEdit = allOptions.findIndex((item) => item?.Id === id);
    let newOption = {
      ...allOptions[indexOfItemToEdit],
      Title: value,
    };
    allOptions.splice(indexOfItemToEdit, 1, newOption);
    setCategoryData({ ...categoryData, Options: allOptions });
  };

  return (
    <div className="w-full h-auto flex flex-col mt-4 bg-gray-50 py-3 px-2 rounded-sm">
      <div className="w-[100%] flex items-center h-[50px]  ">
        <div
          className={`${
            errors.includes(`Category${data?.Id}`)
              ? "border-red-200 border"
              : "border"
          } w-[100%] px-2 h-[50px] mr-2 flex justify-between rounded-lg`}
        >
          <input
            name={name}
            placeholder="eg. Gender"
            className="w-full  h-full px-2 text-xl outline-none bg-transparent"
            type="text"
            disabled={data?.disabled}
            value={data?.Title}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={(e) => {
              setCategoryData({ ...categoryData, Title: e.target.value });
            }}
          />
          <div className="h-full w-auto ml-2   flex justify-center items-center">
            <span className="whitespace-nowrap text-xs">
              Multiple Selection
            </span>
            <Switch
              onChange={(e) => {
                setCategoryData({
                  ...categoryData,
                  MultipleSelect: e.target.checked,
                });
              }}
              checked={data.MultipleSelect || false}
              disabled={disabled}
            />
          </div>
        </div>

        <div className="w-[50px] ml-3 justify-end cursor-pointer px-2 h-[50px] flex items-center mb-3">
          {/* <Edit className="mr-2" /> */}
          <Delete
            onClick={() => {
              !disabled && deleteCategory(data);
            }}
            className={`${
              disabled ? "text-gray-300" : "text-red-300 hover:text-red-600"
            } mr-2  `}
          />
        </div>
      </div>
      {/* {errors?.includes(`Category${data?.Id}`) && (
        <div className="w-full pl-3 flex text-xs justify-start text-red-400">
          Category cannot be empty
        </div>
      )} */}
      <span className="mt-4"></span>
      {Array.isArray(data?.Options) &&
        data?.Options.map((item, index) => {
          return (
            <div
              key={index}
              className="w-[70%] flex items-center h-[50px]  mb-3"
            >
              <div
                className={`${
                  errors?.includes(`CategoryOption${data?.Id}${item?.Id}`)
                    ? "border-red-200 border"
                    : ""
                } w-[100%] px-2 h-[50px] mr-2 shadow mb-3 bg-white  `}
              >
                <input
                  name={name}
                  placeholder="eg. Male"
                  className="w-full h-full px-2 outline-none"
                  type="text"
                  disabled={item?.disabled}
                  value={item?.Title}
                  onFocus={(e) => {
                    e.target.select();
                  }}
                  onChange={(e) => {
                    updateOption(item?.Id, e.target.value);
                  }}
                />
              </div>

              <div className="w-[50px] ml-4 justify-end cursor-pointer px-2 h-[50px] flex items-center mb-3">
                {/* <Edit className="mr-2" /> */}
                <AddCircle
                  onClick={() => {
                    addOption();
                  }}
                  style={{ fontSize: 30 }}
                  className={`${
                    item?.disabled
                      ? "text-gray-300"
                      : "text-gray-500 hover:text-blue-600"
                  } mr-1  `}
                />
                <Delete
                  onClick={() => {
                    !item?.disabled && deleteOption(item?.Id);
                  }}
                  style={{ fontSize: 14 }}
                  className={`${
                    disabled
                      ? "text-gray-300"
                      : "text-red-300 hover:text-red-600"
                  } mr-2   text-xs hover:text-lg `}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
