import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

export function SignIn() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const nicknameChange = (e: any) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // ResponseStatusException(HttpStatus.CONFLICT, "No user with specified name found")
    // try {
    //   const { data, error } = useSWR([
    //     "user/login",
    //     {
    //       method: "POST",
    //       body: {
    //         name: nickname,
    //       },
    //       headers: { "Content-Type": "application/json" },
    //     },
    //   ]);
    // } catch (error) {
    //   console.log(error);
    //   if ((error = "No user with specified name found")) {
    //     navigate("/register/" + nickname, { replace: true });
    //   }
    // }
    navigate("/register/" + nickname, { replace: true });
  };

  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nickname}
          onChange={nicknameChange}
          placeholder="Nickname"
        ></input>
        <input type="submit" value="Continue"></input>
      </form>
    </div>
  );
}
