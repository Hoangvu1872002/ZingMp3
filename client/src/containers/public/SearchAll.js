import React from "react";
import { useSelector } from "react-redux";
import { handleNumber } from "../../ultis/fn";
import { Artist, List, SectionItem, SongItem } from "../../components";
import Scrollbars from "react-custom-scrollbars-2";

const SearchAll = () => {
  const { searchData } = useSelector((state) => state.music);
  // console.log(searchData);
  return (
    <div className="w-full h-[88%] flex flex-col px-[60px] mb-10">
      <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold mb-5 mt-2">Nổi bật</h3>
          <div className="flex gap-8">
            {searchData?.top && (
              <div className="p-[10px] cursor-pointer flex-1 bg-main-200 rounded-md flex gap-8 items-center">
                <img
                  src={searchData.top.thumbnail}
                  alt="avata"
                  className={`w-[84px] h-[84px] object-cover ${
                    searchData.top.objectType === "artist" && "rounded-full"
                  }`}
                ></img>
                <div className="flex flex-col text-xs">
                  <span className="mb-[6px]">
                    {searchData.top.objectType === "artist" ? "Nghệ sĩ" : ""}
                  </span>
                  <span className="text-sm font-semibold">
                    {searchData.top.title || searchData.top.name}
                  </span>
                  {searchData.top.objectType === "artist" && (
                    <span>
                      {handleNumber(searchData.artists[0]?.totalFollow) +
                        " Quan tâm"}
                    </span>
                  )}
                </div>
              </div>
            )}
            {searchData?.songs
              ?.filter((item, index) =>
                [...Array(2).keys()].some((i) => i === index)
              )
              ?.map((item) => (
                <div key={item.encodeId} className="flex-1">
                  <SongItem
                    thumbnail={item.thumbnail}
                    sid={item.encodeId}
                    title={item.title}
                    artists={item.artistsNames}
                    size="w-[84px] h-[84px]"
                    style="bg-main-200"
                  ></SongItem>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col w-full mt-5">
          <h3 className="text-lg font-bold mb-5">Bài hát</h3>
          <div className="flex justify-between flex-wrap w-full">
            {searchData?.songs
              ?.filter((e, index) => index < 6)
              .map((item, index) => (
                <div
                  key={item.encodeId}
                  className={`flex-auto w-[45%] ${
                    index % 2 !== 0 ? "pl-4" : "pr-4"
                  }`}
                >
                  <List songData={item} isHideAlbum isHideNode></List>
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col w-full mt-5">
          <h3 className="text-lg font-bold mb-5">Playlist/Ambum</h3>
          <div className="grid grid-cols-4 gap-5 w-full">
            {searchData?.playlists
              ?.filter((e, index) => index < 4)
              .map((item, index) => (
                <SectionItem
                  key={item.encodeId}
                  title={item.title}
                  link={item.link}
                  sortDescription={item.sortDescription}
                  thumbnailM={item.thumbnailM}
                ></SectionItem>
              ))}
          </div>
        </div>

        <div className="flex flex-col w-full mt-5">
          <h3 className="text-lg font-bold mb-5"> Nghệ sĩ</h3>
          <div className="grid grid-cols-4 gap-5 w-full">
            {searchData?.artists
              ?.filter((e, index) => index < 4)
              .map((item, index) => (
                <Artist
                  key={item.id}
                  title={item.name}
                  image={item.thumbnailM}
                  follower={item.totalFollow}
                ></Artist>
              ))}
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default SearchAll;
