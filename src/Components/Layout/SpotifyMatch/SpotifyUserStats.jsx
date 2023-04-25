import React, { useState } from "react";
import SpotifyUserWidget from "./SpotifyUserWidget";
import RenderData from "./RenderData";
import RenderTimeSelector from "./RenderTimeSelector";
import "./styleUserStats.scss";

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
        spotifyTokenExpiration={props.spotifyTokenExpiration}
        spotifyRefreshToken={props.spotifyRefreshToken}
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
