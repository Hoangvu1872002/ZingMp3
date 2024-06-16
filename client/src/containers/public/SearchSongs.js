import React, { useEffect } from "react";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Scrollbars from "react-custom-scrollbars-2";
import { Lists } from "../../components";

const SearchSongs = () => {
  const { searchData } = useSelector((state) => state.music);
  // console.log(searchData?.top?.id);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(searchData?.top);
    dispatch(actions.getSearchSong(searchData?.top?.id));
  }, [searchData]);

  return (
    <div className="flex-auto mb-20 w-full h-[80%] px-[60px]">
      <div className=" flex mb-2 text-xs justify-start items-center font-semibold">
        <span className="text-lg font-bold my-2">Bài hát</span>
      </div>
      <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
        <Lists pid={searchData?.top?.playlistId} />
      </Scrollbars>
    </div>
  );
};

export default SearchSongs;
