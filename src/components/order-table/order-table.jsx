import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import React, { Fragment, useState, useRef } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Modali from "../menus/modali";
import { Menu, Transition } from "@headlessui/react";
import { useKitchenServices } from "../../context/kitchen-body-context";
import useTable from "./useTable";
import TableLoader from "../loader/table-loader";
import { USERNAME } from "../../constants/urls";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const OrderTable = ({ orders, text, checkStatus }) => {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("number");
  const [orderData, setOrderData] = useState({});
  const [modalOn, setModalOn] = useState(false);
  const [testBool, setTestBool] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterType, setFilterType] = useState("");
  // const [tableLength, setTableLength] = useState(orders.length);
  const [orderTypes] = useState([]);
  const searchRef = useRef("");
  const {
    loading,
    updateOrderStatus,
    currentStatus,
    updateMenuItem,
    updateCount,
  } = useKitchenServices();
  const [orderStatuses, setOrderStatuses] = useState([]);

  let optionsLength = 0;
  let doneOptionsLength = 0;
  let total = 0;

  // const getCurrentData = () => {
  //   if (filterType == "") {
  //     return orders;
  //   } else {
  //     return orders.filter(
  //       (order) =>
  //         order.simpleType.toLowerCase() === filterType.toLowerCase()
  //     );
  //   }
  // };

  orders?.filter((order) => {
    if (order.simpleType !== undefined) {
      if (!new Set(orderTypes).has(order.simpleType?.toLowerCase())) {
        orderTypes.push(order?.simpleType?.toLowerCase());
      }
    }
    return orderTypes;
  });

  orders?.filter((order) => {
    if (!new Set(orderStatuses).has(order?.orderStatus.toLowerCase())) {
      orderStatuses.push(order?.orderStatus.toLowerCase());
    }
    return orderStatuses;
  });

  orders?.filter((order) => {
    if (!new Set(orderTypes).has(order?.simpleType?.toLowerCase())) {
      orderTypes?.push(order?.simpleType?.toLowerCase());
    }
    return orderTypes;
  });

  const clicked = (orderData) => {
    setOrderData(orderData);
    setModalOn(true);
  };

  const { slice, range } = useTable(orders, page, rowsPerPage);

  TimeAgo.addLocale(en);

  const timeAgo = new TimeAgo("en-US");

  let status = "";
  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };
  const clearInput = () => {
    searchRef.current.value = "";
  };
  const updateOrder = (orderNo) => {
    if (!loading) {
      updateOrderStatus({
        orderNo: orderNo,
        orderStatus: "Processed",
      });
    }
  };
  const updateDone = (data) => {
    updateMenuItem(data);
  };

  // if (updated !== true) {
  //   orders.filter((order) => {
  //     order.orderDetail.map((menu) => {
  //       return menu.optionsList.map((menuItem) => {
  //         return allMenus.push(menuItem);
  //       })
  //     })

  //     let menuItemsLength = order.orderDetail.filter((item) => {
  //       return item.done === true;
  //     }).length;
  //     if (
  //       order.orderStatus === "Processing" &&
  //       menuItemsLength === order.orderDetail.length
  //     ) {
  //       return updateOrder(order.orderNo);
  //     }
  //     return setUpdated(true);
  //   });
  // }

  const tableLength =
    Array.isArray(orders) &&
    orders?.filter((order) => {
      if (search !== "") {
        if (searchType === "type") {
          return order.simpleType.toLowerCase().includes(search.toLowerCase());
        } else if (searchType === "order")
          return order.orderNo.includes(search);
      } else if (filterType !== "") {
        return order.simpleType.toLowerCase() === filterType.toLowerCase();
      } else {
        return order;
      }
    });

  return (
    <div className="w-full overflow-x-auto h-full">
      <div className="w-full shadow-blend">
        <div className="relative mr-1 flex justify-between items-center px-5">
          <h1 className="text-xl text-center text-slate-700">
            All {text && "Pending"}
            {checkStatus && currentStatus} Orders
          </h1>
          <form
            className="flex md:ml-0 pl-5 my-2 ml-2 "
            action="#"
            method="GET"
          >
            <Menu as="div" className="w-44 mr-2 relative">
              <div>
                <Menu.Button className="max-w-xs bg-white border flex items-center text-sm focus:outline-none  focus:ring-trasnparent p-2 rounded-md">
                  <span className="text-gray-700 text-sm font-medium lg:block whitespace-nowrap">
                    Filter by {filterType}
                  </span>
                  <ChevronDownIcon
                    className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-800 lg:block"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right z-50 absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {orderTypes.map((type, index) => {
                    return (
                      <Menu.Item
                        key={index}
                        onClick={() => {
                          //setPage(1);
                          setFilterType(type);
                        }}
                      >
                        {({ active }) => (
                          <p
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "cursor-pointer block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </p>
                        )}
                      </Menu.Item>
                    );
                  })}
                  {orderStatuses.map((status, index) => {
                    return (
                      <Menu.Item
                        key={index}
                        onClick={() => {
                          // setPage(1);
                          setFilterType(status);
                        }}
                      >
                        {({ active }) => (
                          <p
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "cursor-pointer block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </p>
                        )}
                      </Menu.Item>
                    );
                  })}
                  <Menu.Item
                    onClick={() => {
                      setFilterType("");
                    }}
                  >
                    {({ active }) => (
                      <p
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "cursor-pointer block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Clear
                      </p>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
            <Menu as="div" className="w-44 ml-2 mr-2 relative">
              <div>
                <Menu.Button className="max-w-xs bg-white  border flex items-center text-sm focus:outline-none focus:ring-trasnparent p-2 rounded-md ">
                  <span className="text-gray-700 text-sm font-medium lg:block whitespace-nowrap">
                    Search by {searchType}
                  </span>
                  <ChevronDownIcon
                    className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-800 lg:block"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right z-50 absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item
                    onClick={() => {
                      setSearchType("phone");
                      clearInput();
                    }}
                  >
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Phone Number
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      setSearchType("order");
                      clearInput();
                    }}
                  >
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Order Number
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      setSearchType("type");
                      clearInput();
                    }}
                  >
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Type
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 m-1" aria-hidden="true" />
              </div>
              <input
                ref={searchRef}
                id="search-field"
                name="search-field"
                className="block w-full h-full pl-8 pr-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 focus:placeholder-gray-400 sm:text-sm border border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                placeholder={`Search by order ${searchType}`}
                type="search"
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
        <table className="overflow-scroll table-auto w-full">
          <thead className="text-left">
            <tr className="border-t border-gray-200">
              <th
                className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
              >
                SN
              </th>
              <th
                width="20%"
                className=" break-words px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
              >
                Date
              </th>
              <th
                className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
              >
                Order No.
              </th>
              <th
                className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
              >
                Status
              </th>
              <th
                className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
              >
                Type
              </th>
              <th
                className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
              >
                Phone Number
              </th>
              <th
                className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
              >
                Queue Time
              </th>
              <th
                className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
              >
                Actions
              </th>
            </tr>
          </thead>
          {/* loader comes here! */}

          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              <TableLoader />
            ) : slice.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-2xl font-sm font-arial-arounded text-gray-600"
                >
                  No Data
                </td>
              </tr>
            ) : (
              Array.isArray(slice) &&
              slice
                ?.filter((order) => {
                  if (search !== "") {
                    if (searchType === "type") {
                      return order.simpleType
                        .toLowerCase()
                        .includes(search.toLowerCase());
                    } else if (searchType === "phone") {
                      return order.orderPhone
                        .toLowerCase()
                        .includes(search.toLowerCase());
                    } else if (searchType === "order")
                      return order.orderNo.includes(search);
                  } else if (filterType !== "") {
                    return (
                      order.simpleType.toLowerCase() ===
                        filterType.toLowerCase() ||
                      order.orderStatus.toLowerCase() ===
                        filterType.toLowerCase()
                    );
                  } else {
                    return order;
                  }
                })
                .map((order, index) => {
                  if (order?.orderStatus === "Processed") {
                    status = "bg-green-300";
                  } else if (order?.orderStatus === "Pending") {
                    status = "bg-yellow-200";
                  } else if (order?.orderStatus === "Processing") {
                    status = "bg-blue-400";
                  } else {
                    status = "bg-purple-300";
                  }

                  //Done menus and options length
                  let menuItemsLength = order.orderDetail.filter((item) => {
                    return item.done === true;
                  }).length;

                  order.orderDetail.filter((item) => {
                    if (item.kitchen === undefined && item.done === false) {
                      updateDone({
                        id: item.id,
                        orderNo: item.orderNo,
                        done: true,
                        userName: USERNAME(),
                      });
                    }
                    let array = [];
                    item.optionsList.filter((menuItem) => {
                      if (menuItem.done) return array.push(menuItem);
                    });
                    return (doneOptionsLength = array.length);
                  });

                  // All options
                  order.orderDetail.filter((item) => {
                    let array = [];
                    item.optionsList.filter((menuItem) => {
                      return array.push(menuItem);
                    });
                    return (optionsLength = array.length);
                  });

                  total = order.orderDetail.length + optionsLength;

                  if (
                    menuItemsLength + doneOptionsLength === total &&
                    order.orderStatus === "Processing"
                  ) {
                    updateOrder(order.orderNo);
                    updateCount();
                  }

                  return (
                    <tr key={index} className="relative">
                      <td className="px-3 py-3 max-w-0 whitespace-nowrap text-sm font-normal text-gray-500">
                        {index + 1}
                      </td>
                      <td className=" px-3 py-3 text-gray-500  font-normal text-sm">
                        {order?.orderDate}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-700">
                        <a
                          href="#"
                          className="text-gray-500 font-normal hover:underline"
                        >
                          {order?.orderNo}
                        </a>
                      </td>
                      <td className="px-0 py-3  flex text-sm text-gray-700">
                        <span
                          className={` py-1 px-2 text-xs font-medium uppercase tracking-wider text-green-800 ${status} rounded-lg bg-opacity-50`}
                        >
                          {order?.orderStatus === "Pending"
                            ? "New Order"
                            : order?.orderStatus === "Processing"
                            ? "In Kitchen"
                            : order?.orderStatus}{" "}
                          {`${menuItemsLength + doneOptionsLength}/${total}`}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-gray-500  font-normal text-sm">
                        {order?.simpleType}
                      </td>
                      <td className="px-3 py-3 text-gray-500  font-normal text-sm">
                        {order?.orderPhone}
                      </td>
                      <td className="px-3 py-3 text-gray-500  font-normal text-sm">
                        {typeof order.orderDate != "undefined"
                          ? timeAgo.format(
                              new Date(order.orderDate.split(/[\s-]+/))
                            )
                          : ""}
                      </td>
                      <td>
                        <a
                          onClick={() => clicked(order)}
                          className=" cursor-pointer px-3 py-2 text-sm transition-all duration-100 text-gray-500 hover:text-gray-100 bg-slate-100 rounded-lg hover:bg-gray-400 mt-2"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  );
                })
            )}
            <tr>
              <td colSpan="7" className="text-right justify-end p-3">
                <div className="flex justify-end items-center">
                  <p className="text-gray-800">Rows per page: </p>
                  <select
                    onChange={(e) => {
                      setPage(1);
                      setRowsPerPage(e.target.value);
                    }}
                    name=""
                    className="ml-2 text-gray-700  p-1"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                  <p className="ml-5 text-gray-700">
                    {`${range.length !== 0 ? page : "0"} of ${range.length}`}
                  </p>
                  <div className="ml-5 flex">
                    <ChevronLeftIcon
                      onClick={() => {
                        if (page > 1) {
                          setPage(page - 1);
                        }
                      }}
                      className="mx-2 w-7 h-7 hover:bg-gray-300 rounded-full text-gray-500 cursor-pointer"
                    />
                    <p>{tableLength.length}</p>
                    <ChevronRightIcon
                      onClick={() => {
                        if (page < range.length) {
                          setPage(page + 1);
                        }
                      }}
                      className="mx-2 w-7 h-7 hover:bg-gray-300 rounded-full text-gray-500 cursor-pointer"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {modalOn && <Modali setModalOn={setModalOn} orderData={orderData} />}
      </div>
    </div>
  );
};

export default OrderTable;
