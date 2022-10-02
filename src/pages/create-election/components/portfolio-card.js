import { Delete, Settings } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { defFieldsOption } from "../../../components/contants/ui-data";
import DropDownButton from "../../../components/drop-down-button/drop-down-button";
import CategorySelector from "../category-manager/category-selector";

export default function PortfolioCard({
  data,
  handleChange,
  handleDelete,
  disabled,
  error,
  name,
}) {
  const [inputValue, setInputValue] = useState(undefined);
  const [categoryArr, setCategoryArr] = useState();
  useEffect(() => {
    if (inputValue === undefined && !!data) {
      setInputValue(data?.Title);
      return;
    }
    if (categoryArr === undefined) {
      setCategoryArr(data.Categories);
    } else {
      handleChange &&
        handleChange({ ...data, Title: inputValue, Categories: categoryArr });
    }
  }, [inputValue, categoryArr]);

  const modifyPositionCategory = (categoryId, optionId, checked, category) => {
    let allCategories = data?.Category;
    if (categoryId === "all") {
    }
    if (optionId === null && categoryId) {
      let newCategories = allCategories.filter(
        (item) => item?.CategoryId !== categoryId
      );
      setCategoryArr(newCategories);
    }
    if (checked) {
      allCategories.push({
        ...category,
        CategoryId: categoryId,
      });
    } else {
      let indexOfCategory = allCategories.findIndex(
        (item) => item.CategoryId === categoryId && item.Id === optionId
      );
      allCategories.splice(indexOfCategory, 1);
    }
    setCategoryArr(allCategories);
  };
  return (
    <div className="w-[95%] flex items-center h-[50px]  mb-3">
      <div
        className={`${
          error ? "border-red-200 border" : ""
        } w-[100%] px-2 h-[50px] mr-2 shadow mb-3 flex`}
      >
        <input
          name={name}
          placeholder="eg. Boys prefect"
          className="w-full h-full px-2 outline-none"
          type="text"
          disabled={disabled}
          value={data?.Title}
          onFocus={(e) => {
            e.target.select();
          }}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <CategorySelector data={data} />
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
