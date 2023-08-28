import axios from "axios";

export const fetcher = (url: string, withCredentials: boolean) =>
  axios
    .get(process.env.REACT_APP_API + url, { withCredentials: withCredentials })
    .then((res) => res.data);
