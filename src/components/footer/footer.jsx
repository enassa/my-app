import React from "react";
import ItemsContainer from "./items-container";
import SocialIcons from "./social-icons";
import { Icons } from "./menus";

const Footer = () => {
  return (
    <footer className="text-black">
      <ItemsContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8 items-center mt-12">
        <span>© Potbelly Restaurant.All rights reserved.</span>
        <span>Terms Conditions. Privacy Policy</span>
        <SocialIcons Icons={Icons} />
      </div>
    </footer>
  );
};

export default Footer;
