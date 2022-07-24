import {
  ClipboardCheckIcon,
  ClipboardListIcon,
  ClockIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BRANCH, IS_SUPER_ACCOUNT } from "../../constants/urls";
import { useKitchenServices } from "../../context/kitchen-body-context";
import { ALL_URLS } from "../contants/rout-links";

function Cards({ branch }) {
  const [kitchen, setKitchen] = useState({});
  const {
    getOrders,
    getOrdersBranch,
    currentStatus,
    changeCurrentStatus,
    queryStartDate,
    queryEndDate,
  } = useKitchenServices();

  useEffect(() => {
    if (IS_SUPER_ACCOUNT() && branch === "all") {
      getOrders(queryStartDate, queryEndDate).then((response) =>
        setKitchen(response)
      );
    } else {
      getOrdersBranch(queryStartDate, queryEndDate, branch).then((response) =>
        setKitchen(response)
      );
    }
  }, [currentStatus, queryStartDate, queryEndDate, branch]);
  let cardData = [
    {
      name: "Pending",
      value: kitchen?.pending,
      bgColor: "bg-red-100",
      textColor: "text-red-900",
      icon: <ClockIcon />,
      link: "order-status-lists",
    },
    {
      name: "Processing",
      value: kitchen?.processing,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-900",
      icon: <ClipboardListIcon />,
      link: "order-status-lists",
    },
    {
      name: "Processed",
      value: kitchen?.processed,
      bgColor: "bg-green-100",
      textColor: "text-green-900",
      icon: <ClipboardCheckIcon />,
      link: "order-status-lists",
    },
    {
      name: "Total",
      value: kitchen?.total,
      bgColor: "bg-blue-100",
      textColor: "text-blue-900",
      icon: <ClipboardListIcon />,
      link: "order-lists",
    },
  ];

  return (
    <div className="flex mb-10 flex-col lg:flex-row justify-center items-center  ml-auto mr-auto ">
      {cardData.map((card, index) => {
        return (
          <div
            key={index}
            className="bg-white w-full mr-3 overflow-hidden  shadow-blend rounded-lg mb-5"
          >
            <div className="rounded p-3 relative shadow-sm w-full">
              <div className="flex pb-3 justify-between items-center">
                <h1 className="text-gray-500">
                  {card.name === "Pending" ? "New" : card.name} Orders
                </h1>
                {/* <p className="text-sm text-textGrey">Monthly Goal</p> */}
              </div>
              <div className="flex justify-between items-center my-3">
                <h1 className={`text-3xl absolute ${card.textColor}`}>
                  {card.value}
                </h1>
              </div>
              {!IS_SUPER_ACCOUNT() &&
              <div
                className={`w-15 h-15 p-3 top-14 border-4 border-white  rounded-full flex items-center justify-center right-10  absolute  ${card.bgColor}`}
              >
                <span className={`h-8 w-8 ${card.textColor} opacity-40`}>
                  {card.icon}
                </span>
              </div>}
            </div>
            <div className="bg-gray-50 px-5 py-3">
              {!IS_SUPER_ACCOUNT() && (
                <div className="text-sm">
                  <Link
                    onClick={() => changeCurrentStatus(card.name)}
                    to={`${ALL_URLS.kitchenDashboard.url}/${card.link}`}
                    className="font-medium text-cyan-700 hover:text-cyan-900"
                  >
                    View all
                  </Link>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cards;
