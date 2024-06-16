import React, { memo } from "react";
import { List } from "./";
import icons from "../ultis/icons";
import moment from "moment";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const { BsDot } = icons;

const Lists = ({ totalDuration }) => {
  // console.log({ songs, totalDuration })
  const { songs, searchData } = useSelector((state) => state.music);
  const { pid } = useParams();
  // console.log(pid);
  return (
    <div className="w-full pr-[5px] flex flex-col text-xs text-gray-600">
      <div className="flex flex-col">
        {songs && songs.length > 0 ? (
          <>
            {songs?.map((item) => (
              <List key={item.encodeId} songData={item} pid={pid} />
            ))}
          </>
        ) : (
          <>
            {searchData?.songs?.map((item) => (
              <List key={item.encodeId} songData={item} pid={pid} />
            ))}
          </>
        )}
      </div>
      {totalDuration && (
        <span className="flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]">
          <span>{`${songs?.length} bài hát`}</span>
          <BsDot size={24} />
          <span>{moment.utc(totalDuration * 1000).format("HH:mm:ss")}</span>
        </span>
      )}
    </div>
  );
};

export default memo(Lists);
