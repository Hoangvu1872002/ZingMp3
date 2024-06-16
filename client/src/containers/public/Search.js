import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { searchMenu } from "../../ultis/menu";
import { useSelector } from "react-redux";
import Scrollbars from "react-custom-scrollbars-2";

const Search = () => {
  const { keyword } = useSelector((state) => state.music);
  return (
    <div className="w-full h-full">
      <div className="flex items-center text-sm border-b border-gray-400 pl-[40px] mb-3 mx-[20px]">
        <span className="text-[24px] pb-2 mb-1 font-bold pr-6 border-r border-gray-400 ">
          Kết quả tìm kiếm
        </span>
        <div className="flex items-center ">
          {searchMenu.map((e) => (
            <NavLink
              key={e.path}
              to={`${e.path}?q=${keyword}`}
              className={({ isActive }) =>
                isActive
                  ? "border-b-green-700 pb-3 border-b-2 px-2 mx-2 hover:text-main-500 font-semibold cursor-pointer"
                  : "px-4 hover:text-main-500 pb-3 font-semibold cursor-pointer"
              }
            >
              {e.text}
            </NavLink>
          ))}
        </div>
      </div>

      {/* <Scrollbars autoHide style={{ width: "100%", height: "100%" }}> */}
      <Outlet></Outlet>
    </div>
  );
};

export default Search;
