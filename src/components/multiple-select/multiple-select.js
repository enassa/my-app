import React, { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

export default function MultipleSelect({
  dropDownList,
  getSelectedItems,
  defaultValues,
  onChange,
  getclickedEvent,
  addItem,
  removeItem,
  values,
  title,
}) {
  const [itemsSelected, setItemsSelected] = useState([]);
  const handleItemChange = (option) => {
    console.log(option);

    const itemAlreadySelected = itemsSelected.includes(option);
    if (itemAlreadySelected) {
      setItemsSelected(itemsSelected.filter((item) => item !== option));
    } else {
      setItemsSelected([...itemsSelected, option]);
    }
    getSelectedItems && getSelectedItems([...itemsSelected, option]);
  };
  useEffect(() => {
    console.log(defaultValues);
    defaultValues && setItemsSelected([defaultValues]);
  }, []);

  const ejectOptions = () => {
    const options = values || ["Option 1", "Option 2", "Option 3", "Option 4"];
    return options.map((option, index) => {
      return (
        <label
          htmlFor={option}
          className="w-full cursor-pointer mb-1 flex items-center"
          key={index}
          value={option}
        >
          <input
            onClick={() => handleItemChange(option)}
            onChange={(e) => {
              if (e.target.checked) {
                addItem(option);
              } else {
                removeItem(option);
              }
            }}
            checked={itemsSelected.includes(option)}
            id={option}
            className="mr-1 cursor-pointer"
            type="checkbox"
          />
          <span>{option}</span>
        </label>
      );
    });
  };
  const [dropSelection, setDropSelection] = useState(false);
  return (
    <div
      onClick={() => {
        setDropSelection(!dropSelection);
      }}
      className="flex appearance-none h-10 w-full px-3 py-2 border border-gray-300 rounded-md relative shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      {itemsSelected.length ? (
        <div className="w-full h-5 ">{itemsSelected.length} selected</div>
      ) : (
        <div className="w-full h-5 ">{title || "Select options"}</div>
      )}
      <span>
        {dropSelection ? (
          <ChevronDownIcon className="h-6 w-6 text-gray-500 rotate-180" />
        ) : (
          <ChevronUpIcon className="h-6 w-6 text-gray-500 rotate-180" />
        )}
      </span>
      {dropSelection && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute w-full left-0 bg-white shadow z-50 rounded-md top-10 h-auto p-2 border flex flex-col  border-gray-300 "
        >
          {ejectOptions()}
        </div>
      )}
    </div>
  );
}
