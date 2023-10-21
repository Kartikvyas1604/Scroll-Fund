import React from "react";

interface HeaderProps {
  heading: string;
}

const Header = ({ heading }: HeaderProps) => {
  return (
    <div className="flex flex-col text-center w-full">
      <h1 className="text-3xl mb-5 font-bold title-font text-transparent bg-clip-text bg-gradient-to-r from-[#FF684B] to-[#ED5032]">
        {heading}
      </h1>
    </div>
  );
};

export default Header;

Header.defaultProps = {
  label: "",
  onClick: () => {},
};