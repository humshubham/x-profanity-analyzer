import axios from "axios";

const BACKEND_URL = "http://127.0.0.1:5000";

export const getProfileTweets = (userName: string, count: number) => {
  const url = BACKEND_URL + `/profile/${userName}?count=${count}`;

  return axios.get(url);
};

export const getSearchTweets = (keyword: string, count: number) => {
  const url = BACKEND_URL + `/search/?q=${keyword}&count=${count}`;

  return axios.get(url);
};
