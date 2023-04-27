import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SpotifyMatchHome from "./SpotifyMatchHome/SpotifyMatchHome";
import NoPage from "../NoPage/NoPage";
import SpotifyUserStats from "./SpotifyUserStats/SpotifyUserStats";
import SpotifyCompareStats from "./SpotifyCompareStats/SpotifyCompareStats";
import SpotifyRecommendations from "./SpotifyRecommendations/SpotifyRecommendations";
import { addCustomFieldToCurrentUser } from "../../../firebase.ts";

function SpotifyMatchRouter(props) {
  const { spotifyToken: initialToken } = props;
  const [spotifyToken, setToken] = useState(
    localStorage.getItem("spotifyToken") || initialToken
  );

  const updateTokens = (token, expirationTime, refreshToken) => {
    if (!token) {
      localStorage.removeItem("spotifyToken");
      localStorage.removeItem("spotifyTokenExpiration");
      localStorage.removeItem("spotifyRefreshToken");
    }

    setToken(token);
    if (token && expirationTime) {
      localStorage.setItem("spotifyToken", token);
      localStorage.setItem("spotifyTokenExpiration", expirationTime);
    }
    addCustomFieldToCurrentUser("spotifyToken", token);
    addCustomFieldToCurrentUser("spotifyTokenExpiration", expirationTime);
    if (refreshToken) {
      addCustomFieldToCurrentUser("spotifyRefreshToken", refreshToken);
      localStorage.setItem("spotifyRefreshToken", refreshToken);
    }
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <SpotifyMatchHome
              user={props.user}
              name={props.name}
              updateTokens={updateTokens}
              spotifyToken={spotifyToken}
            />
          }
        />
        <Route
          path="/user_stats"
          element={
            <SpotifyUserStats
              user={props.user}
              name={props.name}
              updateTokens={updateTokens}
              spotifyToken={spotifyToken}
            />
          }
        />
        <Route
          path="/compare_stats"
          element={
            <SpotifyCompareStats
              user={props.user}
              updateTokens={updateTokens}
              spotifyToken={spotifyToken}
            />
          }
        />
        <Route
          path="/recommendations"
          element={
            <SpotifyRecommendations
              user={props.user}
              updateTokens={updateTokens}
              spotifyToken={spotifyToken}
            />
          }
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default SpotifyMatchRouter;
