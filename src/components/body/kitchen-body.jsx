import React, { useEffect, useState } from "react";
import {
  BRANCH,
  IS_SUPER_ACCOUNT,
  secondsPerFetch,
} from "../../constants/urls";
import { useKitchenServices } from "../../context/kitchen-body-context";
import Cards from "../dashboard-cards/cards";
import OrderTable from "../order-table/order-table";

export const KitchenBody = () => {
  const [orders, setOrders] = useState([]);

  const {
    loading,
    count,
    queryStartDate,
    queryEndDate,
    updateCount,
    currentStatus,
    getStatusOrdersList,
    parseOrder,
  } = useKitchenServices();

  useEffect(() => {
    const pageRender = setInterval(() => {
      updateCount();
    }, secondsPerFetch);

    if (!loading) {
      getStatusOrdersList(queryStartDate, queryEndDate, "pending")
        .then((response) => {
          return parseOrder(response);
        })
        .then((response) => {
          setOrders(
            response.reverse().filter((order) => {
              if (IS_SUPER_ACCOUNT() !== true) {
                return order.orderBranch.includes(BRANCH());
              }
              return order;
            })
          );
        });
    }
    return () => {
      clearInterval(pageRender);
    };
  }, [currentStatus, count, queryStartDate, queryEndDate]);

  return (
    <div className="shadow-lg rounded-md p-8 h-full">
      <Cards branch={BRANCH()}/>
      <div className="flex flex-col my-6">
        <OrderTable orders={orders} text={true} checkStatus={false} />
      </div>
    </div>
  );
};
