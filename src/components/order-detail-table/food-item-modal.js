import { useAccountsServices } from "../../context/accounts-provider";
import { User } from "../contants/ui-data";
import { errorToast, successToast } from "../../components/toast/toastify";
import { CakeIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useKitchenServices } from "../../context/kitchen-body-context";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { BASE_URL, END_POINTS, TOKEN } from "../../constants/urls";

export default function FoodItemModal({
  handleClose,
  orderData,
  orderId,
  data,
  index,
}) {
  const [foodItem, setFoodItem] = useState([]);
  const [assignData, setAssignData] = useState([]);
  const { updateOrderStatus, assignChef, loading, assignMainChef } =
    useKitchenServices();
  const { getUsers } = useAccountsServices();
  const [chefs, setChefs] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmModal2, setConfirmModal2] = useState(false);
  const [confirmUpdateModal, setConfirmUpdateModal] = useState(false);
  const [isMain, setIsMain] = useState(false);
  const [statusType, setStatusType] = useState("");
  const [mapIndex, setMapIndex] = useState(0);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const confirmStatusUpdate = (status) => {
    setStatusType(status);
    return setConfirmUpdateModal(true);
  };

  const updateStatus = () => {
    if (!loading) {
      updateOrderStatus({
        orderNo: data?.orderNo,
        orderStatus: statusType,
      });
    }
    successToast("Order updated and assigned successfully");
  };

  useEffect(() => {
    // -----------------------FETCHING CHEFS HERE -----------------
    if (!loading) {
      getUsers().then((response) => {
        const mychefs = response.filter(
          (user) => user.role.toLowerCase() === "chef"
        );
        setChefs(mychefs);
      });
    }

    const selectedOrder = orderData?.find(
      (foodItem) => foodItem.orderNo === orderId
    );
    setFoodItem(selectedOrder);
  }, [orderData, orderId]);

  // -----------------------ASSIGNING MAIN TO CHEF FUNCTION -----------------
  const assignMainToChef = (nameOfChef, order, menuItem) => {
    // collect data from order and menuItem of what is been assigned
    let assignData = {
      chef: nameOfChef,
      orderId: order.id,
      done: false,
    };
    // Modify the menuItem selected and form a new object
    let newMenuItem = { ...menuItem, ...assignData };

    order.orderDetail[index] = newMenuItem;

    // updateOrderStatus({
    //   orderNo: order.orderNo,
    //   orderStatus: "Processing",
    // });

    const dataToSend = {
      id: menuItem.id,
      orderNo: menuItem.orderNo,
      chef: nameOfChef.name,
      userName: User().name,
    };
    console.log("data to send for main", dataToSend);

    fetch(`${BASE_URL.dev}${END_POINTS.assignMainChef}`, {
      method: "PUT",
      body: JSON.stringify(dataToSend),
      headers: {
        Authorization: `Bearer ${TOKEN.dev}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          updateOrderStatus({
            orderNo: order.orderNo,
            orderStatus: "Processing",
          });
        }
      })
      .catch((error) => {
        errorToast("error assigning to chef ");
      });

    // assignMainChef(dataToSend).then((response) => {
    //   // console.log("response status", response);
    // });
  };

  // -----------------------ASSIGNING TO CHEF FUNCTION EXCLUDING MAIN -----------------
  const assignToChef = (nameOfChef, order, menuItem) => {
    // collect data from order and menuItem of what is been assigned
    let assignData = { chef: nameOfChef, orderId: order.id, done: false };
    // Modify the menuItem selected and form a new object
    let newMenuItem = { ...menuItem, ...assignData };
    // Find the index of the menuItem in question inside the array of menuItems in the orderDetails array
    let indexOfMenuItem = order.orderDetail.findIndex(
      (item) => item.id === menuItem.id
    );
    // If the menu item exists in the orderDetails array, replace it with the new menuItem
    if (indexOfMenuItem !== -1) {
      console.log(newMenuItem);
      order.orderDetail[index].optionsList[indexOfMenuItem] = newMenuItem;
    }
    // updateOrderStatus({
    //   orderNo: order.orderNo,
    //   orderStatus: "Processing",
    // });

    const dataToSend = {
      id: menuItem.id,
      chef: nameOfChef.name,
      userName: User().name,
    };

    console.log("data to send", dataToSend);
    fetch(`${BASE_URL.dev}${END_POINTS.assignChef}`, {
      method: "PUT",
      body: JSON.stringify(dataToSend),
      headers: {
        Authorization: `Bearer ${TOKEN.dev}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          updateOrderStatus({
            orderNo: order.orderNo,
            orderStatus: "Processing",
          });
        }
      })
      .catch((error) => {
        errorToast("error assigning to chef ");
      });
    // assignChef(dataToSend);
  };
  return (
    <>
      {confirmUpdateModal && (
        <ModalOverlay
          text={`Please confirm order Update`}
          handleCancel={() => {
            setConfirmModal(false);
          }}
          handleConfirm={() => {
            updateStatus();
            setConfirmUpdateModal(false);
          }}
        />
      )}
      {confirmModal && (
        <ModalOverlay
          text={`Assign menu to ${assignData[0].name}?`}
          handleCancel={() => {
            setConfirmModal(false);
          }}
          handleConfirm={() => {
            // console.log(orderData[index].type === "Main");
            // console.log("isMain", isMain);
            // isMain
            //   ? assignMainToChef(assignData[0], assignData[1], assignData[2])
            //   : assignToChef(assignData[0], assignData[1], assignData[2]);
            assignToChef(assignData[0], assignData[1], assignData[2]);
            setConfirmModal(false);
            successToast("Menu assigned successfully");
          }}
        />
      )}
      {confirmModal2 && (
        <ModalOverlay
          text={`Assign menu to ${assignData[0].name}?`}
          handleCancel={() => {
            setConfirmModal2(false);
          }}
          handleConfirm={() => {
            // console.log(orderData[index].type === "Main");

            assignMainToChef(assignData[0], assignData[1], assignData[2]);
            // : assignToChef(assignData[0], assignData[1], assignData[2]);
            // assignToChef(assignData[0], assignData[1], assignData[2]);
            setConfirmModal2(false);
            successToast("Menu assigned successfully");
          }}
        />
      )}
      <div className="fixed w-full inset-0 overflow-y-scroll flex justify-center items-start bg-gray-800 bg-opacity-60 z-[10]">
        <div className="bg-white w-full mt-10 mb-10 sm:max-w-2xl p-4 mx-auto min-h-[300px] rounded ">
          <h2 className="mb-6 font-arial-arounded text-bodyBrown text-center flex justify-center mt-3 text-2xl font-sm">
            <span className="w-7 h-7 flex">
              <CakeIcon />
            </span>
            FOOD ITEMS TO CHEFS
          </h2>
          <div className="overflow-x shadow rounded-lg w-full min-h-full">
            <div className="border-b border-gray-200  py-2 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-2">
              <div className="w-full flex  justify-between align-center">
                <h1 className="text-lg font-medium  font-arial text-gray-900 sm:truncate ml-2">
                  Order
                </h1>
                <Menu
                  as="div"
                  className="relative flex justify-start md:justify-end"
                >
                  <div className=" ">
                    <Menu.Button className="max-w-xs bg-gray-200 flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-trasnparent p-2 rounded-md hover:bg-gray-300">
                      <span className="ml-3 text-gray-700 text-sm font-medium lg:block">
                        <span className="sr-only">Open user menu for </span>
                        Update Order
                      </span>
                      <ChevronDownIcon
                        className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
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
                    <Menu.Items className=" origin-top-right z-50 absolute md:-right-14 top-10   mt-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item
                        onClick={() => {
                          confirmStatusUpdate("Pending");
                        }}
                      >
                        {({ active }) => (
                          <p
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                          >
                            Pending
                          </p>
                        )}
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => {
                          confirmStatusUpdate("Processing");
                        }}
                      >
                        {({ active }) => (
                          <p
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                          >
                            Processing
                          </p>
                        )}
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => {
                          confirmStatusUpdate("Processed");
                        }}
                      >
                        {({ active }) => (
                          <p
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                          >
                            Processed
                          </p>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            {/* <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex-1 flex">
                <form
                  className="w-full bg-black flex md:ml-0"
                  action="#"
                  method="GET"
                >
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      name="search-field"
                      className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </form>
              </div>
            </div> */}
            <table className="overflow-scroll table-auto w-full">
              <thead className="text-center">
                <tr className="border-t border-gray-200">
                  <th
                    className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    SN
                  </th>
                  <th
                    width="20%"
                    className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Category
                  </th>
                  <th
                    className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Food Item
                  </th>

                  <th
                    className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Size
                  </th>
                  <th
                    className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Qty.
                  </th>
                  {/* <th
                    className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Price
                  </th> */}
                  <th
                    className="text-center px-3 py-3 border-b border-gray-200 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                <tr className="relative">
                  <td className="px-3 py-3 text-gray-500 text-center  font-normal text-sm">
                    1
                  </td>
                  <td className="px-3 py-3 text-gray-500 text-center  font-normal text-sm">
                    {foodItem?.category}
                  </td>
                  <td className="px-3 py-3 text-gray-500  text-center  font-normal text-sm">
                    {foodItem?.menuItem}
                  </td>
                  <td className="px-3 py-3 text-gray-500 text-center  font-normal text-sm">
                    {foodItem?.size}
                  </td>
                  <td className="px-3 py-3 text-gray-500 text-center  font-normal text-sm">
                    {foodItem?.quantity}
                  </td>
                  {/* <td className="px-3 py-3 text-gray-500 text-center  font-normal text-sm">
                        GHC {item?.price}
                      </td> */}
                  <td className="px-3 py-3 text-gray-500  font-normal text-sm ">
                    <Menu as="div" className="relative flex justify-end">
                      <Menu.Button className=" bg-gray-200 flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-trasnparent p-2 rounded-md lg:hover:bg-gray-300">
                        <span className=" text-gray-700 text-sm font-medium lg:block">
                          <span className="sr-only">Open user menu for </span>
                          {!!foodItem?.chef?.name
                            ? `Assigned to ${foodItem.chef?.name}`
                            : !!foodItem?.chef
                            ? `Assigned to ${foodItem?.chef}`
                            : "Assign To Chef"}
                        </span>
                        <ChevronDownIcon
                          className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="z-10 mx-3 origin-top-right absolute -right-[75px] top-9 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                          {chefs.map((chef, id) => {
                            return (
                              <div className="py-1" key={id}>
                                <Menu.Item>
                                  {({ active }) => (
                                    <div
                                      onClick={() => {
                                        setConfirmModal2(true);
                                        setAssignData([chef, data, foodItem]);
                                      }}
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-700 text-sm cursor-pointer capitalize"
                                          : "text-gray-500 text-sm capitalize",
                                        "block px-4 py-2 text-sm capitalize"
                                      )}
                                    >
                                      {chef?.name}
                                    </div>
                                  )}
                                </Menu.Item>
                              </div>
                            );
                          })}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </tr>

                {foodItem?.optionsList?.map((item, index) => {
                  item.type === "Main" && setIsMain(true);

                  return (
                    <tr key={index} className="relative">
                      <td className="px-3 py-3 text-gray-500 text-center  font-normal text-sm">
                        {foodItem.type === "Main" ? index + 2 : index + 1}
                      </td>
                      <td className="px-3 py-3 text-gray-500 text-center  font-normal text-sm">
                        {item?.category}
                      </td>
                      <td className="px-3 py-3 text-gray-500  text-center  font-normal text-sm">
                        {item?.menuItem}
                      </td>
                      <td className="px-3 py-3 text-gray-500 text-center  font-normal text-sm">
                        {item?.size}
                      </td>
                      <td className="px-3 py-3 text-gray-500 text-center  font-normal text-sm">
                        {item?.quantity}
                      </td>
                      {/* <td className="px-3 py-3 text-gray-500 text-center  font-normal text-sm">
                        GHC {item?.price}
                      </td> */}
                      <td className="px-3 py-3 text-gray-500  font-normal text-sm ">
                        <Menu as="div" className="relative flex justify-end">
                          <Menu.Button className=" bg-gray-200 flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-trasnparent p-2 rounded-md lg:hover:bg-gray-300">
                            <span className=" text-gray-700 text-sm font-medium lg:block">
                              <span className="sr-only">
                                Open user menu for{" "}
                              </span>
                              {!!item?.chef?.name
                                ? `Assigned to ${item.chef?.name}`
                                : !!item?.chef
                                ? `Assigned to ${item?.chef}`
                                : "Assign To Chef"}
                            </span>
                            <ChevronDownIcon
                              className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="z-10 mx-3 origin-top-right absolute -right-[75px] top-9 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                              {chefs.map((chef, id) => {
                                return (
                                  <div className="py-1" key={id}>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <div
                                          onClick={() => {
                                            setConfirmModal(true);
                                            setAssignData([chef, data, item]);
                                          }}
                                          href="#"
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-700 text-sm cursor-pointer capitalize"
                                              : "text-gray-500 text-sm capitalize",
                                            "block px-4 py-2 text-sm capitalize"
                                          )}
                                        >
                                          {chef?.name}
                                        </div>
                                      )}
                                    </Menu.Item>
                                  </div>
                                );
                              })}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="relative border-t">
              <div className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 bg-white text-sm">
                <div className="w-full whitespace-nowrap bg-b h-full flex justify-end">
                  <div className="flex mr-4">
                    <strong className="text-gray-600">
                      Items count:{" "}
                      {foodItem.type === "Main"
                        ? foodItem?.optionsList?.length + 1
                        : foodItem?.optionsList?.length}
                    </strong>
                    &nbsp;
                    {/* <span>{totals.itemCount || "-"}</span> */}
                  </div>
                  <div className="flex">
                    <strong className="text-gray-600">Items Assigned: </strong>
                    &nbsp;
                    {/* <span>GHS: {totals.totalPrice.toFixed(2) || "-"}</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end mt-3">
            <div className="mt-4 flex sm:mt-0 sm:ml-4">
              <button
                onClick={handleClose}
                type="button"
                className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-stone-900 hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 sm:order-1 sm:ml-3"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
