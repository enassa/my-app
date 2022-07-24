import React, { useState } from "react";
import Modali from "../menus/modali";

export const WaiterBody = () => {
  const [modalOn, setModalOn] = useState(false);

  const [choice, setChoice] = useState(false);

  const clicked = () => {
    setModalOn(true);
  };
  return (
    <div className="overflow-auto mt-10  ml-10 mr-10 h-full">
      <h1 className="text-4xl mb-4">Front Desk</h1>
      <table className="overflow-scroll table-auto w-full">
        <thead className="text-left">
          <tr className="border-t border-gray-200">
            <th
              className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          <tr className="relative">
            <td className="px-3 py-3 max-w-0 whitespace-nowrap text-sm font-normal text-gray-500">
              27/05/2022
            </td>
            <td className="px-3 py-3 text-sm text-gray-700">
              <a href="#" className="text-gray-500 font-normal hover:underline">
                0001
              </a>
            </td>
            <td className="px-3 py-3 text-sm text-gray-700">
              <span className="py-1 px-2 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-300 rounded-lg bg-opacity-50">
                Completed
              </span>
            </td>
            <td className="px-3 py-3 text-gray-500  font-normal text-sm">
              Chicken Pizza
            </td>
            <td>
              <a
                onClick={clicked}
                className=" cursor-pointer px-3 py-2 text-sm text-gray-200 bg-slate-600 rounded-lg hover:bg-orange-500 mt-2"
              >
                View
              </a>
            </td>
          </tr>
          <tr className="px-3 py-3 max-w-0 whitespace-nowrap text-sm font-normal text-gray-500">
            <td className="px-3 py-3 text-sm text-gray-600">27/05/2022</td>
            <td className="px-3 py-3 text-sm text-gray-700">
              <a href="#" className="text-gray-500  hover:underline">
                0002
              </a>
            </td>
            <td className="px-3 py-3 text-sm text-gray-700">
              <span className="py-1 px-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                Pending
              </span>
            </td>
            <td className="px-3 py-3 text-sm text-gray-700">Chicken Pizza</td>
            <td>
              <a
                onClick={clicked}
                className="cursor-pointer px-3 py-2 text-sm text-gray-200 bg-slate-600 rounded-lg hover:bg-orange-500 mt-2"
              >
                View
              </a>
            </td>
          </tr>
          <tr className="px-3 py-3 max-w-0 whitespace-nowrap text-sm font-normal text-gray-500">
            <td className="px-3 py-3 text-sm text-gray-700">27/05/2022</td>
            <td className="px-3 py-3 text-sm text-gray-700">
              <a href="#" className="text-gray-500  hover:underline">
                0003
              </a>
            </td>
            <td className="px-3 py-3 text-sm text-gray-700">
              <span className="py-1 px-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-400 rounded-lg bg-opacity-50">
                Cancelled
              </span>
            </td>
            <td className="px-3 py-3 text-sm text-gray-700">Chicken Pizza</td>
            <td>
              <a
                onClick={clicked}
                className="cursor-pointer px-3 py-2 text-sm text-gray-200 bg-slate-600 rounded-lg hover:bg-orange-500 mt-2"
              >
                View
              </a>
            </td>
          </tr>
          <tr className="px-3 py-3 max-w-0 whitespace-nowrap text-sm font-normal text-gray-500">
            <td className="px-3 py-3 text-sm text-gray-700">27/05/2022</td>
            <td className="px-3 py-3 text-sm text-gray-700">
              <a href="#" className="text-gray-500  hover:underline">
                0004
              </a>
            </td>
            <td className="px-3 py-3 text-sm text-gray-700">
              <span className="py-1 px-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-300 rounded-lg bg-opacity-50">
                Completed
              </span>
            </td>
            <td className="px-3 py-3 text-sm text-gray-700">Chicken Pizza</td>
            <td>
              <a
                onClick={clicked}
                className=" cursor-pointer px-3 py-2 text-sm text-gray-200 bg-slate-600 rounded-lg hover:bg-orange-500 mt-2"
              >
                View
              </a>
            </td>
          </tr>
          <tr className="px-3 py-3 max-w-0 whitespace-nowrap text-sm font-normal text-gray-500">
            <td className="px-3 py-3 text-sm text-gray-600">27/05/2022</td>
            <td className="px-3 py-3 text-sm text-gray-700">
              <a href="#" className="text-gray-500  hover:underline">
                0005
              </a>
            </td>
            <td className="px-3 py-3 text-sm text-gray-700">
              <span className="py-1 px-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 ow-200 rounded-lg bg-opacity-50">
                Pending
              </span>
            </td>
            <td className="px-3 py-3 text-sm text-gray-700">Chicken Pizza</td>
            <td>
              <a
                onClick={clicked}
                className="cursor-pointer px-3 py-2 text-sm text-gray-200 bg-slate-600 rounded-lg hover:bg-orange-500 mt-2"
              >
                View
              </a>
            </td>
          </tr>
          <tr className="px-3 py-3 max-w-0 whitespace-nowrap text-sm font-normal text-gray-500">
            <td className="px-3 py-3 text-sm text-gray-700">27/05/2022</td>
            <td className="px-3 py-3 text-sm text-gray-700">
              <a href="#" className="text-gray-500  hover:underline">
                0006
              </a>
            </td>
            <td className="px-3 py-3 text-sm text-gray-700">
              <span className="py-1 px-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-400 rounded-lg bg-opacity-50">
                Cancelled
              </span>
            </td>
            <td className="px-3 py-3 text-sm text-gray-700">Chicken Pizza</td>
            <td>
              <a
                onClick={clicked}
                className="cursor-pointer px-3 py-2 text-sm text-gray-200 bg-slate-600 rounded-lg hover:bg-orange-500 mt-2"
              >
                View
              </a>
            </td>
          </tr>
          <tr className="px-3 py-3 max-w-0 whitespace-nowrap text-sm font-normal text-gray-500">
            <td className="px-3 py-3 text-sm text-gray-700">27/05/2022</td>
            <td className="px-3 py-3 text-sm text-gray-700">
              <a href="#" className="text-gray-500  hover:underline">
                0006
              </a>
            </td>
            <td className="px-3 py-3 text-sm text-gray-700">
              <span className="py-1 px-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-400 rounded-lg bg-opacity-50">
                Cancelled
              </span>
            </td>
            <td className="px-3 py-3 text-sm text-gray-700">Chicken Pizza</td>
            <td>
              <a
                onClick={clicked}
                className="cursor-pointer px-3 py-2 text-sm text-gray-200 bg-slate-600 rounded-lg hover:bg-orange-500 mt-2"
              >
                View
              </a>
            </td>
          </tr>
          <tr className="px-3 py-3 max-w-0 whitespace-nowrap text-sm font-normal text-gray-500">
            <td className="px-3 py-3 text-sm text-gray-700">27/05/2022</td>
            <td className="px-3 py-3 text-sm text-gray-700">
              <a href="#" className="text-gray-500  hover:underline">
                0006
              </a>
            </td>
            <td className="px-3 py-3 text-sm text-gray-700">
              <span className="py-1 px-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-400 rounded-lg bg-opacity-50">
                Cancelled
              </span>
            </td>
            <td className="px-3 py-3 text-sm text-gray-700">Chicken Pizza</td>
            <td>
              <a
                onClick={clicked}
                className="cursor-pointer px-3 py-2 text-sm text-gray-200 bg-slate-600 rounded-lg hover:bg-orange-500 mt-2"
              >
                View
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      {modalOn && <Modali setModalOn={setModalOn} setChoice={setChoice} />}
    </div>
  );
};
