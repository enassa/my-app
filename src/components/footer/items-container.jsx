import Item from "./item";
import {  About, Support, Address } from "./menus";
const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">

      <Item Links={About} title="About" />
      <Item Links={Support} title="Support" />
      <Item Links={Address} title="Address" />
    </div>
  );
};

export default ItemsContainer;
