import React from "react";
export default function DetailForm({ data }) {
  return (
    <div
      style={{ borderTop: "3px solid black" }}
      className="relative bg-white h-auto shadow min-w-[400px] p-10 rounded-lg animate-rise"
    >
      <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="flex h-full flex-col">
          <div className="sm:col-span-1 mb-5">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{data?.name || "-"}</dd>
          </div>
          <div className="sm:col-span-1 mb-5">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900">{data?.email || "-"}</dd>
          </div>
          <div className="sm:col-span-1 mb-5">
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1 text-sm text-gray-900">{data?.phone || "-"}</dd>
          </div>
          <div className="sm:col-span-1 mb-5">
            <dt className="text-sm font-medium text-gray-500">Role</dt>
            <dd className="mt-1 text-sm text-gray-900">{data?.role || "-"}</dd>
          </div>
          <div className="sm:col-span-1 mb-5">
            <dt className="text-sm font-medium text-gray-500">Branch</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {data?.branch || "-"}
            </dd>
          </div>
          <div className="sm:col-span-1 mb-5">
            <dt className="text-sm font-medium text-gray-500">
              Organization name
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {data?.organizationName || "-"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
