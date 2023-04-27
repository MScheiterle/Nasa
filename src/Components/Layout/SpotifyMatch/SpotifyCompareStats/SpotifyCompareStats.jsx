import React from "react";
import SpotifyUserWidget from "../SpotifyUserWidget/SpotifyUserWidget";
import "./style.scss"

function SpotifyCompareStats(props) {
  return (
    <div id="SpotifyCompareStats" className="page">
      <SpotifyUserWidget
        user={props.user}
        spotifyToken={props.spotifyToken}
        updateTokens={props.updateTokens}
      />
      Coming Soon...
    </div>
  );
}

export default SpotifyCompareStats;
