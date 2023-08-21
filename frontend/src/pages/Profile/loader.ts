import axios from "axios";

const loader = async () => {
  // TODO: Check the JWT, get the user from it, and get his data [I4-52]
  // For now, use a specific user for demonstration purposes
  const data = await axios
    .get(`${process.env.REACT_APP_API}user/current-user`)
    .then((response) => {
      return response.data;
    });
  return data;
};

export default loader;
