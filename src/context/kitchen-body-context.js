import React from "react";
import { useState } from "react";
import {
  BASE_URL,
  BRANCH,
  END_POINTS,
  ORG_CODE,
  TOKEN,
} from "../constants/urls";
import toast from "../components/toast/toast";
import { getTodaysDate, getTommorowsDate } from "../libraries/easy";
const KitchenBodyContext = React.createContext(undefined);
const KitchenBodyProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("Pending");
  const [count, setCount] = useState(0);
  const [queryStartDate, setQueryStartDate] = useState(
    getTodaysDate("YYYY-MM-DD")
  );
  const [queryEndDate, setQueryEndDate] = useState(
    getTommorowsDate("YYYY-MM-DD")
  );
  const request = async (path, method = "GET", data, action) => {
    let url = `${BASE_URL.dev}${path}`;

    if (method === "GET" && !!data) {
      const params = new URLSearchParams(data);
      url += `?${params.toString()}`;
    }
    const processStatusChange = () => {
      setCurrentStatus(data.orderStatus);
      return true;
    };
    setLoading(true);
    return fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${TOKEN.dev}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: method !== "GET" && !!data ? JSON.stringify(data) : undefined,
    })
      .then(async (response) => {
        if (response.ok) {
          const responseData = await response.json();
          if (action === "status update") {
            processStatusChange(responseData);
          }
          if (!!responseData.data) {
            return responseData.data;
          }
        }
      })
      .catch((error) => {
        toast({
          type: "error",
          title: "Failed to Process Request",
          description: error?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const updateStartEndDate = (startDate, endDate) => {
    setQueryStartDate(startDate);
    setQueryEndDate(endDate);
  };
  const updateCount = () => {
    setCount(count + 1);
  };
  const getOrders = async (startDate, endDate) => {
    return request(
      `${
        END_POINTS.getOrders
      }/${startDate}/end/${endDate}/organizationCode/${ORG_CODE()}`,
      "GET"
    );
  };
  const getOrdersBranch = async (startDate, endDate, branch) => {
    return request(
      `${
        END_POINTS.getOrdersBranch
      }/${branch}/start/${startDate}/end/${endDate}/organizationCode/${ORG_CODE()}`,
      "GET"
    );
  };
  const getStats = async (startDate, endDate) => {
    return request(
      `${
        END_POINTS.stats
      }/${startDate}/end/${endDate}/organizationCode/${ORG_CODE()}`,
      "GET"
    );
  };
  const getBranchStats = async (startDate, endDate, branch) => {
    return request(
      `${
        END_POINTS.branchStats
      }/${branch}/start/${startDate}/end/${endDate}/organizationCode/${ORG_CODE()}`,
      "GET"
    );
  };
  const changeCurrentStatus = (orderStatus) => {
    return setCurrentStatus(orderStatus);
  };
  const getStatusOrdersList = async (startDate, endDate, orderStatus) => {
    return request(
      `${
        END_POINTS.getOrdersList
      }/${startDate}/end/${endDate}/status/${orderStatus}/organizationCode/${ORG_CODE()}`,
      "GET"
    );
  };
  const getOrdersList = async (startDate, endDate) => {
    return request(
      `${
        END_POINTS.getOrdersList
      }/${startDate}/end/${endDate}/organizationCode/${ORG_CODE()}`,
      "GET"
    );
  };
  const getOrdersListExternal = async (startDate, endDate, orgName) => {
    return request(
      `${END_POINTS.getOrdersList}/${startDate}/end/${endDate}/organizationCode/${orgName}`,
      "GET"
    );
  };
  const getPaidUnpaidOrdersList = (startDate, endDate) => {
    return request(
      `${
        END_POINTS.getPaidUnpaidOrdersList
      }/${startDate}/end/${endDate}/organizationCode/${ORG_CODE()}`,
      "GET"
    );
  };
  const updateOrderStatus = async (data) => {
    setCurrentStatus(true);
    return request(
      `${END_POINTS.updateOrderStatus}`,
      "PUT",
      data,
      "status update"
    );
  };
  const createOrder = async (data) => {
    return request(`${END_POINTS.createOrder}`, "POST", data);
  };
  const assignMainChef = async (data) => {
    return request(`${END_POINTS.assignMainChef}`, "PUT", data);
  };
  const assignChef = async (data) => {
    return request(`${END_POINTS.assignChef}`, "PUT", data);
  };

  const getSales = async (data) => {
    return request(
      `${END_POINTS.getSales}/organizationCode/${ORG_CODE()}`,
      "GET",
      data
    );
  };
  const assignDispatch = async (data) => {
    return request(`${END_POINTS.assignDispatch}`, "PUT", data);
  };

  const getAllOrganizations = async () => {
    return request(`${END_POINTS.getAllOrganizations}`, "GET");
  };
  const getOrganizationByEmail = async (email) => {
    return request(`${END_POINTS.getOrganizationByEmail}${email}`, "GET");
  };
  const getOrganizationByName = async (name) => {
    return request(`${END_POINTS.getOrganizationByEmail}${name}`, "GET");
  };
  const getOrganizationDashboard = async (name) => {
    return request(`${END_POINTS.getOrganizationDashboard}${name}`, "GET");
  };
  const parseOrder = (orders) => {
    const finalOrder = orders?.map((item) => {
      return {
        ...item,
        simpleType: JSON.parse(item.orderDetail)[0]?.menuItem,
        orderDetail: JSON.parse(item.orderDetail),
      };
    });
    return finalOrder;
  };
  const updateMenuItem = async (data) => {
    console.log(data);
    return request(`${END_POINTS.updateMenuItem}`, "PUT", data);
  };
  const updateMenuOptionItem = async (data) => {
    console.log(data);
    // return;
    return request(`${END_POINTS.updateMenuOptionItem}`, "PUT", data);
  };
  return (
    <KitchenBodyContext.Provider
      value={{
        loading,
        currentStatus,
        count,
        queryStartDate,
        queryEndDate,
        setCount,
        updateStartEndDate,
        updateCount,
        getOrders,
        getOrdersBranch,
        getOrdersList,
        getOrdersListExternal,
        getPaidUnpaidOrdersList,
        updateOrderStatus,
        createOrder,
        getStatusOrdersList,
        changeCurrentStatus,
        parseOrder,
        assignChef,
        getStats,
        getBranchStats,
        updateMenuItem,
        getSales,
        assignDispatch,
        assignMainChef,
        updateMenuOptionItem,
        getAllOrganizations,
        getOrganizationByEmail,
        getOrganizationByName,
        getOrganizationDashboard,
      }}
    >
      {children}
    </KitchenBodyContext.Provider>
  );
};
export const useKitchenServices = () => React.useContext(KitchenBodyContext);
export default KitchenBodyProvider;
