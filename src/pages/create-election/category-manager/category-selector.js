import { Settings } from "@mui/icons-material";
import { ClickAwayListener } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { portfolioTypes } from "../../../components/contants/ui-data";
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
    console.log(categoryArr);
    updatePosition({ ...data, Categories: categoryArr });
  }, [categoryArr]);

  const modifyPositionCategory = (categoryId, optionId, checked, category) => {
    let allCategories = data?.Categories;
    console.log(categoryId, optionId, checked, category);
    if (categoryId === "all") {
      setCategoryArr([]);
      return;
    }
    if (optionId !== undefined) {
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
    console.log(allCategories);
    setCategoryArr(allCategories);
  };
  const modifyPositionSettings = (setting) => {
    console.log(setting);
    updatePosition({ ...data, Settings: setting });
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
              // checked={true}
              onChange={(e) => {
                // if (e.target.checked) return;
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
                    onChange={(e) =>
                      modifyPositionCategory(
                        item?.Id,
                        undefined,
                        e.target.checked,
                        item
                      )
                    }
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
  const ejectPortFolioType = () => {
    return portfolioTypes.map((item, index) => {
      const isSelected = item.title === data.Settings.title;
      return (
        <div className="w-full whitespace-nowrap  flex flex-col mb-3 bg-gray-50">
          <div className="w-full flex items-center h-[20px] whitespace-nowrap">
            <input
              id={`_${item?.title}${index}`}
              name={`portfolioType`}
              type={`${item.MultipleSelect ? "checkbox" : "radio"}`}
              className="font-semibold mr-2"
              onChange={(e) => {
                modifyPositionSettings(item);
              }}
              defaultChecked={item.title === data.Settings.title}
              // checked={item.title === data.Settings.title}
            />
            <label
              style={{ position: "static", display: "flex" }}
              className="w-full text-gray-800 capitalize cursor-pointer whitespace-nowrapl flex justify-start"
              htmlFor={`_${item?.title}${index}`}
            >
              {item?.title}
            </label>
          </div>
          <div className="w-full h-auto flex flex-col">
            <div className="w-full flex">
              <div className="flex items-center w-full">
                <span className="mr-2">minmax:</span>{" "}
                <input
                  defaultValue={1}
                  className="w-full outline-none min-w-[50px] p-2 bg-gray-100 ml-2 mr-2"
                  type="number"
                  min={1}
                  disabled={!isSelected}
                  value={isSelected ? data.Settings.minSelection : 0}
                  onChange={(e) => {
                    if (isSelected) {
                      modifyPositionSettings({
                        ...item,
                        minSelection: parseInt(e.target.value),
                        maxSelection: data.Settings.maxSelection,
                      });
                    }
                  }}
                />
                <span>:</span>{" "}
                <input
                  defaultValue={1}
                  className="w-full outline-none min-w-[50px] p-2 bg-gray-100 ml-2 mr-2"
                  type="number"
                  min={1}
                  value={isSelected ? data.Settings.maxSelection : 0}
                  disabled={!isSelected}
                  onChange={(e) => {
                    if (isSelected) {
                      modifyPositionSettings({
                        ...item,
                        minSelection: data.Settings.minSelection,
                        maxSelection: parseInt(e.target.value),
                      });
                    }
                  }}
                />
              </div>
              {/* <div className="mt-2 flex items-center w-1/2">
                <span>:</span>{" "}
                
              </div> */}
            </div>
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
            <div className="divide-x-2 h-5"></div>
            <div className="w-full flex flex-col bg-gray-200">
              {ejectPortFolioType()}
            </div>
            <div className="w-full border "></div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
