import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

export function Register() {
  const { nickname } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password == password1) {
      const payload = {
        name: nickname,
        email: email,
        password: password,
      };
      try {
        axios
          .post(process.env.REACT_APP_API + "user/register", payload)
          .then((response) => {
            const data = response.data;
            if (typeof data != "string") {
              console.log(response.status);
            } else {
              const jwtToken = data;
              cookies.set("jwt", jwtToken, {
                expires: new Date(Date.now() + 5 * 60 * 1000),
                secure: true,
                httpOnly: true,
                sameSite: "lax",
              });
              navigate("/");
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
