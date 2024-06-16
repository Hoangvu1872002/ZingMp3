import React, { memo } from "react";
import icons from "../ultis/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

const { BsMusicNoteBeamed } = icons;

const List = ({ songData, pid, isHideAlbum, isHideNode, order, rankListt }) => {
  const dispatch = useDispatch();

  // console.log(songData);
  return (
    <div
      className="flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer"
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId));
        dispatch(actions.setCurAlbumId(pid));
        // if (pid) {
        //   dispatch(actions.setCurAlbumId(pid));
        // }
        dispatch(actions.play(true));
        dispatch(actions.playAlbum(true));
        dispatch(
          actions.setRecent({
            thumbnail: songData?.thumbnail,
            title: songData?.title,
            sid: songData?.encodeId,
            artists: songData?.artistsNames,
          })
        );
      }}
    >
      <div className="flex items-center gap-4 flex-3">
        {order && (
          <span
            className={`${
              order === 1
                ? "text-shadow-no1 text-gray-200 text-[40px]"
                : order === 2
                ? "text-shadow-no2 text-gray-200 text-[40px]"
                : order === 3
                ? "text-shadow-no3 text-gray-200 text-[40px]"
                : "text-[20px] text-black font-semibold"
            }  m-auto w-14 flex justify-center items-center`}
          >
            {order}
          </span>
        )}
        {!isHideNode && (
          <span>
            <BsMusicNoteBeamed />
          </span>
        )}
        <img
          src={songData?.thumbnail}
          alt="thumbnailM"
          className="w-10 h-10 object-cover rounded-md"
        />
        <span className="flex flex-col w-full">
          <span className="text-sm font-semibold">
            {songData?.title?.length > 30
              ? `${songData?.title?.slice(0, 30)}...`
              : songData?.title}
          </span>
          {!rankListt && (
            <span className="text-xs opacity-70">{songData?.artistsNames}</span>
          )}
        </span>
      </div>
      {!isHideAlbum && (
        <div className="flex-1 flex items-center justify-center text-xs">
          {songData?.album?.title?.length > 30
            ? `${songData?.album?.title?.slice(0, 30)}...`
            : songData?.album?.title}
        </div>
      )}
      <div className="flex-1 flex justify-end text-xs opacity-70">
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(List);
