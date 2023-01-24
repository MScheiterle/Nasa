import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div class="Navbar">
      <a onClick={() => navigate("/")}>
        <img class="MainLogo" src="3DS_Snow_NoLines.png" alt="" />
      </a>

      <div class="navlinks">
        <div class="left">
          <a onClick={() => navigate("Projects")}><h1>Projects</h1></a>
        </div>
        <div class="right">
          <a onClick={() => navigate("Resume")}><h1>Resume</h1></a>
          <a onClick={() => navigate("Contact Me")}><h1>Contact Me</h1></a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
