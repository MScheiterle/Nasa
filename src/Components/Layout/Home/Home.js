import React from "react";
import Homepage from "../Homepage/Homepage";
import Projects from "../Projects/Projects";
import "./style.scss";

function Home() {
  const availableContent = [
    <Homepage />,
    <Projects />,
  ];

  return <div className="Home">{availableContent}</div>;
}
export default Home;
