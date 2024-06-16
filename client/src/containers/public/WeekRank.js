import React from "react";
import bgChart from "../../assets/bg-chart.jpg";
import { NavLink, useParams } from "react-router-dom";
import { RankList } from "../../components";

const notActiveStyle = "text-[24px] text-black py-[10px] font-semibold";
const activeStyle =
  "text-[24px] text-main-500 py-[10px] font-semibold border-b-2 border-[#0E8080]";

const WeekRank = ({ weekChart }) => {
  const { pid } = useParams();
  //   console.log(weekChart?.find((item) => item?.link?.includes(pid))?.items);
  return (
    <div className="w-full">
      <div className="flex w-full flex-col h-[350px] relative">
        <img
          src={bgChart}
          alt=""
          className="w-full h-full  object-cover grayscale"
        ></img>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(206,217,217,0.8)]"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t  from-[#CED9D9] to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b  from-[#CED9D9] to-transparent"></div>
        <div className="absolute top-0 left-0 flex flex-col gap-2 w-full px-[40px] pb-[20px]">
          <h3 className="font-bold text-[40px] text-main-500 ">
            Bảng Xếp Hạng Tuần
          </h3>
          <div className="flex gap-6 w-full">
            {weekChart?.map((item) => (
              <NavLink
                key={item.chartId}
                to={item.link.split(".")[0]}
                className={({ isActive }) =>
                  isActive ? activeStyle : notActiveStyle
                }
              >
                {item.country === "vn"
                  ? "Việt Nam"
                  : item.country === "us"
                  ? "US-UK"
                  : item.country === "korea"
                  ? "K-Pop"
                  : ""}
              </NavLink>
            ))}
          </div>
          <div>
            <RankList
              data={weekChart?.find((item) => item?.link?.includes(pid))?.items}
              number={100}
              weekChart
            ></RankList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekRank;
