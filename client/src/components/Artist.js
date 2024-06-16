import React, { useState } from "react";
import { handleNumber } from "../ultis/fn";

const Artist = ({ image, title, follower }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className=" flex flex-col gap-5">
      <div
        className="relative overflow-hidden rounded-full cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img
          src={image}
          alt=""
          className={`w-full object-contain rounded-full ${
            isHover ? "animate-scale-up-image" : "animate-scale-down-image"
          }`}
        />
        {isHover && (
          <div className="absolute inset-0 bg-overlay-30 rounded-full"></div>
        )}
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-xs opacity-70">{`${handleNumber(
          follower
        )} Quan tâm`}</span>
        <button
          type="button"
          className="bg-main-500 px-4 text-sm py-1 text-white rounded-l-full rounded-r-full flex items-center justify-center gap-1"
        >
          <span className="text-xs opacity-60">QUAN TÂM</span>
        </button>
      </div>
    </div>
  );
};

export default Artist;
