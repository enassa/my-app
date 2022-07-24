import { ChevronDownIcon, XIcon } from "@heroicons/react/solid";
import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useKitchenServices } from "../../context/kitchen-body-context";
import { errorToast, successToast } from "../toast/toastify";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useAccountsServices } from "../../context/accounts-provider";
import OrderDetailTable from "../order-detail-table/order-detail-table";
import { User } from "../contants/ui-data";
import RoleChecker from "../role-checker/role-checker";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Modali = ({ orderData, setModalOn }) => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmDispatch, setConfirmDispatch] = useState(false);
  const [statusType, setStatusType] = useState("");
  const [chefName, setChefName] = useState("");
  const [riderName, setRiderName] = useState("");
  const [dispatchInfo, setDispatchInfo] = useState({});
  const [chefs] = useState([]);
  const [riders, setRiders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(undefined);
  const [assignedRider, setAssignedRider] = useState(undefined);
  const { loading, updateOrderStatus, assignChef, assignDispatch } =
    useKitchenServices();
  const { getUsers } = useAccountsServices();

  const removeMainModal = () => {
    return setModalOn(false);
  };

  const confirmStatusUpdate = (status) => {
    setStatusType(status);
    return setConfirmModal(true);
  };

  useEffect(() => {
    if (!loading) {
      getUsers().then((response) =>
        response.filter((user) => {
          if (user.role.toLowerCase() === "chef") {
            return chefs.push(user);
          }
        })
      );
    }
    if (!loading) {
      getUsers().then((response) => {
        const myRiders = response.filter(
          (user) => user.role.toLowerCase() === "rider"
        );
        setRiders(myRiders);
      });
    }
  }, []);

  const updateStatus = () => {
    if (!loading) {
      updateOrderStatus({
        orderNo: orderData?.orderNo,
        orderStatus: statusType,
      });
      assignChef({
        orderNo: orderData?.orderNo,
        chef: chefName,
      });
    }
    successToast("Order updated and assigned successfully");

    removeMainModal();
  };

  let status = "";

  if (orderData?.orderStatus === "Processed") {
    status = "bg-green-300";
  } else if (orderData?.orderStatus === "Pending") {
    status = "bg-yellow-200";
  } else if (orderData?.orderStatus === "Processing") {
    status = "bg-blue-400";
  } else {
    status = "bg-purple-300";
  }

  const assignToDispatch = (dispatcher, order) => {
    // return;
    setAssignedRider(dispatcher.name);
    setRiderName(dispatcher.name);
    let dispatchData = {
      orderNo: order.orderNo,
      dispatcherPhone: dispatcher.phone,
      dispatcher: dispatcher.name,
    };

    const dataToSend = {
      ...dispatchData,
      dispatchedBy: User().name,
    };

    setDispatchInfo(dataToSend);
    setConfirmDispatch(true);
    // assignDispatch(dataToSend);
  };
  useEffect(() => {
    if (1) {
      if (orderData.di) {
      }
      setActiveOrder(orderData);
    }
  });

  return (
    <div className="opacity-1 fixed inset-0 z-50 overflow-auto bg-white">
      <div className="w-full overflow-y-auto h-full pt-10 pb-4 md:px-10 px-2 ">
        <div className=" relative h-full w-full">
          <div className="text-center">
            <h1 className="text-3xl mb-10 mx-auto text-2xl font-sm font-arial-arounded text-gray-600">
              Order Details
            </h1>
          </div>
          <div className=" md:grid grid-cols-3 gap-6">
            <div className="my-4 md:my-0">
              <h1 className="font-bold">Date</h1>
              <p>{activeOrder?.orderDate}</p>
            </div>
            <div className="my-4 md:my-0">
              <h1 className="font-bold">Order No</h1>
              <p>{activeOrder?.orderNo}</p>
            </div>
            <div className="my-4 md:my-0">
              <h1 className="font-bold">Order Status</h1>
              <span
                className={`py-1 px-2 text-xs font-medium uppercase tracking-wider text-green-800 ${status} rounded-lg bg-opacity-50`}
              >
                {activeOrder?.orderStatus}
              </span>
            </div>
            <div className="my-4 md:my-0">
              <h1 className="font-bold md:min-w-[200px]">Total Price</h1>
              <p>GH₵ {activeOrder?.orderTotalAmount?.toFixed(2)}</p>
            </div>
            <div className="my-4 md:my-0">
              <h1 className="font-bold">Phone</h1>
              <p>{activeOrder?.orderPhone}</p>
            </div>
            <div className="my-4 md:my-0">
              <h1 className="font-bold">Name</h1>
              <p>{activeOrder?.orderBy}</p>
            </div>
            <div className="my-4 md:my-0">
              <h1 className="font-bold">Delivery Location</h1>
              <p>{activeOrder?.orderAddress}</p>
            </div>
            <div className="my-4 md:my-0">
              <h1 className="font-bold">Additional Info</h1>
              <p>{activeOrder?.orderAdditionalInfo}</p>
            </div>
            <div className="col-span-4">
              <h1 className="h1-important m-auto text-center">
                {orderData.simpleType}
              </h1>
            </div>

            {orderData.orderStatus === "Processed" ||
            orderData.orderStatus === "Dispatched" ? (
              <div className="col-span-4">
                {/* {orderData?.orderStatus === "Pending" ||
                orderData?.orderStatus === "Processing" || ( */}
                <RoleChecker roles={["Manager", "Waiter"]}>
                  <div className="w-full flex md:justify-end ">
                    <Menu
                      as="div"
                      className="relative flex w-fit my-5 md:my-0 md:mr-[45px]"
                    >
                      <Menu.Button
                        className={`${
                          assignedRider
                            ? ""
                            : "bg-gray-200 lg:hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        }   flex items-center text-sm  focus:ring-trasnparent p-2 rounded-md `}
                      >
                        {assignedRider ||
                        orderData.orderStatus === "Dispatched" ? (
                          <div>
                            <span>Order assigned to </span>
                            {orderData.dispatcher}
                            <span className="text-ssss-800 mr-2">
                              {assignedRider}
                            </span>
                            <span className="text-blue-600">Change</span>
                          </div>
                        ) : (
                          <span className=" text-gray-700 text-sm font-medium lg:block">
                            <span className="sr-only">Open user menu for </span>
                            {assignedRider || "Assign To Dispatch"}
                          </span>
                        )}
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
                        <Menu.Items className="z-10 mx-3 origin-top-right absolute mb-5 -right-11 top-9 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                          {riders?.map((rider, id) => {
                            return (
                              <div className="py-1" key={id}>
                                <Menu.Item>
                                  {({ active }) => (
                                    <div
                                      onClick={() => {
                                        // setConfirmModal(true);
                                        // setAssignData([rider, data, row]);
                                        if(orderData.deliveryOption === "Delivery") {
                                            assignToDispatch(rider, orderData);
                                          } else {
                                            errorToast("Order is not available for delivery")
                                          }
                                      }}
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-700 cursor-pointer capitalize"
                                          : "text-gray-700 capitalize",
                                        "block px-4 py-2 text-sm capitalize"
                                      )}
                                    >
                                      {rider?.name}
                                    </div>
                                  )}
                                </Menu.Item>
                              </div>
                            );
                          })}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </RoleChecker>
                {/* )} */}
              </div>
            ) : null}

            <button
              className="text-2xl top-1 right-5 absolute"
              onClick={() => {
                removeMainModal();
              }}
            >
              <XIcon
                className="mt-2 h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </button>
          </div>
          <OrderDetailTable data={orderData} />
          <RoleChecker roles={["Manager", "Kitchen-manager"]}>
            <Menu
              as="div"
              className="relative mr-10 flex justify-start md:justify-end"
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
                  <Menu.Item
                    onClick={() => {
                      confirmStatusUpdate("Delivered");
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
                        Delivered
                      </p>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </RoleChecker>
        </div>
      </div>
      {confirmModal && (
        <ModalOverlay
          text={`Please confirm order Update`}
          handleCancel={() => {
            setConfirmModal(false);
          }}
          handleConfirm={() => {
            updateStatus();
          }}
        />
      )}
      {confirmDispatch && (
        <ModalOverlay
          text={`Assign order to ${riderName} for Delivery?`}
          handleCancel={() => {
            setConfirmDispatch(false);
          }}
          handleConfirm={() => {
            // dispatchToRider();
            setConfirmDispatch(false);
            assignDispatch(dispatchInfo);
            successToast("Order assigned successfully");
            // console.log("from handle confirm ", dispatchInfo);
          }}
        />
      )}
    </div>
  );
};
export default Modali;
