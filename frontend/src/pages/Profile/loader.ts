import { Params } from "react-router-dom";
import axios from "axios";

const loader = async ({ params }: { params: Params }) => {
  // TODO: Check the JWT, get the user from it, and get his data
  // For now, use a specific user for demonstration purposes
  const data = await axios
    .get(`${process.env.REACT_APP_API}user/1`)
    .then((response) => {
      return response.data;
    });
  return data;
};

export default loader;
