import React, { useEffect, useState } from "react";
import { useKitchenServices } from "../../context/kitchen-body-context";
import Modali from "../menus/modali";

const Main = () => {
  const clicked = () => {
    setModalOn(true);
  };
  const [modalOn, setModalOn] = useState(false);
  const [choice, setChoice] = useState(false);
  return (
    <div className="lg:h-[838px] w-full shadow-lg rounded-md bg-white p-8">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="border rounded p-6">
          <div className="flex justify-between items-center">
            <h1 className="">Total Sales accross branches</h1>
            {/* <p className="text-sm text-textGrey">Monthly Goal</p> */}
          </div>
          <div className="flex justify-between items-center my-3">
            <h1 className="text-3xl">98.1%</h1>
            <p className="text-buttonGreen">+6.9%</p>
          </div>
          <img src={require(`../../assets/icons/Progress Bar.png`)} alt="" />
        </div>
        <div className="border my-6 lg:mx-6 lg:my-0 rounded p-6">
          <div className="flex justify-between items-center">
            <h1 className="">Total deliveries accross branches</h1>
            {/* <p className="text-sm text-textGrey">Total Profit</p> */}
          </div>
          <div className="flex justify-between items-center mt-3 mb-5">
            <h1 className="text-3xl">₵13,893</h1>
            <p className="text-barOrange">+11.3%</p>
          </div>
          <img src={require(`../../assets/icons/Graph-3.png`)} alt="" />
        </div>
        <div className="border rounded p-6">
          <div className="flex justify-between items-center">
            <h1 className="">Customer Rewards</h1>
            <p className="text-sm text-textGrey"></p>
          </div>
          <div className="flex justify-between items-center my-3">
            <h1 className="text-3xl">1,232</h1>
            <p className="text-buttonGreen">+3.2%</p>
          </div>
          <img src={require(`../../assets/icons/Progress Bar.png`)} alt="" />
          <p className="text-sm text-gray-400 mt-3">Yearly Goal</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row my-6">
        <div className="border rounded lg:mr-6">
          <div className="flex p-6 border-b justify-between items-center">
            <div className="flex mr-16">
              <img src={require(`../../assets/icons/Icon.png`)} alt="" />
              <div className="ml-4">
                <p>Cancelled Deliveries</p>
                <p className="text-[#34aa44] text-xs">+₵9111111185.56</p>
              </div>
            </div>
            <div>
              <img src={require(`../../assets/icons/More.png`)} alt="" />
            </div>
          </div>
          <div className="p-6 flex justify-between items-center">
            <img src={require(`../../assets/icons/Pie Chart.png`)} alt="" />
            <div className="flex flex-col  items-end">
              <p className="pr-5">₵2,595</p>
              <p className="text-[10px] text-gray-400 pr-5">Invoiced</p>
              <img
                className="my-3"
                src={require(`../../assets/icons/Divider.png`)}
                alt=""
              />
              <p className="pr-5">23</p>
              <p className="text-[10px] text-gray-400 pr-5">Invoices</p>
            </div>
          </div>
        </div>
        <div className="lg:w-4/6 mt-6 md:mt-0 border rounded">
          <div className="flex p-6 border-b justify-between lg:justify-start items-center">
            <p>Number of orders per branch</p>
            <img src={require(`../../assets/icons/More.png`)} alt="" />
          </div>
          <div className="relative mt-10 p-6 ">
            <img
              width="450"
              className="absolute top-4"
              src={require(`../../assets/icons/Graph Base.png`)}
              alt=""
            />
            <img
              className="absolute top-4 right-2"
              src={require(`../../assets/icons/Graph Legend.png`)}
              alt=""
            />
            <img
              width="430"
              src={require(`../../assets/icons/Graph.png`)}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col my-6">
        <div className="relative mr-1 flex justify-end items-center">
          <h1 className="text-xl mb-2 ml-10">Order Details</h1>
          <div className="relative mr-9 flex justify-end items-center">
            <input
              className="hidden lg:block bg-bodyGrey rounded-l-md px-2 py-2 w-3/5 text-grey-700 outline-0"
              type="text"
              placeholder="Search"
            />
            <button className="bg-buttonGreen text-white p-2 rounded-none lg:rounded-r-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Date
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Order No.
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Status
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Type
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100">
                <td className="p-3 text-sm text-gray-700">27/05/2022</td>
                <td className="p-3 text-sm text-gray-700">
                  <a
                    href="#"
                    className="font-bold text-blue-500 hover:underline"
                  >
                    0001
                  </a>
                </td>
                <td className="p-3 text-sm text-gray-700">
                  <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-300 rounded-lg bg-opacity-50">
                    Completed
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700">Chicken Pizza</td>
                <td>
                  <a
                    onClick={clicked}
                    className=" cursor-pointer p-3 text-sm text-gray-200 bg-slate-600 rounded-lg hover:bg-orange-500 mt-2"
                  >
                    View
                  </a>
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-3 text-sm text-gray-700">27/05/2022</td>
                <td className="p-3 text-sm text-gray-700">
                  <a
                    href="#"
                    className="font-bold text-blue-500 hover:underline"
                  >
                    0002
                  </a>
                </td>
                <td className="p-3 text-sm text-gray-700">
                  <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                    Pending
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700">Chicken Pizza</td>
                <td>
                  <a
                    onClick={clicked}
                    className=" p-3 text-sm text-gray-200 bg-slate-600 rounded-lg hover:bg-orange-500 "
                  >
                    View
                  </a>
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-3 text-sm text-gray-700">27/05/2022</td>
                <td className="p-3 text-sm text-gray-700">
                  <a
                    href="#"
                    className="font-bold text-blue-500 hover:underline"
                  >
                    0003
                  </a>
                </td>
                <td className="p-3 text-sm text-gray-700">
                  <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-400 rounded-lg bg-opacity-50">
                    Cancelled
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700">Chicken Pizza</td>
                <td>
                  <a
                    onClick={clicked}
                    className="p-3 text-sm text-gray-200 bg-slate-600 rounded-lg hover:bg-orange-500 mt-2"
                  >
                    View
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {modalOn && <Modali setModalOn={setModalOn} setChoice={setChoice} />}
      {/* <div className="flex flex-col md:flex-row my-6 ">
          <div className="lg:w-4/6 border lg:mr-6 rounded">
            <div className="border-b p-6 flex justify-between items-center">
              <p>Daily Actice Clients</p>
              <img src={require(`../../assets/icons/More.png`)} alt="" />
            </div>
            <div className="relative mt-10 p-6 ">
              <img
                width="450"
                className="absolute top-4"
                src={require(`../../assets/icons/Graph Base.png`)}
                alt=""
              />
              <img
                className="absolute top-4 right-2"
                src={require(`../../assets/icons/Graph Legend.png`)}
                alt=""
              />
              <img
                width="430"
                src={require(`../../assets/icons/Graph-2.png`)}
                alt=""
              />
            </div>
          </div>
          <div className="border rounded mt-6 md:mt-0">
            <div className="flex p-6 border-b justify-between items-center">
              <div className="flex">
                <img src={require(`../../assets/icons/Icon-1.png`)} alt="" />
                <div className="ml-4">
                  <p>User Onboarding</p>
                  <p className="text-[10px] text-gray-400 pr-5">
                    Q3 Goal: 8,000 User
                  </p>
                </div>
              </div>
              <div>
                <img src={require(`../../assets/icons/More.png`)} alt="" />
              </div>
            </div>
            <div className="p-6 flex items-center">
              <img src={require(`../../assets/icons/Pie Chart-2.png`)} alt="" />
              <div className="flex flex-col  items-end">
                <p className="pr-4">2,452</p>
                <p className="text-[10px] text-gray-400 pr-4">Onboarded</p>
                <img
                  className="my-3"
                  src={require(`../../assets/icons/Divider.png`)}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div> */}
    </div>
  );
};

export default Main;
