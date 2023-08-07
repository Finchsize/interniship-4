import React from "react";
import logo from "./logo.svg";
import { Helmet } from "react-helmet";
import "./index.css";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <HomePage></HomePage>
    </div>
  );
}

export default App;
