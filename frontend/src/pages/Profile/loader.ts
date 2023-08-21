import axios from "axios";
import { redirect } from "react-router-dom";

const loader = async () => {
  // TODO: Check the JWT, get the user from it, and get his data [I4-52]
  const data = await axios
    .get(`${process.env.REACT_APP_API}user/current-user`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // No token, invalid token, wrong user ID
      if (
        error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 409
      ) {
        return redirect("/sign-in");
      }
    });
  return data;
};

export default loader;
