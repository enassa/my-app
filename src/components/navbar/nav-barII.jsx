import React,{useState} from "react";
import { Link } from "react-router-dom";

export const NavBarII = () =>{
    const [mobile, setMobile] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);

  const screenSize = () => {
    if (window.innerWidth <= 900) {
      setMobile(true);
    }
  };

  const menuToggle = () => {
    setActiveMenu(!activeMenu);
  };

  window.addEventListener("resize", screenSize);
    return(
        <>
        <nav className="bg-bodyBrown flex justify-center items-center h-[80px] mb-[30px]">
      <div className="flex justify-center lg:justify-end items-center w-full py-3 px-5 lg:px-28">
        <div className="flex items-center justify-end">
          <div className="flex w-full justify-end">
            <p className="mx-10 cursor-pointer font-serif font-bold text-center">Kicthen Dashboard</p>
          </div>
          <img
            height="18"
            width="24"
            onClick={menuToggle}
            className="ml-24 cursor-pointer"
            src={require(`../../assets/icons/${
              activeMenu ? "close.jpeg" : "menu-left-2-icon 1.png"
            }`)}
            alt=""
          />
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`${
          mobile && activeMenu ? "block" : "hidden"
        } shadow-lg p-5 rounded-md bg-white absolute z-50 top-24 w-[300px] mx-auto`}
      >
          <div className="flex flex-col  my-4">
     <div className='flex'> <Link to="/dashboard">Dashboard</Link><img className='ml-3' src={require("../../assets/icons/User.png")} alt="" /></div>
      <div className='my-5 flex'><Link to="/kitchen">Kitchen</Link><img className="ml-3"src= {require("../../assets/icons/Listing.png")} alt="" /></div>
      <div className='flex'><Link to="/waiter">Waiter</Link><img className='ml-3' src={require("../../assets/icons/Notifications.png")} alt="" /></div>
      </div>
      </div>
      {/* Mobile Menu */}
      
    </nav>
        </>
    )
}