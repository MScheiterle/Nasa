import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

function MasteryChallenge() {
  const { id } = useParams();

  return <div id="MasteryChallenge">{id}</div>;
}

export default MasteryChallenge;
