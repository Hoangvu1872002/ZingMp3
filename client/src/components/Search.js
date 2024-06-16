import React, { useState } from "react";
import icons from "../ultis/icons";
import { apiSearch } from "../apis";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import path from "../ultis/path";

const { FiSearch, IoClose } = icons;

const Search = () => {
  const [keyword, setKeyword] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      console.log(keyword);
      dispatch(actions.search(keyword));
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({
          q: keyword,
        }).toString(),
      });
    }
  };
  return (
    <div className="w-full relative flex items-center">
      {keyword && (
        <span
          onClick={() => setKeyword("")}
          className="absolute right-3 text-gray-700 cursor-pointer"
        >
          <IoClose size={24}></IoClose>
        </span>
      )}
      <span className="h-10 pl-4 bg-[#DDE4E4] flex items-center justify-center rounded-l-[20px] text-gray-500">
        <FiSearch size={24} />
      </span>
      <input
        type="text"
        value={keyword}
        className="outline-none px-4 bg-[#DDE4E4] py-2 w-full rounded-r-[20px] h-10 text-gray-500"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
      />
    </div>
  );
};

export default Search;
