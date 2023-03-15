import React from "react";
import Homepage from "../Homepage/Homepage";
import Projects from "../Projects/Projects";
import "./style.scss";

function Home() {
  const availableContent = [
    <Homepage key={"Homepage"} />,
    <Projects key={"Projects"} />,
  ];

  return <div id="Home">{availableContent}</div>;
}
export default Home;
