import React from "react";
// import image from "";
const Menu = ({ title, icon, bold }) => {
  return (
    <>
      <hr />
      <div className="flex justify-between items-center px-2 py-3">
        <p className={`${bold && "font-bold"} cursor-pointer hover:font-bold`}>
          {title}
        </p>
        {/* <img src={require(`../../../assets/icons/${icon}`)} alt="" /> */}
      </div>
    </>
  );
};

export default Menu;
