import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jwt-decode";

export function Register() {
  const { nickname } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");

  const emailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const password1Change = (e: any) => {
    setPassword1(e.target.value);
  };

  interface Token {
    id: number;
    issuedAt: Date;
    expires: Date;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password == password1) {
      var payload = {
        name: nickname,
        email: email,
        password: password,
      };
      axios
        .post(process.env.REACT_APP_API + "user/register", payload)
        .then((response) => {
          var jwtDecoded = jwt<Token>(response.data.token);
          Cookies.set("jwt_authorization", response.data.token, {
            expires: jwtDecoded.expires,
            httpOnly: true,
            sameSite: "lax",
          });
        });
    }
  };

  return (
    <div>
      <h1>Welcome</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={emailChange}
          placeholder="Email"
        ></input>
        <input
          type="password"
          value={password}
          onChange={passwordChange}
          placeholder="Password"
        ></input>
        <input
          type="password"
          value={password1}
          onChange={password1Change}
          placeholder="Confirm password"
        ></input>
        <input type="submit" value="Register"></input>
      </form>
    </div>
  );
}
