import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuAlt1Icon, RefreshIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Sidebar2 from "../side-bar-2/Sidebar2";
import { useSideBarContext } from "../side-bar-2/context/side-bar-provide";
import { Outlet } from "react-router";
import { useAuthServices } from "../../context/auth-context";
import DateRangePicker from "../date-range-picker/date-range-picker";
import { getAsObjectFromLocalStorage } from "../../libraries/easy";
import { useKitchenServices } from "../../context/kitchen-body-context";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Places from "../maps/places";
import Tooltip from "../order-form/tooltip";
import { User } from "../contants/ui-data";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PageWrap({ children }) {
  const { open, toggleSideBar } = useSideBarContext();
  const { user } = useAuthServices();
  const { logOut } = useAuthServices();
  const [showModal, setShowModal] = useState(false);
  const { updateStartEndDate } = useKitchenServices();
  // console.log(process.env.NODE_ENV);
  // console.log(process.env.REACT_APP_TOKEN);
  return (
    <>
      {showModal && (
        <ModalOverlay
          text="Are you sure you want to log out?"
          handleCancel={() => {
            setShowModal(false);
          }}
          handleConfirm={() => logOut()}
        />
      )}
      <div className="min-h-full w-full h-full">
        <Sidebar2 />
        <div className="lg:pl-64  flex flex-col flex-1 h-full justify-start ">
          <div className="sticky top-0 flex-shrink-0 bg-bodyBrown flex z-20 h-16 w-full bg-green border-b border-gray-200 lg:border-none shadow">
            <button
              type="button"
              className="px-4 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-transparent lg:hidden"
              onClick={() => {
                toggleSideBar(true);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="flex-1 px-1 flex justify-between sm:px-6  ">
              <div className="flex w-full items-center justify-between">
                {/* <div className="bg-[rgb(41,37,36,0.2)]  h-[37px] w-70 rounded-full flex items-start "> */}
                <div className="bg-[rgb(41,37,36,0.2)]  h-[37px] w-70 rounded-full flex items-start ">
                  <DateRangePicker
                    handleChange={(startDate, endDate) => {
                      updateStartEndDate(startDate, endDate);
                    }}
                  />
                </div>
                <div className="flex justify-center items-center w-70">
                  {/* <button
                    type="button"
                    className="bg-white p-1 rounded-full text-gray-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-transparent"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}
                  {/* Profile dropdown */}
                  <span
                    onClick={() => {
                      window.location.reload();
                    }}
                    className="h-full flex mr-1  z-[999999] items-center"
                  >
                    <div className="flex p-2 rounded-full justify-center items-center cursor-pointer shadow-lg bg-orange-100">
                      <RefreshIcon className="w-4 h-4 cursor-pointer hover:animate-pulse text-gray-600 " />
                    </div>
                    {/* <span className="ml-1 text-white ">Refresh</span> */}
                  </span>
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className=" rounded-full flex items-center text-sm lg:p-2 lg:rounded-md ">
                        {/* <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        /> */}

                        <span className="h-8 w-8 rounded-full bg-white flex justify-center items-center text-gray-500 text-xl">
                          {User()?.name[0]}
                        </span>
                        <span className="hidden whitespace-nowrap ml-3 text-white text-sm font-medium lg:block">
                          <span className="sr-only whitespace-nowrap">
                            Open user menu for{" "}
                          </span>
                          <div className="flex flex-col">
                            <span>{User()?.name}</span>
                          </div>
                        </span>
                        <ChevronDownIcon
                          className="hidden flex-shrink-0 ml-1 h-5 w-5 text-white lg:block"
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
                      <Menu.Items className="origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white   focus:outline-none">
                        {/* <Menu.Item>
                          {({ active }) => (
                            <div
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </div>
                          )}
                        </Menu.Item> */}
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              onClick={() => {
                                setShowModal(true);
                              }}
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block cursor-pointer px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Logout
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          <main className="flex flex-1-1 h-full flex-col">{children}</main>
        </div>
      </div>
    </>
  );
}
