import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SpotifyMatchHome from "./SpotifyMatchHome/SpotifyMatchHome";
import NoPage from "../NoPage/NoPage";
import SpotifyUserStats from "./SpotifyUserStats/SpotifyUserStats";
import SpotifyCompareStats from "./SpotifyCompareStats/SpotifyCompareStats";
import SpotifyRecommendations from "./SpotifyRecommendations/SpotifyRecommendations";
import SpotifyUserWidget from "./SpotifyUserWidget/SpotifyUserWidget";
import {
  addCustomFieldToCurrentUser,
  getCurrentUserData,
} from "../../../firebase.ts";

function SpotifyMatchRouter({ user, name }) {
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

  const updateTokens = (token, expirationTime, refreshToken) => {
    if (!expirationTime) {
      localStorage.removeItem("spotifyTokenExpiration");
      addCustomFieldToCurrentUser(
        "spotifyTokenExpiration",
        expirationTime,
        "spotify",
        true
      );
    } else {
      localStorage.setItem("spotifyTokenExpiration", expirationTime);
      addCustomFieldToCurrentUser(
        "spotifyTokenExpiration",
        expirationTime,
        "spotify"
      );
    }

    setToken((prevToken) => {
      if (prevToken !== token) {
        addCustomFieldToCurrentUser("spotifyToken", token, "spotify");
      }
      if (token === null) {
        setDisconnected(true);
      }
      return token;
    });

    setSpotifyRefreshToken((prevRefreshToken) => {
      if (prevRefreshToken !== refreshToken && refreshToken) {
        addCustomFieldToCurrentUser(
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
        <Route
          path="/"
          element={<SpotifyMatchHome user={user} name={name} />}
        />
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

export default SpotifyMatchRouter;
