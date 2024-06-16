import React, { useEffect, useState } from "react";
import List from "./List";
import { useNavigate } from "react-router-dom";

const RankList = ({
  data,
  isHideAlbum,
  number,
  rankListt = false,
  link,
  weekChart,
}) => {
  const [isShowfull, setIsShowfull] = useState(false);
  console.log(data);

  // console.log(rankListt);

  const [songs, setSongs] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isShowfull) {
      setSongs(data?.filter((i, index) => index < number));
    } else {
      setSongs(data);
    }
  }, [isShowfull, data]);

  return (
    <div className="w-full">
      {songs?.map((item, index) => (
        <List
          songData={item}
          key={item.encodeId}
          isHideNode
          isHideAlbum={isHideAlbum}
          order={index + 1}
          rankListt={rankListt}
        ></List>
      ))}
      {!weekChart && (
        <div className="flex w-full justify-center items-center">
          <button
            type="button"
            className="px-6 my-4 py-2 border border-green-600 rounded-l-full rounded-r-full text-main-500 text-sm hover:text-white hover:bg-main-500
          "
            onClick={() =>
              !link
                ? setIsShowfull((prev) => !prev)
                : navigate(link.split(".")[0])
            }
          >
            {isShowfull ? "Ẩn bớt" : "Xem tất cả"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RankList;
