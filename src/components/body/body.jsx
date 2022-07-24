import React from 'react';
import Main from './main';
import Sidebar from '../menus/sidebar';

const Body = () => {

  return (
    <div className="relative flex items-center justify-center h-full w-10/12 mx-auto mb-10">
      <Sidebar />
       <Main />
    </div>
  );
}

export default Body;