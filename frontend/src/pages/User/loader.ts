import { Params } from "react-router-dom";
import axios from "axios";

const loader = async ({ params }: { params: Params }) => {
  // TODO: Before loading the user data, check if the page belongs to the current user
  const data = await axios
    .get(`${process.env.REACT_APP_API}user/${params.nickname}`)
    .then((response) => {
      return response.data;
    });
  return data;
};

export default loader;