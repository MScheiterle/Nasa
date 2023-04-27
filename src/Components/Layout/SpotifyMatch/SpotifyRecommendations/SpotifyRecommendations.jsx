import React from "react";
import SpotifyUserWidget from "../SpotifyUserWidget/SpotifyUserWidget";
import "./style.scss";

function SpotifyRecommendations(props) {
  return (
    <div id="SpotifyRecommendations" className="page">
      <SpotifyUserWidget
        user={props.user}
        spotifyToken={props.spotifyToken}
        updateTokens={props.updateTokens}
      />
      <div className="searchPage">
        <div className="ArtistSearch"></div>
        <div className="TrackSearch"></div>
      </div>
    </div>
  );
}

export default SpotifyRecommendations;
