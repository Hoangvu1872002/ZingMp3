import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiGetArtistPlaylist } from "../../apis";
import { Section, SectionItem } from "../../components";
import Scrollbars from "react-custom-scrollbars-2";

const SearchPlaylist = () => {
  const { searchData } = useSelector((state) => state.music);

  const [playlist, setPlaylist] = useState([]);

  const fetch = async () => {
    const res = await apiGetArtistPlaylist(searchData?.top?.id);
    setPlaylist(res?.data?.data);
  };

  console.log(playlist);

  useEffect(() => {
    fetch();
  }, [searchData]);
  return (
    <div className="w-full flex-col flex h-[90%] gap-4 px-[60px]">
      <h3 className="text-lg font-bold mt-2">Playlist/Album</h3>
      <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
        <div className=" grid grid-cols-5 gap-4">
          {playlist &&
            playlist?.items?.length > 0 &&
            playlist.items?.map((item) => (
              <SectionItem
                key={item.encodeId}
                data={playlist}
                title={item.title}
                link={item.link}
                sortDescription={item.sortDescription}
                thumbnailM={item.thumbnailM}
              />
            ))}
        </div>
      </Scrollbars>
    </div>
  );
};

export default SearchPlaylist;
