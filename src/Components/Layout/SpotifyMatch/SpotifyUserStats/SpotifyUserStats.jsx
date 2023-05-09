import React, { useState } from "react";
import RenderData from "../DataHandlers/RenderData";
import RenderTimeSelector from "../DataHandlers/RenderTimeSelector";
import "./style.scss";

function SpotifyUserStats({ spotifyToken, page }) {
  const [timeSelected, setTimeSelected] = useState("medium_term");

  const handleTimeChange = (event) => {
    setTimeSelected(event.target.value);
  };

  return (
    <div id="SpotifyUserStats" className={`${page && "page"}`}>
      <RenderTimeSelector
        handleTimeChange={handleTimeChange}
        timeSelected={timeSelected}
      />
      <RenderData spotifyToken={spotifyToken} timeSelected={timeSelected} />
    </div>
  );
}

export default SpotifyUserStats;
