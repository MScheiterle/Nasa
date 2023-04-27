import React, { useState } from "react";
import SpotifyUserWidget from "../SpotifyUserWidget/SpotifyUserWidget";
import RenderData from "../DataHandlers/RenderData";
import RenderTimeSelector from "../DataHandlers/RenderTimeSelector";
import "./style.scss";

function SpotifyUserStats(props) {
  const [timeSelected, setTimeSelected] = useState("medium_term");

  const handleTimeChange = (event) => {
    setTimeSelected(event.target.value);
  };

  return (
    <div id="SpotifyUserStats" className="page">
      <SpotifyUserWidget
        user={props.user}
        spotifyToken={props.spotifyToken}
        updateTokens={props.updateTokens}
      />
      {props.spotifyToken ? (
        <>
          <RenderTimeSelector
            handleTimeChange={handleTimeChange}
            timeSelected={timeSelected}
          />
          <RenderData
            spotifyToken={props.spotifyToken}
            timeSelected={timeSelected}
          />
        </>
      ) : (
        <>You Need To Connect Your Spotify</>
      )}
    </div>
  );
}

export default SpotifyUserStats;
