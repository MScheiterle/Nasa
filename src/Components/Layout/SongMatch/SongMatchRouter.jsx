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
        if (!spotifyToken && !disconnected) {
          setToken(await getCurrentUserData("spotifyToken", "spotify"));
        }
        if (!spotifyRefreshToken && !disconnected) {
          setSpotifyRefreshToken(
            await getCurrentUserData("spotifyRefreshToken", "spotify")
          );
        }
      } catch {}
    };

    if (document.readyState === "complete" && user) {
      fetchCall();
    } else {
      window.addEventListener("load", fetchCall, false);
      return () => window.removeEventListener("load", fetchCall);
    }
  }, [user, spotifyToken, spotifyRefreshToken, disconnected]);

  const updateTokens = async (token, expirationTime, refreshToken) => {
    if (!expirationTime) {
      console.log("No Exp");
      localStorage.removeItem("spotifyTokenExpiration");
      await addCustomFieldToCurrentUser(
        "spotifyTokenExpiration",
        null,
        "spotify",
        true
      );
    } else {
      console.log("Exp");
      localStorage.setItem("spotifyTokenExpiration", expirationTime);
      await addCustomFieldToCurrentUser(
        "spotifyTokenExpiration",
        expirationTime,
        "spotify"
      );
    }

    setToken(async (prevToken) => {
      if (prevToken !== token) {
        console.log("prevToken !== token" + token);
        await addCustomFieldToCurrentUser("spotifyToken", token, "spotify");
      }
      if (token === null) {
        console.log("token === null");
        setDisconnected(true);
      }
      return token;
    });

    setSpotifyRefreshToken(async (prevRefreshToken) => {
      if (prevRefreshToken !== refreshToken && refreshToken) {
        await addCustomFieldToCurrentUser(
          "spotifyRefreshToken",
          refreshToken,
          "spotify"
        );
      }
      return refreshToken;
    });
  };

  return (
    <div>
      <SpotifyUserWidget
        user={user}
        spotifyToken={spotifyToken}
        updateTokens={updateTokens}
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
