import { BriefcaseIcon } from "@heroicons/react/outline";
import React from "react";

export default function DashboardCard({ data }) {
  return (
    <div className="bg-white w-full mr-3 overflow-hidden shadow rounded-lg mb-5">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <BriefcaseIcon
              className="h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                Card Name
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">2000</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <a href="#" className="font-medium text-cyan-700 hover:text-cyan-900">
            View all
          </a>
        </div>
      </div>
    </div>
  );
}
