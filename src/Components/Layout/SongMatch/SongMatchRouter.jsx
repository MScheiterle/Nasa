import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SongMatchHome from "./SongMatchHome/SongMatchHome";
import NoPage from "../NoPage/NoPage";
import SpotifyUserStats from "./SpotifyUserStats/SpotifyUserStats";
import SpotifyCompareStats from "./SpotifyCompareStats/SpotifyCompareStats";
import SpotifyRecommendations from "./SpotifyRecommendations/SpotifyRecommendations";
import SpotifyUserWidget from "./SpotifyUserWidget/SpotifyUserWidget";
import {
  addCustomFieldToCurrentUser,
  getCurrentUserData,
} from "../../../firebase.ts";

function SongMatchRouter({ user, name }) {
  const [spotifyToken, setToken] = useState("");
  const [spotifyRefreshToken, setSpotifyRefreshToken] = useState("");
  const [disconnected, setDisconnected] = useState(false);

  useEffect(() => {
    const fetchCall = async () => {
      try {
        if (!disconnected) {
          setToken(await getCurrentUserData("spotifyToken", "spotify"));
          setSpotifyRefreshToken(
            await getCurrentUserData("spotifyRefreshToken", "spotify")
          );
          console.log("singed in with tokens from DB")
        }
      } catch { }
    };

    if (document.readyState === "complete" && user) {
      fetchCall();
    } else {
      window.addEventListener("load", fetchCall, false);
      return () => window.removeEventListener("load", fetchCall);
    }
  }, [user, disconnected]);

  const disconnect = () => {
    setDisconnected(true);
    updateTokens(null, null);
  }

  const updateTokens = async (token, expirationTime, refreshToken) => {
    if (!expirationTime) {
      localStorage.removeItem("spotifyTokenExpiration");
    } else {
      localStorage.setItem("spotifyTokenExpiration", expirationTime);
    }

    await addCustomFieldToCurrentUser("spotifyTokenExpiration", expirationTime, "spotify");

    await addCustomFieldToCurrentUser("spotifyToken", token, "spotify");
    setToken(token); // Set the token here

    // Set the refreshToken directly using setSpotifyRefreshToken
    if (refreshToken) {
      await addCustomFieldToCurrentUser(
        "spotifyRefreshToken",
        refreshToken,
        "spotify"
      );
    }

    setSpotifyRefreshToken(refreshToken); // Set the refreshToken here

    console.log("Updated tokens")
  };

  return (
    <div>
      <SpotifyUserWidget
        user={user}
        spotifyToken={spotifyToken}
        updateTokens={updateTokens}
        disconnect={disconnect}
        spotifyRefreshToken={spotifyRefreshToken}
      />
      <Routes>
        <Route path="/" element={<SongMatchHome user={user} name={name} />} />
        <Route
          path="/user_stats"
          element={<SpotifyUserStats spotifyToken={spotifyToken} page={true} />}
        />
        <Route
          path="/compare_stats"
          element={
            <SpotifyCompareStats user={user} spotifyToken={spotifyToken} />
          }
        />
        <Route
          path="/recommendations"
          element={<SpotifyRecommendations spotifyToken={spotifyToken} />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default SongMatchRouter;
