import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div
      className={`h-[838px] hidden lg:block absolute lg:static bg-white flex-col p-10 rounded-lg shadow-lg lg:mr-[27px]`}
    >
      <div className="relative flex flex-col justify-center items-center">
        <div className="bg-buttonGreen flex justify-center items-center absolute top-14 right-[82px] rounded-full h-4 w-4">
          <img src={require(`../../assets/icons/bx-camera 1.png`)} alt="" />
        </div>
        <img
          src={require(`../../assets/imgs/avatar.jpeg`)}
          height="78"
          width="78"
          alt="avatar"
        />
        <h5 className="mt-4 font-bold text-lg">Potbelly</h5>
        <p className="text-textGrey text-sm my-3">CEO</p>
      </div>
      <div className="flex flex-col  my-4">
        <div className="flex">
          {" "}
          <Link to="/dashboard">Dashboard</Link>
          <img
            className="ml-3"
            src={require("../../assets/icons/monitor.png")}
            alt=""
          />
        </div>
        <div className="my-5 flex">
          <Link to="/kitchen">Orders</Link>
          <img
            className="ml-10"
            src={require("../../assets/icons/cargo.png")}
            alt=""
          />
        </div>
        <div className="flex">
          <Link to="/waiter">Report</Link>
          <img
            className="ml-10"
            src={require("../../assets/icons/report.png")}
            alt=""
          />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Sidebar;
