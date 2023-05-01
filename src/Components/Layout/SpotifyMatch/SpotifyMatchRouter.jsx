import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SpotifyMatchHome from "./SpotifyMatchHome/SpotifyMatchHome";
import NoPage from "../NoPage/NoPage";
import SpotifyUserStats from "./SpotifyUserStats/SpotifyUserStats";
import SpotifyCompareStats from "./SpotifyCompareStats/SpotifyCompareStats";
import SpotifyRecommendations from "./SpotifyRecommendations/SpotifyRecommendations";
import { addCustomFieldToCurrentUser } from "../../../firebase.ts";

function SpotifyMatchRouter({ user, name, fetchData }) {
  const [spotifyToken, setToken] = useState("");
  const [spotifyRefreshToken, setSpotifyRefreshToken] = useState("");

  const updateTokens = (token, expirationTime, refreshToken) => {
    if (!expirationTime) {
      localStorage.removeItem("spotifyTokenExpiration");
    }

    setToken(token);
    if (expirationTime) {
      localStorage.setItem("spotifyTokenExpiration", expirationTime);
    }
    addCustomFieldToCurrentUser("spotifyToken", token);
    addCustomFieldToCurrentUser("spotifyTokenExpiration", expirationTime);
    if (refreshToken) {
      addCustomFieldToCurrentUser("spotifyRefreshToken", refreshToken);
    }
  };

  useEffect(() => {
    const fetchCall = () => {
      if (!spotifyToken) {
        fetchData(setToken, "spotifyToken");
      }
      fetchData(setSpotifyRefreshToken, "spotifyRefreshToken");
    };

    if (document.readyState === "complete" && user) {
      fetchCall();
    } else {
      window.addEventListener("load", fetchCall, false);
      return () => window.removeEventListener("load", fetchCall);
    }
  }, [user, fetchData, spotifyToken]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <SpotifyMatchHome
              user={user}
              name={name}
              updateTokens={updateTokens}
              spotifyToken={spotifyToken}
              spotifyRefreshToken={spotifyRefreshToken}
            />
          }
        />
        <Route
          path="/user_stats"
          element={
            <SpotifyUserStats
              user={user}
              updateTokens={updateTokens}
              spotifyToken={spotifyToken}
              spotifyRefreshToken={spotifyRefreshToken}
            />
          }
        />
        <Route
          path="/compare_stats"
          element={
            <SpotifyCompareStats
              user={user}
              updateTokens={updateTokens}
              spotifyToken={spotifyToken}
              spotifyRefreshToken={spotifyRefreshToken}
            />
          }
        />
        <Route
          path="/recommendations"
          element={
            <SpotifyRecommendations
              user={user}
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
