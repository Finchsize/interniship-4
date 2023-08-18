import { Params } from "react-router-dom";
import axios from "axios";

const loader = async ({ params }: { params: Params }) => {
  const data = await axios
    .get(`${process.env.REACT_APP_API}user/${params.name}`)
    .then((response) => {
      return response.data;
    });
  return data;
};

export default loader;
