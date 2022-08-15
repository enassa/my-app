import { Settings } from "@mui/icons-material";
import { ClickAwayListener } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useCreateElectionServices } from "../context/create-election-context";

export default function CategorySelector({ data }) {
  const [showPopUp, setShowPopUp] = useState(false);
  const {
    bluePrintState,
    generalInfoPrint,
    updateDate,
    errors,
    setError,
    updateGeneralInfo,
    validateForm,
    addContestantDef,
    deleteContestantDef,
    updateContestantDef,
    addPosition,
    deletePosition,
    updatePosition,
  } = useCreateElectionServices();
  const [categoryArr, setCategoryArr] = useState(data?.Categories);
  useEffect(() => {
    if (categoryArr === undefined && !!data?.Categories) {
      setCategoryArr(data?.Categories);
      return;
    }
    updatePosition({ ...data, Categories: categoryArr });
  }, [categoryArr]);

  const modifyPositionCategory = (categoryId, optionId, checked, category) => {
    let allCategories = data?.Categories;
    if (categoryId === "all") {
      setCategoryArr([]);
      return;
    }
    if (optionId === undefined) {
      let newCategories = allCategories.filter(
        (item) => item?.CategoryId !== categoryId
      );
      setCategoryArr(newCategories);
      return;
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

  const ejectCategories = () => {
    return bluePrintState?.Categories.map((item, index) => {
      return (
        <div key={index} className="w-full flex flex-col">
          <div className="w-full whitespace-nowrap h-[40px] flex flex-row items-center">
            <input
              id={`${item.Id}`}
              name={`_${item.Id}`}
              type="checkbox"
              className="font-semibold mr-2"
              checked={true}
              onChange={(e) => {
                if (e.target.checked) return;
                modifyPositionCategory(
                  item?.Id,
                  undefined,
                  e.target.checked,
                  item
                );
              }}
            />
            <label
              className="w-full font-semibold cursor-pointer whitespace-nowrapl flex justify-start"
              htmlFor={`${item.Id}`}
              style={{ position: "static", display: "flex" }}
            >
              {item?.Title}
            </label>
          </div>
          <div className="w-full text-sm flex flex-col pl-4">
            {item?.Options.map((option, index) => {
              return (
                <div className="w-full whitespace-nowrap h-[20px] flex flex-row items-center">
                  <input
                    id={`_${item?.Id}${option.Id}`}
                    name={`_${item.Id}`}
                    type={`${item.MultipleSelect ? "checkbox" : "radio"}`}
                    className="font-semibold mr-2"
                  />
                  <label
                    style={{ position: "static", display: "flex" }}
                    className="w-full text-gray-800 cursor-pointer whitespace-nowrapl flex justify-start"
                    htmlFor={`_${item?.Id}${option.Id}`}
                  >
                    {option?.Title}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };
  return (
    <div className="h-full cursor-pointer relative text-gray-500 flex justify-center items-center">
      <span className="text-xs mr-1">Categories </span>
      <Settings onClick={() => setShowPopUp(true)} />
      {showPopUp && (
        <ClickAwayListener onClickAway={() => setShowPopUp(false)}>
          <div className="w-auto flex flex-col min-w-[200px] px-3 py-3 h-auto animate-rise z-[555] bottom-[0px] bg-white absolute  shadow-md">
            <div className="w-full whitespace-nowrap h-[40px] flex flex-row items-center">
              <input
                id={``}
                name={``}
                type="checkbox"
                className="font-semibold mr-2"
              />
              <label
                style={{ position: "static", display: "flex" }}
                className="w-full font-semibold cursor-pointer whitespace-nowrapl flex justify-start"
                htmlFor={``}
              >
                All
              </label>
            </div>
            {ejectCategories()}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
