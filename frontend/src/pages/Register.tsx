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

  interface Token {
    id: number;
    exp: number;
    iat: number;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password == password1) {
      var payload = {
        name: nickname,
        email: email,
        password: password,
      };
      try {
        axios
          .post(process.env.REACT_APP_API + "user/register", payload)
          .then((response) => {
            var responseParsed = JSON.parse(JSON.stringify(response));
            if (typeof responseParsed != "string") {
              console.log(responseParsed.status + responseParsed.error);
            } else {
              var jwtToken = responseParsed;
              var jwtDecoded = jwt<Token>(jwtToken);
              Cookies.set("jwt", jwtToken, {
                expires: new Date(jwtDecoded.exp * 1000),
                secure: true,
                httpOnly: true,
                sameSite: "lax",
              });
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1>Welcome</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        ></input>
        <input
          type="password"
          value={password}
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        ></input>
        <input
          type="password"
          value={password1}
          onChange={(e: any) => {
            setPassword1(e.target.value);
          }}
          placeholder="Confirm password"
        ></input>
        <input type="submit" value="Register"></input>
      </form>
    </div>
  );
}
