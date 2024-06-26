import axios from "../axios";

export const apiGetSong = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/song",
        method: "get",
        params: { id: sid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetDetailSong = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/infosong",
        method: "get",
        params: { id: sid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetDetaiPlaylist = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/detailplaylist",
        method: "get",
        params: { id: pid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiSearch = (keyword) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/search",
        method: "get",
        params: { keyword },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetArtistSongs = (singerId) =>
  new Promise(async (resolve, reject) => {
    console.log(singerId);
    try {
      const response = await axios({
        url: "/artistsong",
        method: "get",
        params: { id: singerId, page: 1, count: 50 },
      });
      // console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetArtistPlaylist = (singerId) =>
  new Promise(async (resolve, reject) => {
    console.log(singerId);
    try {
      const response = await axios({
        url: "/artistplaylist",
        method: "get",
        params: { id: singerId, page: 1, count: 50 },
      });
      // console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetChartHome = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/charthome",
        method: "get",
      });
      // console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
