import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function SignIn() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      axios
        .get(process.env.REACT_APP_API + "user/exists/" + nickname)
        .then((response) => {
          const data = response.data;
          if (data == false) {
            navigate("/sign-in/register/" + nickname);
          } else {
            navigate("/sign-in/login/" + nickname);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nickname}
          onChange={(e: any) => {
            setNickname(e.target.value);
          }}
          placeholder="Nickname"
        ></input>
        <input type="submit" value="Continue"></input>
      </form>
    </div>
  );
}
