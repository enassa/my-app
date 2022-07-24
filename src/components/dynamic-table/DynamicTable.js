import { MenuAlt1Icon, SearchIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function DynamicTable({ data, fieldsToHide, number }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [headers, setHeaderData] = useState([]);

  let propertiesInObject = Object.keys(data);
  const getHeaders = () => {
    return (
      <thead>
        {headers.map((head, index) => {
          return (
            <th
              key={index}
              className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              scope="col"
            >
              <span className="lg:pl-2">Staff members</span>
            </th>
          );
        })}
        );
      </thead>
    );
  };
  const getRows = () => {
    return getRows.map((row, index) => {
      return (
        <tr>
          {headers.map((cell, index) => {
            return (
              <td
                key={index}
                className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900"
              >
                <div className="flex items-center space-x-3 lg:pl-2">
                  <div
                    className={classNames(
                      "flex-shrink-0 w-2.5 h-2.5 rounded-full"
                    )}
                    aria-hidden="true"
                  />
                  <a href="#" className="truncate hover:text-gray-600">
                    <span>
                      {cell.title}{" "}
                      <span className="text-gray-500 font-normal">
                        {cell.team}
                      </span>
                    </span>
                  </a>
                </div>
              </td>
            );
          })}
        </tr>
      );
    });
  };
  return (
    <div className="hidden mt-8 sm:block">
      <div className="align-middle inline-block min-w-full border-b border-gray-200 position-relative">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 ">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
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
            <div className="flex items-center">{/* Profile dropdown */}</div>
          </div>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="border-t border-gray-200">
              {getHeaders()}
              {/* <th
            className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            scope="col"
          >
            Last updated
          </th> */}
              <th
                className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
              />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {projects.map((project) => (
              <tr className="relative" key={project.id}>
                <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                  <div className="flex items-center space-x-2">
                    <div className="flex flex-shrink-0 -space-x-1">
                      {project.members.map((member) => (
                        <img
                          key={member.handle}
                          className="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
                          src={member.imageUrl}
                          alt={member.name}
                        />
                      ))}
                    </div>
                  </div>
                </td>
                <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                  {project.lastUpdated}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <Menu as="div" className="flex-shrink-0 pr-2 z-30">
                    <Menu.Button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                      <span className="sr-only">Open options</span>
                      <DotsVerticalIcon
                        className="w-5 h-5"
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
                      <Menu.Items className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                View
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Edit
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Delete
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Activate
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Deactivate
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
