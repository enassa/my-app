import React, { Fragment, useEffect, useState } from "react";
import {
  ArrowsExpandIcon,
  ChevronDownIcon,
  RefreshIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
// import MenuCreationForm from "./menu-creation-form";
import { Menu, Transition } from "@headlessui/react";
// import MenuEditForm from "./menu-edit-form";
import { useMenuServices } from "../../context/menu-config-context";
// import MenuDetailForm from "./menu-detail-form";
import { successToast } from "../../components/toast/toastify";
import ModalOverlay from "../../components/modal-overlay/modal-overlay";
import MenuCreationForm from "../../pages/configurations/menu-creation-form";
import MenuEditForm from "../../pages/configurations/menu-edit-form";
import MenuDetailForm from "../../pages/configurations/menu-detail-form";
import { useAccountsServices } from "../../context/accounts-provider";
import { useKitchenServices } from "../../context/kitchen-body-context";
import { User } from "../contants/ui-data";
import { useTooltipServices } from "../../context/tooltip-context";
import TableLoader from "../loader/table-loader";
import RoleChecker from "../role-checker/role-checker";
import FoodItemModal from "./food-item-modal";
import { useConfigurationServices } from "../../context/configurations-context";
// import { UserGroupIcon } from "@heroicons/react/outline";

export default function OrderDetailTable({ data, heading }) {
  const [search, setSearch] = useState("");
  const [menuList, setMenuList] = useState([{}]);
  const [showForm, setShowForm] = useState(false);
  const [showItemsModal, setShowItemsModal] = useState(false);
  const clicked = (orderData) => {
    // setOrderData(orderData);
    // setModalOn(true);
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // console.log("data here hahahaha", data);
  const [editState, setEditState] = useState(false);
  const [editingData, setEditData] = useState(false);
  const [detailState, setDetailState] = useState(false);
  const [detailData, setDetailData] = useState(false);
  const [rows, setRow] = useState([]);
  const [overLayState, setOverlayState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const { loading, getMenuList, deleteMenuItem } = useMenuServices();
  const { updateOrderStatus, assignChef } = useKitchenServices();
  const { getUsers } = useAccountsServices();
  const [chefs, setChefs] = useState([]);
  // const [selectedChef, setSelectedChef] = useState("Assign to Chef");
  const [confirmModal, setConfirmModal] = useState(false);
  const [assignmentModal, setAssignmentModal] = useState(false);
  const [assignData, setAssignData] = useState([]);
  const { showTooltip } = useTooltipServices();
  const [orderId, setOrderId] = useState();
  const [indexOfSelected, setIndexOfSelected] = useState();
  // const [isShown, setIsShown] = useState(false);
  const { configurations } = useConfigurationServices();
  useEffect(() => {
    // if (!rows?.length && !loading) {
    //   getMenuList("POTBELLY").then((res) => {
    //     console.log("res data here", res?.data);
    //     setRow(res?.data);
    //   });
    // }

    if (!loading) {
      getUsers().then((response) => {
        const mychefs = response.filter(
          (user) => user.role.toLowerCase() === "chef"
        );
        setChefs(mychefs);
      });
    }
  }, []);

  const deleteRow = (data = selectedRow) => {
    deleteMenuItem(data).then((res) => {
      if (res.data) {
        let newRows = rows.filter((item) => item.id !== data.id);
        setShowModal(false);
        successToast("Menu deleted successfully");
        setRow(newRows);
      }
    });
  };
  const assignToChef = (nameOfChef, order, menuItem) => {
    // collect data from order and menuItem of what is been assigned
    let assignData = { chef: nameOfChef, orderId: order.id, done: false };
    // Modify the menuItem selected and form a new object
    let newMenuItem = { ...menuItem, ...assignData };
    // Find the index of the menuItem in question inside the array of menuItems in the orderdetails array
    let indexOfMenuItem = order.orderDetail.findIndex(
      (item) => item.id === menuItem.id
    );
    // If the mneu item exists in the orderDetails array, replace it with the new menuItem
    if (indexOfMenuItem !== -1) {
      order.orderDetail[indexOfMenuItem] = newMenuItem;
    }
    updateOrderStatus({
      orderNo: order.orderNo,
      orderStatus: "Processing",
    });

    const dataToSend = {
      id: menuItem.id,
      orderNo: menuItem.orderNo,
      chef: nameOfChef.name,
      userName: User().name,
    };
    // assignChef(dataToSend);
  };
  return (
    <>
      {showModal && (
        <ModalOverlay
          text={`Are you sure you want to delete menu?`}
          handleCancel={() => {
            setShowModal(false);
          }}
          handleConfirm={() => deleteRow()}
        />
      )}
      <div className="py-5 md:py-0 w-full ">
        {showForm ? (
          <MenuCreationForm
            handleCreateMenu={(data) => {
              let newData = [data, ...rows];
              setRow(newData);
            }}
            handleClose={() => {
              setShowForm(false);
            }}
          />
        ) : null}
        {editState ? (
          <MenuEditForm
            handleCreateMenu={(data) => {
              let newData = { ...rows, data };
              setRow(newData);
            }}
            handleClose={() => {
              setEditState(false);
            }}
            data={editingData}
          />
        ) : null}

        {detailState ? (
          <MenuDetailForm
            handleClose={() => {
              setDetailState(false);
            }}
            data={detailData}
          />
        ) : null}
        {/* {showItemsModal && <FoodItemModal />} */}
        <div className=" w-full ">
          <div className="border-b min-w-full border-gray-200 px-4 py-1 flex justify-end sm:items-centers">
            <div className="flex-1 min-w-0 w-full">
              <h1 className="leading-6 text-gray-900 sm:truncate  font-bold">
                Order Info
              </h1>
            </div>
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
                  width="15%"
                  className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  scope="col"
                >
                  Category
                </th>
                <th
                  width="15%"
                  className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  scope="col"
                >
                  Menu Item
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
                  Size
                </th>
                <th
                  className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  scope="col"
                >
                  Quantity
                </th>

                <RoleChecker
                  roles={["Manager", "Frontdesk", "Kitchen-manager"]}
                >
                  <th
                    width="15%"
                    className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Action
                  </th>
                </RoleChecker>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loading ? (
                <TableLoader />
              ) : (
                !!data &&
                data?.orderDetail
                  // ?.filter((row) => {
                  .map((row, index) => {
                    return (
                      <tr key={index} className="relative">
                        <td className="px-3 py-3 text-gray-500  font-normal text-sm">
                          {index + 1}
                        </td>
                        <td className="px-3 py-3 text-gray-500  font-normal text-sm">
                          {row?.category}
                        </td>
                        <td className="px-3 py-3 text-gray-500  font-normal text-sm">
                          {row?.menuItem}
                        </td>
                        {/* <td className="px-3 py-3 text-gray-500  font-normal text-sm">
                          {row?.tagName}
                        </td> */}
                        <td className="px-3 py-3 text-sm text-gray-700">
                          <div
                            onClick={() => clicked(row)}
                            className="text-gray-500 font-normal hover:underline"
                          >
                            {row?.type}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-700">
                          <span
                            className={`py-1 px-2 text-xs font-medium uppercase tracking-wider text-green-800  rounded-lg bg-opacity-50`}
                          >
                            {row?.size}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-gray-500  font-normal text-sm">
                          {row?.quantity}
                        </td>
                        {configurations?.assignmentMode === "manual" ? (
                          <RoleChecker
                            roles={["Manager", "Frontdesk", "Kitchen-manager"]}
                          >
                            <td className=" py-3 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => {
                                  // setOrderData(order);
                                  // setConfirmModal(true);
                                  setAssignmentModal(true);
                                  setOrderId(row?.orderNo);
                                  setIndexOfSelected(index);
                                  console.log(
                                    "order number here",
                                    row?.orderNo
                                  );
                                }}
                                className="flex  transition-colors duration-500 transform bg-gray-200 hover:bg-gray-400 text-sm text-gray-900 hover:text-white rounded-md px-2 py-2 shadow-md items-center justify-center text-white"
                              >
                                Assign To chefs
                                <UserGroupIcon className="h-4 w-4 mx-1" />
                              </button>
                              {/* <Menu as="div" className="relative flex">
                              <Menu.Button className=" bg-gray-200 flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-trasnparent p-2 rounded-md lg:hover:bg-gray-300">
                                <span className=" text-gray-700 text-sm font-medium lg:block">
                                  <span className="sr-only">
                                    Open user menu for{" "}
                                  </span>

                                  {!!row?.chef?.name
                                    ? `Assigned to ${row.chef?.name}`
                                    : !!row?.chef
                                    ? `Assigned to ${row?.chef}`
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
                                <Menu.Items className="z-10 mx-3 origin-top-right absolute right-0 top-9 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                                  {chefs.map((chef, id) => {
                                    return (
                                      <div className="py-1" key={id}>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <div
                                              onClick={() => {
                                                setConfirmModal(true);
                                                setAssignData([
                                                  chef,
                                                  data,
                                                  row,
                                                ]);
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
                            </Menu> */}
                            </td>
                          </RoleChecker>
                        ) : null}
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
          {/* {confirmModal && (
            <ModalOverlay
              text={`Assign menu to ${assignData[0].name}?`}
              handleCancel={() => {
                setConfirmModal(false);
              }}
              handleConfirm={() => {
                assignToChef(assignData[0], assignData[1], assignData[2]);
                setConfirmModal(false);
                successToast("Menu assigned successfully");
              }}
            />
          )} */}
          {assignmentModal && (
            <FoodItemModal
              handleClose={() => setAssignmentModal(false)}
              orderId={orderId}
              orderData={data.orderDetail}
              data={data}
              index={indexOfSelected}
            />
          )}
        </div>
      </div>
    </>
  );
}
