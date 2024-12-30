import { useState } from "react";
import { Button } from "@mui/material";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/navbar";
import Logo from "./components/logo";

function App() {
  return (
    <>
      <div>
        {/* <h1>hi</h1>
        <Button variant="contained">Contained</Button> */}
      </div>
      <div className="section1">
        <Navbar>
          <Logo>
            <button>j</button>
          </Logo>
          <Button variant="contained">Login</Button>
        </Navbar>
      </div>
    </>
  );
}

export default App;
