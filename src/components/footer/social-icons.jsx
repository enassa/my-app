import React from "react";

const SocialIcons = ({ Icons }) => {
  return (
    <div className="text-teal-500">
      {Icons.map((icon) => (
        <div
          key={icon.name}
          className={`${icon.name==='instagram 2' && 'bg-[#098b71]'} bg-white inline-block mx-3 p-4 rounded-full`}
        >
          <img src={require (`../../assets/icons/${icon.name}.png`)} alt="" />
        </div>
      ))}
    </div>
  );
};

export default SocialIcons;
