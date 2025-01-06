import { useState } from "react";
import { Button } from "@mui/material";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.css";
import Logo from "./components/Logo/Logo.css";
import Search from "./components/SearchAndFilter/SearchAndFilter.css";
import Card from "./components/Card/Card";

function App() {
  return (
    <>
      <Navbar>
        <Logo></Logo>
      </Navbar>
      <div className="section1">
        <h1 className="sectionOneFirstInfo">
          Search Smarter, <br />
          Explore Faster
        </h1>
        <Search></Search>
      </div>
    </>
  );
}

export default App;
