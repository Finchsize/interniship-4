import React from "react";
import logo from "./logo.svg";
import { Helmet } from "react-helmet";
import "./index.css";
import Header from "./Components/Header";
import About from "./Components/About";
import Cards from "./Components/Cards";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <About></About>
      <Cards></Cards>
    </div>
  );
}

export default App;
