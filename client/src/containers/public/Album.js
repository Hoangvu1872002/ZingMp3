import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment";
import { Lists, AudioLoading } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import icons from "../../ultis/icons";

const { BsFillPlayFill } = icons;

const Album = () => {
  const location = useLocation();

  const { pid } = useParams();
  const { isPlaying, curSongId, songs } = useSelector((state) => state.music);
  const [playlistData, setPlaylistData] = useState({});
  const [checkAnimate, setCheckAnimate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(actions.setCurAlbumId(pid));
    const fetchDetailPlaylist = async () => {
      dispatch(actions.loading(true));
      const response = await apis.apiGetDetaiPlaylist(pid);
      dispatch(actions.loading(false));
      if (response?.data.err === 0) {
        setPlaylistData(response.data?.data);
        dispatch(actions.setPlaylist(response?.data?.data?.song?.items));
      }
    };

    fetchDetailPlaylist();
  }, [pid]);

  useEffect(() => {
    if (songs?.find((e) => e.encodeId === curSongId) && isPlaying) {
      setCheckAnimate(true);
    } else setCheckAnimate(false);
  }, [curSongId, songs, isPlaying]);

  useEffect(() => {
    // console.log(location.state?.playAlbum);
    if (location.state?.playAlbum) {
      const randomSong =
        Math.round(Math.random() * playlistData?.song?.items?.length) - 1;
      dispatch(
        actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId)
      );
      dispatch(actions.play(true));
    }
  }, [pid, playlistData]);

  return (
    <div className="flex relative gap-8 w-full h-full px-[59px] animate-scale-up-center">
      <div className="flex-none w-1/4 flex flex-col items-center gap-2 mt-11">
        <div className="w-full relative overflow-hidden">
          <img
            src={playlistData?.thumbnailM}
            alt="thumbnail"
            className={`w-full object-contain ${
              checkAnimate
                ? "rounded-full animate-rotate-center"
                : "rounded-full animate-rotate-center-pause"
            } shadow-md`}
          />
          <div
            className={`absolute top-0 left-0 bottom-0 right-0 hover:bg-overlay-30 text-white flex items-center justify-center rounded-full`}
          >
            <span className="p-3 border border-white rounded-full">
              {checkAnimate ? <AudioLoading /> : <BsFillPlayFill size={30} />}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-[20px] font-bold text-gray-800">
            {playlistData?.title}
          </h3>
          <span className="flex gap-2 items-center text-gray-500 text-xs">
            <span>Cập nhật:</span>
            <span>
              {moment
                .unix(playlistData?.contentLastUpdate)
                .format("DD/MM/YYYY")}
            </span>
          </span>
          <span className="flex gap-2 items-center text-gray-500 text-xs">
            {playlistData?.artistsNames}
          </span>
          <span className="flex gap-2 items-center text-gray-500 text-xs">{`${Math.round(
            playlistData?.like / 1000
          )}K người yêu thích`}</span>
        </div>
      </div>

      <div className="flex-auto mb-20">
        {/* <span className="text-sm">
          <span className="text-gray-600 ">Lời tựa </span>
          <span>{playlistData?.sortDescription}</span>
        </span> */}
        <div className=" flex mb-2 text-xs justify-between items-center p-[10px] font-semibold">
          <span>BÀI HÁT</span>
          <span>ALBUM</span>
          <span>THỜI GIAN</span>
        </div>
        <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
          <Lists totalDuration={playlistData?.song?.totalDuration} />
        </Scrollbars>
      </div>
    </div>
  );
};

export default Album;
