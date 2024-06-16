import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SongItem from "./SongItem";
import { apiGetDetaiPlaylist } from "../apis";
import { play } from "../store/actions";
import { Scrollbars } from "react-custom-scrollbars-2";

const SidebarRight = () => {
  const [isRecent, setIsRecent] = useState(false);
  const [playlist, setPlaylist] = useState();
  // const [checkPlaying, setCheckPlaying] = useState();

  const { curSongData, curAlbumId, curSongId, isPlaying, recentSongs } =
    useSelector((state) => state.music);

  console.log(curAlbumId);

  const fetchDetailPlaylist = async () => {
    const response = await apiGetDetaiPlaylist(curAlbumId);
    if (response.data?.err === 0) {
      setPlaylist(response.data.data?.song?.items);
    } else setPlaylist();
  };
  useEffect(() => {
    // if (curAlbumId) fetchDetailPlaylist();
    fetchDetailPlaylist();
  }, [curAlbumId]);

  useEffect(() => {
    setIsRecent(false);
  }, [curSongId]);

  useEffect(() => {
    if (curAlbumId && isPlaying) fetchDetailPlaylist();
  }, [curAlbumId, isPlaying]);

  console.log(playlist);

  return (
    <div className=" flex flex-col text-xs w-full h-full">
      <div className="h-[70-px] w-full flex-none py-[14px] pr-2 gap-8 flex justify-between items-center">
        <div className="flex flex-auto justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer">
          <span
            onClick={() => setIsRecent((prev) => !prev)}
            className={`py-[5px] ${
              !isRecent && "bg-main-100"
            } flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
          >
            {" "}
            Danh sách phát
          </span>
          <span
            onClick={() => setIsRecent((prev) => !prev)}
            className={`py-[5px] ${
              isRecent && "bg-main-100"
            } flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
          >
            Nghe gần đây
          </span>
        </div>
        {/* <span className="p-2 rounded-full cursor-pointer hover:bg-main-100">
          Xoa
        </span> */}
      </div>
      <div className="w-full flex-col flex-auto flex pr-2">
        {isRecent ? (
          <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
            <div className="flex flex-col">
              {recentSongs?.map((e) => (
                <SongItem
                  key={e.sid}
                  thumbnail={e?.thumbnail}
                  title={e?.title}
                  artists={e?.artists}
                  sid={e?.sid}
                ></SongItem>
              ))}
            </div>
          </Scrollbars>
        ) : (
          <>
            <SongItem
              thumbnail={curSongData?.thumbnail}
              title={curSongData?.title}
              artists={curSongData?.artistsNames}
              sid={curSongData?.encodeId}
              style="bg-main-500 text-white"
            ></SongItem>
            {!playlist ? (
              <>
                <div className="h-full w-full flex justify-center items-center">
                  Bạn đang không nghe album nào.
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col text-black pt-[15px] px-2 pb-5px">
                  <span className="text-sm font-bold">Tiếp theo</span>
                  <span className="opacity-70 tetx-xs flex gap-1">
                    <span>Từ playlist</span>
                    <span className="font-semibold text-main-500">
                      {curSongData?.album?.title.length > 30
                        ? `${curSongData?.album?.title.slice(0, 20)}...`
                        : curSongData?.album?.title}
                    </span>
                  </span>
                </div>
                <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
                  <div className="flex flex-col">
                    {playlist?.map((e) => (
                      <SongItem
                        key={e.encodeId}
                        thumbnail={e?.thumbnail}
                        title={e?.title}
                        artists={e?.artistsNames}
                        sid={e?.encodeId}
                      ></SongItem>
                    ))}
                  </div>
                </Scrollbars>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarRight;
