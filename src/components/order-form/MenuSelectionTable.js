import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CogIcon,
  SearchIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import {
  CheckCircleIcon,
  PlusCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useMenuServices } from "../../context/menu-config-context";
import TableLoader from "../loader/table-loader";
import { ORG_NAME, randomImages } from "../../constants/urls";
import { errorToast } from "../toast/toastify";
import { User } from "../contants/ui-data";
import DropdownMultiple from "../drop-down-mulitple/drop-down-mulitple";
// import { branches } from "../contants/ui-data";

export default function MenuSelectionTable({
  onAddSelected,
  branchData,
  handleClose,
}) {
  const [menuData, setMenuData] = useState(null);
  const [activeOption, setActiveOption] = useState("none");
  const [rows, setRow] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const { loading, getMenuByType } = useMenuServices();
  const [totals, setTotals] = useState({ itemCount: 0, totalPrice: 0 });
  const [dropMore, setDropMore] = useState("");
  const [search, setSearch] = useState("");
  const searchRef = useRef("");
  const [allSelected, setAllselected] = useState({});
  const [errors, setErrors] = useState([]);
  const [showOptionsSearch, setShowOptionsSearch] = useState(false);
  const [selectedOptions, setSelectedOption] = useState({});

  useEffect(() => {
    if (!rows?.length && !loading) {
      let newArrays = [];
      getMenuByType("Main", ORG_NAME()).then((resp) => {
        // console.log(resp);
        setLoadingMenu(false);
        newArrays = resp.data.map((item) => {
          return {
            ...item,
            quantity: 0,
            total: 0,
            selected: false,
          };
        });
        let newData = [];
        // console.log(User().branch);
        newData = newArrays.filter((item) => item.branch === User().branch);
        setRow(newData);
      });
    }
  }, []);
  const activeOptionsData = !!menuData
    ? Array.isArray(menuData[activeOption])
      ? menuData[activeOption]
      : []
    : [];
  // console.log(activeOptionsData);

  const textColor = "text-gray-600";
  const bgColor = "bg-gray-100 ";
  const bgColor2 = "bg-[rg[255,255,255,0.9] ";
  const transparentBg = "bg-[rgb(0,0,0,0.1)]";
  const errorBg = "bg-[rgb(227,76,57,0.8)]";
  const errorText = "text-white";

  const getMenuUsingType = (type) => {
    if (!!menuData) {
      setActiveOption(type);
      return;
    }
    const getMenuOptions = getMenuByType("Options", ORG_NAME());
    const getMenuSauces = getMenuByType("Sauces", ORG_NAME());
    const getMenuSides = getMenuByType("Sides", ORG_NAME());
    const getMenuProteins = getMenuByType("Proteins", ORG_NAME());
    const getMenuDrinks = getMenuByType("Drinks", ORG_NAME());

    Promise.all([
      getMenuOptions,
      getMenuSauces,
      getMenuSides,
      getMenuProteins,
      getMenuDrinks,
    ]).then(
      async ([
        menuOptions,
        menuSauces,
        menuSides,
        menuProteins,
        menuDrinks,
      ]) => {
        let collectedData = {
          Options: await menuOptions?.data,
          Sauces: await menuSauces?.data,
          Sides: await menuSides?.data,
          Proteins: await menuProteins?.data,
          Drinks: await menuDrinks?.data,
        };
        // console.log(collectedData);
        setMenuData({ ...collectedData });
        setActiveOption(type);
      }
    );
  };
  const validateAllSelectedBeforeSubmit = () => {
    let allErrors = [];
    let newErrors = [];
    const configOptions = ["Options", "Sauces", "Sides", "Proteins", "Drinks"];
    let allSelectedMenuItems = rows.filter((item) => item.selected === true);
    allSelectedMenuItems.map((item, index) => {
      configOptions.forEach((configOption, index) => {
        let shoudBeSelectedNumber = item[`max${configOption}`];
        let selectedNumber = item[configOption]?.length;
        // console.log(shoudBeSelectedNumber, selectedNumber);
        if (selectedNumber < shoudBeSelectedNumber) {
          //if option is not already added to error array,  add the option to the erros array to
          // if (!errors.includes(configOption)) {
          //   console.log();
          newErrors.push(configOption);
          // }
        }
        // console.log(newErrors);
      });
    });
    if (newErrors.length) {
      let freshArrays = [...errors, ...newErrors];
      setErrors([...new Set(freshArrays)]);
      // console.log(newErrors);
      return false;
    } else {
      // setErrors([]);
      // console.log(newErrors);
      return true;
    }
    // console.log(allOptions);
  };
  let validation = (options) => {};
  const [activeConfig, setActiveConfig] = useState();
  const getMenuConfigs = (row) => {
    const numberofSelected = selectedOptions[activeOption]?.length;
    let shouldBeSelected = undefined;
    const configs = [
      {
        name: "Options",
        icon: <CogIcon />,
        min: row?.minOptions,
        max: row?.maxOptions,
      },
      {
        name: "Sauces",
        icon: <CogIcon />,
        min: row?.minSauces,
        max: row?.maxSauces,
      },
      {
        name: "Sides",
        icon: <CogIcon />,
        min: row?.minSides,
        max: row?.maxSides,
      },
      {
        name: "Proteins",
        icon: <CogIcon />,
        min: row?.minProteins,
        max: row?.maxProteins,
      },
      {
        name: "Drinks",
        icon: <CogIcon />,
        min: row?.minDrinks,
        max: row?.maxDrinks,
      },
    ];

    validation = (option) => {
      let activeOptionObj = configs.filter(
        (item) => item.name === activeOption
      );
      let activeOptionChoices = row.optionsList.filter(
        (item) => item.type === activeOption
      );

      if (activeOptionChoices?.length >= activeOptionObj[0].max) {
        // console.log(
        //   "succes",
        //   errors,
        //   activeOptionChoices.length,
        //   activeOptionObj[0].max
        // );

        let newErrors = errors.filter((item) => item !== activeOption);
        if (newErrors?.length !== undefined) {
          setErrors([...newErrors]);
        } else {
          setErrors([]);
        }
        return true;
      } else {
        // console.log(
        //   // "error",
        //   // errors,
        //   activeOptionChoices.length,
        //   activeOptionObj[0].max
        // );

        if (!errors.includes(activeOption)) {
          setErrors([...errors, activeOption]);
        }
        return false;
      }
      // if(activeOptionObj.max )
    };

    return configs.map((item, index) => {
      shouldBeSelected = row[`max${item.name}`];
      return (
        <>
          <div
            className={`flex h-[60px] relative  hvr-underline-from-left  
            ${
              activeConfig === "sssss"
                ? `${
                    errors.includes(item.name) ? transparentBg : transparentBg
                  }`
                : ""
            } 
            w-full p-2  pt-0  flex-row items-center justify-center`}
            onClick={() => {
              // if (validation(item)) {

              // }
              validation(item);
              getMenuUsingType(item.name);
              setActiveConfig(index);
            }}
          >
            <div className="h-full relative w-full flex items-center justify-center ">
              <span
                className={`w-[20px] h-[20px] mr-1  ${
                  activeConfig === index
                    ? `${
                        errors.includes(item.name)
                          ? "text-orange-800"
                          : "text-orange-800"
                      }`
                    : ""
                } `}
              >
                {item.icon}
              </span>
              <span
                className={` ${
                  errors.includes(item.name) ? textColor : textColor
                }  ${
                  activeConfig === index
                    ? `${
                        errors.includes(item.name)
                          ? "text-orange-800"
                          : "text-orange-800"
                      }`
                    : ""
                } `}
              >
                {item.name}
              </span>
              <span
                className={`h-8 w-8 px-2 ml-2 relative  rounded-full 
                ${
                  activeConfig === index
                    ? `${
                        errors.includes(item.name)
                          ? "bg-orange-50 text-gray-800"
                          : "bg-orange-50 text-gray-800"
                      }`
                    : null
                }
        
                flex justify-center items-center
                `}
              >
                <span>{item?.max} </span>
              </span>
              {(activeOption === item.name &&
                numberofSelected > shouldBeSelected) ||
              errors.includes(item.name) ? (
                <strong
                  style={{ fontSize: 10 }}
                  className="absolute text-red-600 rounded-full py-0 px-2 animate-rise text-xs bottom-[-2px]"
                >
                  Minimum of {item.max} required
                </strong>
              ) : null}
              {activeOption === item.name ? (
                <span
                  onClick={() => {
                    setShowOptionsSearch(true);
                  }}
                  className=" text-orange-800 ml-4 mt-3 animate-rise"
                >
                  <PlusCircleIcon className="h-6 w-6" />
                </span>
              ) : null}
            </div>
          </div>
        </>
      );
    });
  };

  useEffect(() => {}, [allSelected.length]);
  const computedItemsCount = () => {
    let itemCount = 0;
    let priceSum = 0;
    rows.map((item) => {
      return (itemCount = itemCount + item.quantity);
    });
    rows.map((item) => {
      return (priceSum = priceSum + item.total);
    });
    let newData = { itemCount: itemCount, totalPrice: priceSum };
    setTotals(newData);
    return newData;
  };
  const handleChange = (value, row, selectState) => {
    let rowsData = rows;
    let processedValue = value === "" ? null : parseInt(value);
    const indexOfModifiedRow = rows.findIndex((item) => item.id === row.id);
    if (indexOfModifiedRow !== -1) {
      let rowToModify = row;
      let total = rowToModify.price * value;
      let newRowData = {
        ...rowToModify,
        quantity: processedValue,
        total,
        selected: selectState,
      };
      rowsData.splice(indexOfModifiedRow, 1, newRowData);
      setRow([...rowsData]);
      setTimeout(() => {
        computedItemsCount();
      }, 10);
    } else {
    }
  };

  const sendSelectedItems = () => {
    let selectedRows = rows.filter((item) => {
      return item.selected === true;
    });
    onAddSelected(selectedRows);
  };

  const handleSearch = (e) => {
    setShowOptionsSearch(true);
    const { value } = e.target;
    setSearch(value);
  };

  // Function to add menu item choice eg options, sauces, protein, etc
  const addToMenuChoices = (menuMain, selectedChoiceItems) => {
    // console.log(selectedChoiceItems);
    // console.log(selectedChoiceItems);
    let choiceItems = [...selectedChoiceItems];
    const freshCopyOfRows = rows;
    let choiceItemName = `${choiceItems[0].type}`;
    // Check if this item must be added as an extra charged item
    const indexOfRow = freshCopyOfRows.findIndex(
      (content) => content.id === menuMain.id
    );

    choiceItems.map((item, index) => {
      console.log(item.index);
      let row = freshCopyOfRows[indexOfRow];
      let choiceItem = item;
      const isExtraItem =
        row[`${choiceItemName}`].length >= row[`max${choiceItemName}`];

      const computePrice = () => {
        let newPrice = row.price + choiceItem.price;
        return newPrice;
      };
      const computeTotal = () => {
        let newTotal = (row.price + choiceItem.price) * row.quantity;
        return newTotal;
      };
      const computeExtraChargesSum = () => {
        const newExtraChargeSum = row.extraChargesSum + choiceItem.price;
        return newExtraChargeSum;
      };
      const computeExtraChargeItems = () => {
        const newExtraChargeitems = [...row.extraChargItems, choiceItem];
        return newExtraChargeitems;
      };
      const computeExtraChargeIds = () => {
        const newExtraChargeIds = [...row.extraChargeIds, choiceItem.id];
        return newExtraChargeIds;
      };
      const computeExtraChargeIndexes = () => {
        const newExtraChargeIds = [
          ...row.extraChargeIndexes,
          item.index,
          // `${index}${choiceItemName}${item.menuItem}`,
        ];
        return newExtraChargeIds;
      };
      const newMenuItem = {
        ...row,
        selected: true,
        optionsList: [...row.optionsList, choiceItem],
        quantity: row.quantity,
        [choiceItemName]: [...row[choiceItemName], item],
        price: isExtraItem ? computePrice() : row.price,
        total: isExtraItem ? computeTotal() : row.total,
        extraChargesSum: isExtraItem
          ? computeExtraChargesSum()
          : row.extraChargesSum,
        extraChargItems: isExtraItem
          ? computeExtraChargeItems()
          : row.extraChargItems,
        extraChargeIds: isExtraItem
          ? computeExtraChargeIds()
          : row.extraChargeIds,
        extraChargeIndexes: isExtraItem
          ? computeExtraChargeIndexes()
          : row.extraChargeIndexes,
        index: index,
      };
      freshCopyOfRows.splice(indexOfRow, 1, newMenuItem);
      if (index === choiceItems.length - 1) {
        setRow([...freshCopyOfRows]);
        // console.log(freshCopyOfRows);
      }
    });
    // These functions are called when an item is added as an extra charged item
    // Remove the current row item in the rows and replace with new and modified row item
  };

  const removeMenuChoice = (rowToWorkOn, choiceItem, index) => {
    // console.log(rowToWorkOn, choiceItem, index);
    // return;
    let freshCopyOfRows = rows;
    let row = rowToWorkOn;
    console.log(choiceItem.index, row.extraChargeIndexes);
    const isExtraItem = row.extraChargeIndexes.includes(choiceItem.index);
    // console.log(isExtraItem);
    // This function ensures that when the user selects deselect options there is no funny behaviour,
    // you can take it off and do command in the next commments and see the funny behaviour I am talking about
    const shiftNonExtraChargedItems = () => {
      let copyOfRowToWorkOn = row;

      let indexOfItemToRemove = copyOfRowToWorkOn.extraChargItems.findLastIndex(
        (item) => item.type === choiceItem.type
      );
      console.log(indexOfItemToRemove);
      // return;
      let removedItem = undefined;
      if (indexOfItemToRemove !== -1) {
        removedItem = copyOfRowToWorkOn.extraChargItems.splice(
          indexOfItemToRemove,
          1
        );
        copyOfRowToWorkOn.extraChargeIndexes.splice(indexOfItemToRemove, 1);
      }
      if (!!removedItem) {
        let newcopyOfItem = copyOfRowToWorkOn;
        newcopyOfItem = {
          ...copyOfRowToWorkOn,
          price: copyOfRowToWorkOn.price - removedItem[0].price,
          extraChargesSum:
            copyOfRowToWorkOn.extraChargesSum - removedItem[0].price,
        };
        copyOfRowToWorkOn = newcopyOfItem;
      }

      return copyOfRowToWorkOn;
    };
    // If you want to test the role of shiftNonExtraChargedItems(), you comment out this if block and see the magic

    if (!isExtraItem) {
      row = shiftNonExtraChargedItems();
    }

    const indexOfRow = freshCopyOfRows.findIndex((item) => item.id === row.id);
    let choiceItemName = `${choiceItem.type}`;

    const computePrice = () => {
      let newPrice = row.price - choiceItem.price;
      return newPrice;
    };
    const computeTotal = () => {
      let newTotal = (row.price - choiceItem.price) * row.quantity;
      return newTotal;
    };
    const computeExtraChargesSum = () => {
      const newExtraChargeSum = row.extraChargesSum - choiceItem.price;
      return newExtraChargeSum;
    };
    const computeExtraChargeItems = () => {
      const newExtraChargeitems = [
        ...row.extraChargItems.filter((ele) => ele.index !== choiceItem.index),
      ];
      return newExtraChargeitems;
    };
    const computeExtraChargeIds = () => {
      const newExtraChargeIds = [
        ...row.extraChargeIds.filter((ele) => ele !== choiceItem.index),
      ];
      return newExtraChargeIds;
    };
    const computeExtraChargeIndexes = () => {
      const newExtraChargeIndex = [...row.extraChargeIndexes, index];
      return newExtraChargeIndex;
    };
    // console.log(row[choiceItemName]);
    const newMenuItem = {
      ...row,
      selected: true,
      optionsList: [
        ...row.optionsList.filter((ele) => ele.index !== choiceItem.index),
      ],
      quantity: row.quantity,
      [choiceItemName]: [
        ...row[choiceItemName].filter((ele) => ele.index !== choiceItem.index),
      ],
      price: isExtraItem ? computePrice() : row.price,
      total: isExtraItem ? computeTotal() : row.total,
      extraChargesSum: isExtraItem
        ? computeExtraChargesSum()
        : row.extraChargesSum,
      extraChargItems: isExtraItem
        ? computeExtraChargeItems()
        : row.extraChargItems,
      extraChargeIds: isExtraItem
        ? computeExtraChargeIds()
        : row.extraChargeIds,
      extraChargeIndexes: isExtraItem
        ? computeExtraChargeIndexes()
        : row.extraChargeIndexes,
    };
    freshCopyOfRows.splice(indexOfRow, 1, newMenuItem);
    setRow([...freshCopyOfRows]);
  };

  const handleAddToSelection = (row) => {
    setDropMore(row.id);
    let freshCopyOfRows = rows;
    let indexOfRow = freshCopyOfRows.findIndex((item) => item.id === row.id);
    // When a row is selected, I add a selected property and set it to true
    const newMenuItem = {
      ...row,
      selected: true,
      optionsList: [],
      Options: [],
      Sauces: [],
      Proteins: [],
      Drinks: [],
      Others: [],
      Sides: [],
      userName: User().name,
      quantity: 1,
      total: row.price,
      extraChargesSum: 0,
      extraChargItems: [],
      extraChargeIds: [],
      extraChargeIndexes: [],
      error: false,
    };
    freshCopyOfRows.splice(indexOfRow, 1, newMenuItem);
    setRow([...freshCopyOfRows]);
    // console.log(freshCopyOfRows);
  };

  const removeItemFromSelected = (row) => {
    setDropMore(-1);
    let freshCopyOfRows = rows;
    let indexOfRow = freshCopyOfRows.findIndex((item) => item.id === row.id);
    const newMenuItem = {
      ...row,
      optionsList: [],
      Options: [],
      Sauces: [],
      Proteins: [],
      Drinks: [],
      Others: [],
      Sides: [],
      quantity: 0,
      total: 0,
      extraChargesSum: 0,
      extraChargItems: [],
      selected: false,
      error: false,
    };
    freshCopyOfRows.splice(indexOfRow, 1, newMenuItem);
    setRow([...freshCopyOfRows]);
    // drop down accordion
  };
  const getDefaultConfigOption = (row) => {
    // console.log(row[activeOption]);
    const configContent = Array.isArray(row[activeOption])
      ? row[activeOption]
      : [];
    // const numberofSelected = row[activeOption]?.length;
    // const shouldBeSelected = row[`max${activeOption}`];
    // console.log(numberofSelected, shouldBeSelected);
    return (
      <div className="w-[99%] min-h-[200px] mb-2  ">
        <div className="w-full flex flex-col p-2 overflow-y-auto items-center bg-gray-1200">
          {/* <div className="w-[99%] h-[50px] bg-[rgb(255,255,255,0.9)] justify-between mb-2 flex  flex-col shadow-sm"> */}
          {/* <ComboMultipleSelect
              inputData={{
                name: "name",
                icon: <PlusCircleIcon />,
                label: "Add Options",
                type: "input",
                pattern: "",
                required: true,
                helperText: "",
              }}
            /> */}
          {/* 
            <MultipleSelect
              title="Select branches"
              values={branches}
              addItem={(option) => {
                // push(option);
                alert(option);
              }}
              removeItem={(option) => {
                alert("option");
                // const itemIndex = values.branch.findIndex(
                //   (item) => item === option
                // );
                // if (itemIndex > -1) {
                //   console.log(itemIndex);
                //   // remove(itemIndex);
                // }
              }}   />
             */}

          {/* <ComboMultipleSelect /> */}
          {/* </div> */}
          {/* <div className="w-full h-full py-2 bg-orange-400 overflow-y-auto  mt-20 overflow-x-hidden justify-start flex-col">
              <ComboMultipleSelect
                inputData={{
                  name: "name",
                  icon: <PlusCircleIcon />,
                  label: "Add Options",
                  type: "input",
                  pattern: "",
                  required: true,
                  helperText: "",
                }}
              />
            </div> */}
          {/* {console.log("k")} */}
          {configContent.map((item, index) => {
            // console.log(item.branch, User().branch);
            // console.log(item);
            // console.log(row.extraChargeIndexes);
            return (
              <>
                <div className="w-[99%] h-[100px] text-white rounded-md bg-[#231414e6] justify-between mb-2 flex  flex-col shadow-sm">
                  <div className="w-[99%] h-full  justify-between flex  px-2 items-center ">
                    <div className="flex items-center">
                      {/* <input
                            name={activeOption}
                            key={item.id}
                            onChange={(e) => {
                              if (e.target.checked) {
                                addToMenuChoices(row, item);
                              } else if (!e.target.checked) {
                                removeMenuChoice(row, item);
                              }
                            }}
                            className="cursor-pointer mr-2 h-4 w-4"
                            type={"checkbox"}
                            checked={
                              row[`${item.type}`]?.findIndex(
                                (ele) => ele.id === item.id
                              ) !== -1
                            }
                          /> */}
                      <span className="w-6 h-6 flex justify-center text-white mr-4 bg-orange-600 rounded-full">
                        {index + 1}
                      </span>
                      <span
                        style={{
                          backgroundImage: `url('${item.imageUrl}')`,
                        }}
                        className="w-16 h-16 mr-3 bg-gray-200 rounded-full bg-no-repeat bg-cover bg-center "
                      ></span>
                      <span className="mr-2">{item.menuItem}</span>
                    </div>
                    <style>
                      {`
                          .blue-color:{background-color: red}
                      `}
                    </style>
                    <span className="h-full items-center flex text-red-400">
                      <div className="flex bg-[rgb(0,0,0,0.5)] blue-color mr-5 p-2 rounded-full justify-center text-blue-100 items-center">
                        <span className="mr-5">GHS {item.price}</span>
                      </div>
                      <TrashIcon
                        onClick={() => {
                          validation(item);
                          removeMenuChoice(row, item, item.index);
                        }}
                        className="h-4 w-4 cursor-pointer hover:text-red-800"
                      />
                    </span>
                  </div>
                  {row?.extraChargeIndexes?.length &&
                  row.extraChargeIndexes.includes(item.index) ? (
                    <span className="w-full mb-1 pl-4 text-xs h-auto text-red-200">
                      This will be charged seperately, +GHS{item.price}
                    </span>
                  ) : null}
                </div>
              </>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <>
      <style>
        {`
        .pop-up-menu-list {
          
          perspective: 100px;
        }
        `}
      </style>
      <div
        // style={{ backgroundImage: `url('${randomImages}')` }}
        className="bg-white"
      >
        <div className="w-full relative flex justify-end">
          <span
            onClick={() => {
              handleClose();
            }}
            className="hover:bg-[#ca4a4a1a] hover:text-[#9f3a3af6] flex justify-center items-center m-2 absolute h-9 w-9  rounded-full"
          >
            <XIcon className="h-4 w-4  " />{" "}
          </span>
        </div>
        <div className="p-5 bg-[rgb(255,255,255,0.9)]">
          <div className="overflow-x  bg-no-repeat bg-cover bg-center  rounded-lg">
            <div className="border-b  border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-medium leading-6 font-arial text-gray-900 sm:truncate">
                  LIST OF MENU OPTIONS
                </h1>
              </div>
            </div>
            <div className="flex-1 w-full bg-[rgb(255,255,255,1)] flex justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative  bg-[rgb(255, 255, 255, 0.9)] w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      ref={searchRef}
                      id="search-field"
                      name="search-field"
                      className="block w-full  bg-[rgb(255, 255, 255, 0.9)] h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      onChange={handleSearch}
                    />
                  </div>
                </form>
              </div>
              <div className="flex items-center">{/* Profile dropdown */}</div>
            </div>
            <table className="overflow-scroll table-auto w-full">
              <thead className="text-left">
                <tr className="border-t border-gray-200">
                  <th
                    className="px-3 py-3 border-b border-gray-200 bg-[rgb(255,255,255,0.2)] text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    <span className="h-50 flex items-center relative">
                      <CheckCircleIcon className="w-5 h-5 absolute " />
                    </span>
                  </th>
                  <th
                    className="px-3 py-3 border-b border-gray-200 bg-[rgb(255,255,255,0.2)] text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    <span className="h-50 flex items-center relative">
                      {/* <CheckCircleIcon className="w-5 h-5 absolute mb-4" /> */}
                    </span>
                  </th>
                  <th
                    className="px-3 py-3 border-b border-gray-200 bg-[rgb(255,255,255,0.2)] text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Count
                  </th>
                  <th
                    width="20%"
                    className="px-3 py-3 border-b border-gray-200 bg-[rgb(255,255,255,0.2)] text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Category
                  </th>
                  <th
                    width="20%"
                    className="px-3 py-3 border-b border-gray-200 bg-[rgb(255,255,255,0.2)] text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Menu Item
                  </th>
                  <th
                    width="20%"
                    className="px-3 py-3 border-b border-gray-200 bg-[rgb(255,255,255,0.2)] text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Tagname
                  </th>
                  <th
                    className="px-3 py-3 border-b border-gray-200 bg-[rgb(255,255,255,0.2)] text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Type
                  </th>
                  <th
                    className="px-3 py-3 border-b border-gray-200 bg-[rgb(255,255,255,0.2)] text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Size
                  </th>
                  <th
                    className="px-3 py-3 border-b border-gray-200 bg-[rgb(255,255,255,0.2)] text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Price
                  </th>
                  <th
                    className="px-3 py-3 border-b border-gray-200 bg-[rgb(255,255,255,0.2)] text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Qty.
                  </th>
                  <th
                    className="px-3 py-3 border-b border-gray-200 bg-[rgb(255,255,255,0.2)] text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Total
                  </th>
                  <th
                    className="px-3 py-3 border-b border-gray-200 bg-[rgb(255,255,255,0.2)] text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    {/* Total */}
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-100">
                {loadingMenu ? (
                  <TableLoader />
                ) : rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-10 text-2xl font-sm font-arial-arounded text-gray-600"
                    >
                      No Data
                    </td>
                  </tr>
                ) : (
                  !!rows &&
                  rows
                    ?.filter((row) => {
                      if (branchData) {
                        return (
                          row.branch.toLowerCase() === branchData?.toLowerCase()
                        );
                      } else {
                        return row;
                      }
                    })
                    .filter((row) => {
                      if (search !== "") {
                        return row.menuItem
                          .toLowerCase()
                          .includes(search.toLowerCase());
                      } else {
                        return row;
                      }
                    })
                    .map((row, index) => {
                      // console.log(row);
                      return (
                        <>
                          <tr
                            key={index}
                            className={` ${
                              dropMore === row.id ? "relative" : "relative"
                            }`}
                          >
                            <div
                              className={`mt-4 
                          ${dropMore !== row.id ? "" : "invisible"}  
                            flex items-center animate-rise  flex-shrink-0 sm:mt-0 sm:ml-5 px-2 left-[97px] bottom-1 absolute z-[555]`}
                            >
                              {/* <div className="mt-4 flex items-center flex-shrink-0 sm:mt-0 sm:ml-5 top-2 absolute left-[40%] z-[555]"> */}
                              <div className="flex overflow-hidden -space-x-1">
                                {row?.optionsList?.map((item, index) => {
                                  // console.log(item.imageUrl);
                                  return (
                                    <span className="bg-gray-100 rounded-full">
                                      <img
                                        key={index}
                                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                        src={item.imageUrl}
                                        alt={item.name}
                                      />
                                    </span>
                                  );
                                })}
                              </div>
                              {/* {row?.extraChargesSum && dropMore !== row.id ? ( */}
                              {row?.extraChargesSum >= 0.1 ? (
                                <span
                                  className={`whitespace-nowrap flex text-red-400 h-full items-center  animate-rise rounded-lg   text-black font-extrabold text-xs`}
                                >
                                  <span>
                                    {" "}
                                    &nbsp;+GHS{" "}
                                    {row?.extraChargesSum.toFixed(2) ||
                                      "0"}{" "}
                                  </span>
                                </span>
                              ) : null}
                            </div>
                            <td className="px-3 py-3 max-w-0 whitespace-nowrap text-sm font-normal text-gray-500">
                              <input
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    handleAddToSelection(row);
                                    setActiveConfig(0);
                                    getMenuUsingType("Options");
                                  } else {
                                    removeItemFromSelected(row);
                                  }
                                }}
                                className="cursor-pointer"
                                type={"checkbox"}
                              />
                            </td>
                            <td className="px-3 py-3 max-w-0 whitespace-nowrap text-sm font-normal text-gray-500">
                              {index + 1}
                            </td>
                            <td className="px-3 py-3 max-w-0 whitespace-nowrap text-sm font-normal text-gray-500">
                              {row?.category}
                            </td>
                            <td className="px-3 py-3 max-w-0 whitespace-nowrap text-sm font-normal text-gray-500">
                              {row?.menuItem}
                            </td>
                            <td className="px-3 py-3 max-w-0 whitespace-nowrap text-sm font-normal text-gray-500">
                              {row?.tagName}
                            </td>
                            <td className="px-3 py-3 text-sm text-gray-700">
                              <div className="text-gray-500 font-normal hover:underline">
                                {row?.type}
                              </div>
                            </td>
                            <td className="px-3 py-3 text-sm text-gray-700">
                              <span
                                className={`py-1 px-2 text-xs font-medium uppercase tracking-wider   rounded-lg bg-opacity-50`}
                              >
                                {row?.size}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-gray-500  font-normal text-sm">
                              {row?.price?.toFixed(2)}
                            </td>
                            <td className="px-3 py-3 text-gray-500  font-normal text-sm">
                              <input
                                onChange={(e) => {
                                  handleChange(e.target.value, row, true);
                                }}
                                onBlur={(e) => {
                                  if (row.quantity < 1) {
                                    handleChange(1, row, true);
                                  }
                                }}
                                value={row?.quantity}
                                type="number"
                                disabled={!row?.selected}
                                className="w-[70px] appearance text-gray-800  h-[25px] bg-blue-50 focus:bg-blue-100 outline-none rounded-lg pl-2 pr-2"
                              />
                            </td>
                            <td className="px-3 py-3 text-gray-500  font-normal text-sm">
                              <span
                                type="number"
                                className="w-[70px] text-xs text-md p-1 appearance h-[30px] bg-gray-100 rounded-lg pl-2 pr-2"
                              >
                                {row?.total?.toFixed(2)}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-gray-500  font-normal text-sm">
                              {/* {row.selected && ( */}
                              <span
                                type="number"
                                className={`w-[70px] ${
                                  dropMore === row.id ? "text-red-400" : ""
                                } text-xs text-md p-1 appearance h-[30px] rounded-lg pl-2 pr-2`}
                              >
                                {dropMore !== row.id ? (
                                  <ChevronDownIcon
                                    onClick={() => {
                                      row.selected && setDropMore(row.id);
                                    }}
                                    className="h-5 w-5"
                                  />
                                ) : (
                                  <ChevronUpIcon
                                    onClick={() => {
                                      row.selected && setDropMore(-1);
                                    }}
                                    className="h-5 w-5 animate-bounce"
                                  />
                                )}
                              </span>
                              {/* {row?.extraChargesSum && dropMore !== row.id ? (
                                <span
                                  className={`whitespace-nowrap bg-red-200 animate-rise rounded-lg px-2 right-[50px] bottom-1 absolute  text-black font-extrabold text-xs`}
                                >
                                  Extra charges: GHS{" "}
                                  {row?.extraChargesSum.toFixed(2) || "0"}
                                </span>
                              ) : null} */}
                            </td>

                            {dropMore === row.id ? (
                              // <div className="w-full flex justify-center animate-rise h-[300px]  z-[9000000] absolute top-[97px] left-0">
                              <div
                                style={{ borderRadius: "5px 5px 0px 0px" }}
                                className="w-full overflow-hidden   flex justify-center animate-rise h-auto  z-[9000000] absolute top-[87px] left-0"
                              >
                                <div className="w-full  h-full bg-[rgb(255,255,255)] ">
                                  <div className="w-full bg-[rgb(255,255,255,0.9)] border-b"></div>
                                  <div
                                    className={` flex flex-row border-r ${bgColor2} w-full `}
                                  >
                                    {getMenuConfigs(row)}
                                  </div>
                                  <div className="w-full  border-t"></div>
                                  <div
                                    className={`flex-1 flex justify-between px-4 sm:px-6 lg:px-8 `}
                                  >
                                    <div className="flex-1  flex ">
                                      <form
                                        className="w-full bg-orange-500flex md:ml-0"
                                        action="#"
                                        method="GET"
                                      >
                                        <label
                                          htmlFor="search-field"
                                          className="sr-only"
                                        >
                                          Search
                                        </label>
                                        <div
                                          className={`relative flex items-center w-full ${textColor} focus-within:${textColor} `}
                                        >
                                          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                            <SearchIcon
                                              className={`h-5 w-5 ${textColor} `}
                                              aria-hidden="true"
                                            />
                                          </div>
                                          <input
                                            id="search-field"
                                            name="none"
                                            value=""
                                            className={`block w-full bg-transparent  h-full pl-8 pr-3 py-2 border-transparent ${textColor}  focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm`}
                                            placeholder="Search and add menu items"
                                            type="search"
                                            onClick={() => {
                                              setShowOptionsSearch(true);
                                            }}
                                            onFocus={() => {
                                              setShowOptionsSearch(true);
                                            }}
                                          />
                                          <button
                                            className=" px-2 flex items-center"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              setShowOptionsSearch(true);
                                            }}
                                          >
                                            <PlusCircleIcon className="h-4 w-4 mr-1" />
                                            <span className="whitespace-nowrap w-20 ">
                                              Add {activeOption}
                                            </span>
                                          </button>
                                          {row?.extraChargesSum ? (
                                            <span
                                              className={`whitespace-nowrap bg-red-200 animate-rise rounded-lg px-2  text-black font-extrabold text-xs`}
                                            >
                                              Extra charges: GHS{" "}
                                              {row?.extraChargesSum.toFixed(
                                                2
                                              ) || "0"}
                                            </span>
                                          ) : null}
                                        </div>
                                      </form>

                                      {showOptionsSearch ? (
                                        <div className="w-full animate-rise flex perspe pop-up-menu-list shadow-blend bg-[#231414e6] top-[0px] absolute h-full left-0  z-[9999]">
                                          <DropdownMultiple
                                            getSelected={(allSelected) => {
                                              addToMenuChoices(
                                                row,
                                                allSelected
                                              );
                                              // setPopUpState(false);
                                              // returnSelected(selected);
                                            }}
                                            inputData={activeOptionsData}
                                            activeOption={activeOption}
                                            objPropertyForDrop="menuItem"
                                            handleClose={() => {
                                              setShowOptionsSearch(false);
                                            }}
                                            // getSelected={(allItems) => {
                                            //   addToSelectedOptions(allItems);
                                            // }}
                                          />
                                        </div>
                                      ) : null}
                                    </div>
                                    <div className="flex items-center">
                                      {/* Profile dropdown */}
                                    </div>
                                  </div>
                                  <div className="w-full bg-[rgb(255,255,255,0.9)] border-t"></div>
                                  <div className="w-full h-[300px] overflow-y-auto mb-5 items-center  flex flex-col ">
                                    {loading ? (
                                      <TableLoader />
                                    ) : !!menuData ? (
                                      getDefaultConfigOption(row)
                                    ) : (
                                      <span>No data</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </tr>
                        </>
                      );
                    })
                )}
              </tbody>
            </table>
            <div className="relative border-t">
              <div className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                <div className="w-full whitespace-nowrap bg-b h-full flex justify-end">
                  <div className="flex mr-4">
                    <strong className="text-gray-600">Items count: </strong>
                    &nbsp;
                    <span>{totals.itemCount || "-"}</span>
                  </div>
                  <div className="flex">
                    <strong className="text-gray-600">Total: </strong>
                    &nbsp;
                    <span>GHS: {totals.totalPrice.toFixed(2) || "-"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end mt-3">
            <div className="mt-4 flex sm:mt-0 sm:ml-4">
              {dropMore === -1 && (
                <button
                  onClick={() => {
                    if (validateAllSelectedBeforeSubmit()) {
                      sendSelectedItems();
                    } else {
                      errorToast(
                        "There are errors in your selection please resolve and submit"
                      );
                    }
                  }}
                  type="button"
                  className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-stone-900 hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 sm:order-1 sm:ml-3"
                >
                  Add selected
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
